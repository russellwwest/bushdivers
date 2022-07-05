import React, { useState } from 'react'
import ResourceDependencies from '../Admin/Resources/ResourceDependencies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faUpload } from '@fortawesome/free-solid-svg-icons'
import Uploader from '../../Elements/Uploader'
import AWS from 'aws-sdk'
import ProgressBar from '../../Elements/ProgressBar'
import { Inertia } from '@inertiajs/inertia'

const S3_BUCKET = 'bushdivers-resource'
const REGION = 'us-east-1'

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
})

const NewResource = ({ categories }) => {
  const [errors, setErrors] = useState([])
  const [values, setValues] = useState({
    categoryId: 1,
    title: '',
    desc: '',
    version: '',
    author: '',
    package: ''
  })
  const [dependencies, setDependencies] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [progress, setProgress] = useState(0)

  // useEffect(() => {
  //   clearForm()
  // }, [])

  function updateDependencies (dep, action) {
    console.log(dep)
    switch (action) {
      case 'add':
        // eslint-disable-next-line no-case-declarations
        const newDependencies = dependencies.concat(dep)
        setDependencies(newDependencies)
        break
      case 'remove':
        // eslint-disable-next-line no-case-declarations
        const newDep = dependencies.filter(d => d.package !== dep.package)
        setDependencies(newDep)
        break
    }
  }

  function handleChange (e) {
    const key = e.target.id
    const value = e.target.value
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  function handleFile ({ target: { files } }) {
    setSelectedFile(files[0])
  }

  async function validateForm () {
    const tempErrors = {}
    let formIsValid = true
    // title
    if (!values.title) {
      formIsValid = false
      tempErrors.title = 'Title is required'
    }
    // package
    if (!values.package) {
      formIsValid = false
      tempErrors.package = 'Package name is required'
    }
    // desc
    if (!values.desc) {
      formIsValid = false
      tempErrors.desc = 'Description is required'
    }
    // version
    if (!/[0-9]+\.[0-9]+\.[0-9]+/.test(values.version)) {
      formIsValid = false
      tempErrors.version = 'Version is required in 0.0.0 format'
    }
    // author
    if (!values.author) {
      formIsValid = false
      tempErrors.author = 'Author display name is required'
    }
    setErrors(tempErrors)
    return formIsValid
  }

  async function uploadToS3 (file) {
    const params = { Body: file, Bucket: S3_BUCKET, Key: file.name, ACL: 'public-read' }
    try {
      const data = await myBucket.upload(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .promise()
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async () => {
    try {
      const status = await validateForm()
      if (status) {
        const res = await uploadToS3(selectedFile)
        const data = { data: values, size: selectedFile.size, url: res.Location, dependencies }
        await Inertia.post('/resources', data)
        await clearForm()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const clearForm = () => {
    setValues({
      categoryId: 1,
      title: '',
      desc: '',
      version: '',
      author: '',
      package: ''
    })
    setDependencies([])
    setSelectedFile(null)
    setProgress(0)
  }

  return (
    <div>
      <h2 className="text-xl">Submit New Resource</h2>
        <div className="my-2">
          <label htmlFor="categoryId" className="block"><span className="text-gray-700">Category</span></label>
          <select id="categoryId" value={values.categoryId} onChange={handleChange} className="form-select form">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.category}</option>
            ))}
          </select>
          {errors.categoryId && <div className="text-sm text-red-500">{errors.categoryId}</div>}
        </div>
        <div className="my-2">
          <label htmlFor="title" className="block"><span className="text-gray-700">Resource Title</span></label>
          <input id="title" value={values.title} onChange={handleChange} type="text" className="form-input form" />
          {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
        </div>
        <div className="my-2">
          <label htmlFor="package" className="block"><span className="text-gray-700">Package Name</span></label>
          <input id="package" value={values.package} onChange={handleChange} type="text" className="form-input form" />
          {errors.package && <div className="text-sm text-red-500">{errors.package}</div>}
        </div>
        <div className="my-2">
          <label htmlFor="desc" className="block"><span className="text-gray-700">Package Description</span></label>
          <textarea id="desc" value={values.desc} onChange={handleChange} className="form-input form" />
          {errors.desc && <div className="text-sm text-red-500">{errors.desc}</div>}
        </div>
        <div className="my-2">
          <label htmlFor="version" className="block"><span className="text-gray-700">Package Version</span></label>
          <input id="version" value={values.version} onChange={handleChange} type="text" className="form-input form" />
          {errors.version && <div className="text-sm text-red-500">{errors.version}</div>}
        </div>
        <div className="mt-2 mb-4">
          <label htmlFor="author" className="block"><span className="text-gray-700">Author Display Name</span></label>
          <input id="author" value={values.author} onChange={handleChange} type="text" className="form-input form" />
          {errors.author && <div className="text-sm text-red-500">{errors.author}</div>}
        </div>
        <hr />
        <div className="my-2">
          <h3 className="text-lg">Upload file</h3>
          {selectedFile === null && (
            <div className="my-2">
              <Uploader onChange={handleFile} accept=".zip">
                <div className="cursor-pointer bg-orange-50 py-8 text-orange-500 border-orange-500 border border-dashed px-2 rounded-lg w-full flex items-center justify-center">
                  <div className="flex flex-col">
                    <FontAwesomeIcon className="text-2xl" icon={faUpload} />
                    <span className="mt-2">Add a file</span>
                  </div>
                </div>
              </Uploader>
            </div>
          )}
          {selectedFile && (
            <>
              <div className="flex justify-between items-center">
                <div><span className="text-gray-700 text-sm">{selectedFile.name}</span> <span className="text-gray-700 text-sm">{((selectedFile.size / 1024) / 1024).toFixed(2)}mb</span></div>
                <FontAwesomeIcon onClick={() => setSelectedFile(null)} className="p-2 cursor-pointer" icon={faTimesCircle} />
              </div>
              {progress > 0 && (
                <ProgressBar progress={progress} />
              )}
            </>
          )}
        </div>
        <hr />
        <ResourceDependencies dependencies={dependencies} updateDependencies={updateDependencies} />
        <div className="flex justify-end mt-4">
          <button onClick={() => handleSubmit()} className="btn btn-secondary">Submit Resource</button>
        </div>
    </div>
  )
}

export default NewResource