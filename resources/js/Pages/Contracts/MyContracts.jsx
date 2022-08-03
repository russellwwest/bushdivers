import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import MyContractMap from '../../Shared/Components/Contracts/MyContractMap'
import AppLayout from '../../Shared/AppLayout'
import AcceptedContracts from '../../Shared/Components/Contracts/AcceptedContracts'

const MyContracts = ({ contracts, custom, currentLocation, fleet }) => {
  const { auth } = usePage().props
  const [selectedContract, setSelectedContract] = useState('')
  const [contractsCombined, setContractsCombined] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const contractList = [...contracts, ...custom]
    setContractsCombined(contractList)
    console.log(contractList)
    setRefresh(true)
  }, [])

  const updateSelectedContract = (contract) => {
    setSelectedContract(contract)
    setRefresh(true)
  }

  const updateRefresh = (status) => {
    setRefresh(status)
  }

  const cancelBid = (contract) => {
    const res = window.confirm('Are you sure you want to cancel this contract? You will lose XP.')
    if (res) {
      const data = {
        id: contract.id
      }
      Inertia.post('/contracts/cancel', data)
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r bg-white overflow-auto contract-area">
        <div className="flex flex-col justify-start">
          <div className="border-b border-b-gray-200">
            <h2 className="p-2">My Contracts</h2>
            {custom && custom.length > 0 && (
              <AcceptedContracts contractsList={custom} cancelBid={cancelBid} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
            )}
          </div>
          <div className="border-b border-b-gray-200">
            <h2 className="p-2">Available Contracts</h2>
            {contracts && contracts.length > 0 && (
              <AcceptedContracts contractsList={contracts} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} cancelBid={cancelBid} />
            )}
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full">
        <MyContractMap contracts={contractsCombined} fleet={fleet} currentLocation={currentLocation} selectedContract={selectedContract} mapStyle={auth.user.map_style} refreshContracts={refresh} updateRefresh={() => updateRefresh} />
      </div>
    </div>
  )
}

MyContracts.layout = page => <AppLayout children={page} title="Available Contracts" heading="Available Contracts" />

export default MyContracts
