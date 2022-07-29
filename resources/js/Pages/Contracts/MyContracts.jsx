import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import MyContractMap from '../../Shared/Components/Contracts/MyContractMap'
import AppLayout from '../../Shared/AppLayout'
import AcceptedContracts from '../../Shared/Components/Contracts/AcceptedContracts'
import Tooltip from '../../Shared/Elements/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnchor,
  faArrowUp,
  faCompass,
  faDollarSign, faPlaneArrival,
  faPlaneDeparture,
  faSuitcase,
  faUserGroup, faXmark
} from '@fortawesome/free-solid-svg-icons'
import { formatNumber } from '../../Helpers/general.helpers'
import dayjs from '../../Helpers/date.helpers'

const MyContracts = ({ contracts, custom, community, fleet }) => {
  const { auth } = usePage().props
  const [selectedContract, setSelectedContract] = useState('')
  const [contractsCombined, setContractsCombined] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const contractList = [...contracts, ...custom, ...community]
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
          {/*<div className="border-b border-b-gray-200">*/}
          {/*  <h2 className="p-2">Bush Divers Community Contracts</h2>*/}
          {/*  {community && community.length > 0 && (*/}
          {/*    <AcceptedContracts contractsList={community} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />*/}
          {/*  )}*/}
          {/*</div>*/}
          <div className="border-b border-b-gray-200">
            <h2 className="p-2">Available Contracts</h2>
            {contracts && contracts.length > 0 && (
              <AcceptedContracts contractsList={contracts} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
            )}
          </div>
          {/*<div className="border-b border-b-gray-200">*/}
          {/*  <h2 className="p-2">Available Contracts</h2>*/}
          {/*  {contractsCombined && contractsCombined.length > 0 && (*/}
          {/*    <>*/}
          {/*    {contractsCombined.map(contract => (*/}
          {/*      <div key={contract.id} onClick={() => updateSelectedContract(contract)} className={`${contract.id === selectedContract.id ? 'bg-orange-200 hover:bg-orange-100' : 'bg-white'} border-t px-4 py-3 text-sm cursor-pointer z-40 flex`}>*/}
          {/*        <div className="flex flex-col w-5/6 space-y-2">*/}
          {/*          <div className="text-xs">Id: {contract.id}</div>*/}
          {/*          <div className="flex items-baseline justify-between">*/}
          {/*            <div className="flex items-center space-x-6">*/}
          {/*              <div className="flex items-center">*/}
          {/*                <Tooltip direction="top" content="Cargo">*/}
          {/*                  <FontAwesomeIcon icon={faSuitcase} /><span className="text-lg mx-2">{contract.cargo_type_id === 1 ? <>{formatNumber(contract.cargo_qty)}</> : <>0</>}</span>lbs*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*              <div className="flex items-center">*/}
          {/*                <Tooltip direction="top" content="Passengers">*/}
          {/*                  <FontAwesomeIcon icon={faUserGroup} /><span className="text-lg mx-2">{contract.cargo_type_id === 2 ? <>{contract.cargo_qty}</> : <>0</>}</span>*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*              <div className="flex items-center">*/}
          {/*                <Tooltip direction="top" content="Distance">*/}
          {/*                  <FontAwesomeIcon icon={faCompass} /><span className="text-lg mx-2">{contract.distance}</span>nm*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*              <div className="flex items-center" style={{ transform: `rotate(${contract.heading}deg)` }}>*/}
          {/*                <FontAwesomeIcon icon={faArrowUp} className="text-gray-700" />*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*            <div className="flex items-center">*/}
          {/*              <Tooltip direction="top" content="Contract value (pilot's will receive less)">*/}
          {/*                <FontAwesomeIcon icon={faDollarSign} /><span className="text-lg">{formatNumber(contract.contract_value)}</span>*/}
          {/*              </Tooltip>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <div className="flex items-baseline justify-between">*/}
          {/*            <div className="flex items-center space-x-3">*/}
          {/*              <div>*/}
          {/*                <Tooltip direction="top" content="Departure">*/}
          {/*                  <FontAwesomeIcon icon={faPlaneDeparture} /><span className="text-lg mx-2">{contract.current_airport.identifier}</span>*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <Tooltip direction="top" content="Destination">*/}
          {/*                  <FontAwesomeIcon icon={faPlaneArrival} />*/}
          {/*                  <span className="text-lg mx-2">*/}
          {/*                {contract.arr_airport.identifier} {contract.arr_airport.longest_runway_surface === 'W' ? <FontAwesomeIcon icon={faAnchor} /> : <></>}*/}
          {/*              </span>*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*              <div>*/}
          {/*                <Tooltip direction="top" content="Cargo details">*/}
          {/*                  {formatNumber(contract.cargo_qty)} {contract.cargo_type_id === 1 ? '(lbs)' : '(pax)'} {contract.cargo}*/}
          {/*                </Tooltip>*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*            <div>*/}
          {/*              <Tooltip direction="top" content="Expiry date">*/}
          {/*                {dayjs(contract.expires_at).format('DD/MM/YYYY HH:mm')}*/}
          {/*              </Tooltip>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <div className="flex items-center justify-end w-1/6">*/}
          {/*          <Tooltip direction="left" content="Accept contract">*/}
          {/*            <button onClick={() => cancelBid(contract)} className="btn btn-primary btn-small">*/}
          {/*              <FontAwesomeIcon icon={faXmark} />*/}
          {/*            </button>*/}
          {/*          </Tooltip>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="w-2/3 h-full">
        <MyContractMap contracts={contractsCombined} fleet={fleet} selectedContract={selectedContract} mapStyle={auth.user.map_style} refreshContracts={refresh} updateRefresh={() => updateRefresh} />
      </div>
    </div>

    //   <div className="flex flex-col lg:flex-row justify-between mt-4">
    //     <div className="lg:w-2/3 lg:mr-2">
    //       <h2>My Contracts</h2>
    //       {custom && custom.length > 0 && (
    //         <AcceptedContracts contractsList={custom} cancelBid={cancelBid} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
    //       )}
    //       <h2>Bush Divers Community Contracts</h2>
    //       {community && community.length > 0 && (
    //         <AcceptedContracts contractsList={community} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} />
    //       )}
    //       <h2>Available Contracts</h2>
    //       {contracts && contracts.length > 0 && (
    //         <AcceptedContracts contractsList={contracts} selectedContract={selectedContract} updateSelectedContract={updateSelectedContract} cancelBid={cancelBid} />
    //       )}
    //     </div>
    //     <div className="lg:w-1/3 lg:ml-2 mt-2 lg:mt-0">
    //       { contracts && contracts.length > 0 && <div className="rounded shadow bg-white p-4">
    //         <MyContractMap data={selectedContract} size="large" mapStyle={auth.user.map_style} />
    //       </div>}
    //     </div>
    //   </div>
    // </div>
  )
}

MyContracts.layout = page => <AppLayout children={page} title="Available Contracts" heading="Available Contracts" />

export default MyContracts
