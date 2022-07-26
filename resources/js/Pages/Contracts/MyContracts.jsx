import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoContent from '../../Shared/Elements/NoContent'
import Tooltip from '../../Shared/Elements/Tooltip'
import { Link, usePage } from '@inertiajs/inertia-react'
import dayjs from '../../Helpers/date.helpers'
import { Inertia } from '@inertiajs/inertia'
import CargoDetails from '../../Shared/Components/Contracts/CargoDetails'
import MyContractMap from '../../Shared/Components/Contracts/MyContractMap'
import AppLayout from '../../Shared/AppLayout'
import AcceptedContracts from '../../Shared/Components/Contracts/AcceptedContracts'

const MyContracts = ({ contracts, custom, community }) => {
  const { auth } = usePage().props
  const [selectedContract, setSelectedContract] = useState('')

  const updateSelectedContract = (contract) => {
    setSelectedContract(contract)
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
    <div className="p-4">
      <div className="flex flex-col lg:flex-row justify-between mt-4">
        <div className="lg:w-2/3 lg:mr-2">
          <h2>My Contracts</h2>
          {custom && custom.length > 0 && (
            <AcceptedContracts contractsList={custom} cancelBid={cancelBid} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
          )}
          <h2>Bush Divers Community Contracts</h2>
          {community && community.length > 0 && (
            <AcceptedContracts contractsList={community} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
          )}
          <h2>Available Contracts</h2>
          {contracts && contracts.length > 0 && (
            <AcceptedContracts contractsList={contracts} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} cancelBid={cancelBid} />
          )}
        </div>
        <div className="lg:w-1/3 lg:ml-2 mt-2 lg:mt-0">
          { contracts && contracts.length > 0 && <div className="rounded shadow bg-white p-4">
            <MyContractMap data={selectedContract} size="large" mapStyle={auth.user.map_style} />
          </div>}
        </div>
      </div>
    </div>
  )
}

MyContracts.layout = page => <AppLayout children={page} title="Available Contracts" heading="Available Contracts" />

export default MyContracts
