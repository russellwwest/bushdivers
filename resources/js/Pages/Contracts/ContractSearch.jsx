import React, { useEffect, useState } from 'react'
import AppLayout from '../../Shared/AppLayout'
import { usePage } from '@inertiajs/inertia-react'
import Tooltip from '../../Shared/Elements/Tooltip'
import { Inertia } from '@inertiajs/inertia'
import CustomContract from '../../Shared/Components/Contracts/CustomContract'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnchor, faArrowUp, faCheck,
  faCompass, faDollarSign, faMagnifyingGlass,
  faPlaneArrival,
  faPlaneDeparture,
  faSuitcase,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons'
import dayjs from '../../Helpers/date.helpers'
import { formatNumber } from '../../Helpers/general.helpers'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ContractMap from '../../Shared/Components/Contracts/ContractMap'

const ContractSearch = ({ searchedContracts, airport, cacheKey }) => {
  const { auth } = usePage().props
  const [searchForm, setSearchForm] = useState({
    searchIcao: auth.user.current_airport_id,
    flightLength: 'short',
    aircraftSize: 'small'
  })
  const [contracts, setContracts] = useState(null)
  const [selectedAirport, setSelectedAirport] = useState('')
  const [selectedContract, setSelectedContract] = useState({})
  const [error, setError] = useState(null)
  const [showCustom, setShowCustom] = useState(false)
  const [searchUpdated, setSearchUpdated] = useState(false)

  useEffect(() => {
    if (searchedContracts && airport) {
      setSelectedAirport(airport)
      setContracts(searchedContracts)
    }
    setSearchUpdated(true)
  }, [searchedContracts])

  function toggleCustom () {
    setShowCustom(!showCustom)
  }

  function handleChange (e) {
    setSearchUpdated(false)
    const key = e.target.id
    const value = e.target.value
    setSearchForm(values => ({
      ...values,
      [key]: value
    }))
  }

  function updateSelectedContract (contract) {
    setSearchUpdated(false)
    setSelectedContract(contract)
  }

  async function handleSearch () {
    setError(null)
    setSelectedContract('')
    setShowCustom(false)
    if (searchForm.searchIcao.length > 0) {
      // Call api to find contracts
      Inertia.post('/contracts', {
        icao: searchForm.searchIcao,
        flightLength: searchForm.flightLength,
        aircraftSize: searchForm.aircraftSize
      })
    } else {
      setError('Please enter an ICAO')
    }
  }

  async function bidForContract (contract) {
    const newContracts = await contracts.filter(c => c.id !== contract.id)

    const data = {
      contract: contract,
      icao: searchForm.searchIcao,
      userId: auth.user.id,
      contracts: newContracts,
      cacheKey
    }

    const bid = axios.post('/api/contracts/bid', data)
    await toast.promise(bid, {
      loading: '...Bidding on contract',
      success: 'Contract won!',
      error: 'Issue processing bid'
    }, { position: 'top-right' })

    setContracts(newContracts)
  }

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r bg-white overflow-auto contract-area">
        <div className="flex flex-col justify-start">
          <div className="border-b border-b-gray-200">
            <div className="flex flex-row items-baseline justify-between space-x-1 p-4">
              <input id="searchIcao" type="text" placeholder="search ICAO" className="form-input form w-1/3" value={searchForm.searchIcao} onChange={handleChange} />
              <select id="flightLength" value={searchForm.flightLength} onChange={handleChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5">
                <option value="short">&#60; 60nm</option>
                <option value="medium">60-150nm</option>
                <option value="long">&#62; 150nm</option>
              </select>
              <select id="aircraftSize" value={searchForm.aircraftSize} onChange={handleChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5">
                <option value="small">Small Aircraft</option>
                <option value="medium">Medium Aircraft</option>
                <option value="large">Large Aircraft</option>
              </select>
              <button onClick={() => handleSearch()} className="btn btn-secondary"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              <Tooltip direction="top" content="Create custom contract">
                <button onClick={() => toggleCustom()} className="btn btn-secondary ml-2">Custom</button>
              </Tooltip>
            </div>
          </div>
          <div>
            {contracts && contracts.map((contract) => (
              <div key={contract.id} onClick={() => updateSelectedContract(contract)} className={`${contract.id === selectedContract.id ? 'bg-orange-200 hover:bg-orange-100' : 'bg-white'} border-t px-4 py-3 text-sm cursor-pointer z-40 flex`}>
                <div className="flex flex-col w-5/6 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Tooltip direction="top" content="Cargo">
                        <FontAwesomeIcon icon={faSuitcase} /><span className="text-lg mx-2">{contract.cargo_type === 1 ? <>{formatNumber(contract.cargo_qty)}</> : <>0</>}</span>lbs
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      <Tooltip direction="top" content="Passengers">
                        <FontAwesomeIcon icon={faUserGroup} /><span className="text-lg mx-2">{contract.cargo_type === 2 ? <>{contract.cargo_qty}</> : <>0</>}</span>
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      <Tooltip direction="top" content="Distance">
                        <FontAwesomeIcon icon={faCompass} /><span className="text-lg mx-2">{contract.distance}</span>nm
                      </Tooltip>
                    </div>
                    <div className="flex items-center" style={{ transform: `rotate(${contract.heading}deg)` }}>
                      <FontAwesomeIcon icon={faArrowUp} className="text-gray-700" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Tooltip direction="top" content="Contract value (pilot's will receive less)">
                      <FontAwesomeIcon icon={faDollarSign} /><span className="text-lg">{formatNumber(contract.contract_value)}</span>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <Tooltip direction="top" content="Departure">
                        <FontAwesomeIcon icon={faPlaneDeparture} /><span className="text-lg mx-2">{contract.departure}</span>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip direction="top" content="Destination">
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        <span className="text-lg mx-2">
                          {contract.destination.identifier} {contract.destination.longest_runway_surface === 'W' ? <FontAwesomeIcon icon={faAnchor} /> : <></>}
                        </span>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip direction="top" content="Cargo details">
                        {formatNumber(contract.cargo_qty)} {contract.cargo_type === 1 ? '(lbs)' : '(pax)'} {contract.cargo}
                      </Tooltip>
                    </div>
                  </div>
                  <div>
                    <Tooltip direction="top" content="Expiry date">
                      {dayjs(contract.expires_at).format('DD/MM/YYYY HH:mm')}
                    </Tooltip>
                  </div>
                </div>
                </div>
                <div className="flex items-center justify-end w-1/6">
                  <Tooltip direction="left" content="Accept contract">
                    <button onClick={() => bidForContract(contract)} className="btn btn-primary btn-small">
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full">
        {showCustom && (
          <div className="fixed z-30 top-4 left-1/3 ml-8 py-2 px-4 bg-white w-1/2 md:w-1/3 opacity-90 shadow rounded">
            <CustomContract departureIcao={searchForm.searchIcao} hideSection={() => setShowCustom(false)} />
          </div>
        )}
        {/*<ContractSearchMap contracts={contracts} airport={selectedAirport} style={auth.user.map_style} />*/}
        <ContractMap departure={selectedAirport} contracts={contracts} searchUpdated={searchUpdated} selectedContract={selectedContract} mapStyle={auth.user.map_style} />
      </div>
    </div>
  )
}

ContractSearch.layout = page => <AppLayout children={page} title="Find a Contract" heading="Find a Contract" />

export default ContractSearch
