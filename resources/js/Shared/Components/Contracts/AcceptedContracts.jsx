import React from 'react'
import NoContent from '../../Elements/NoContent'
import Tooltip from '../../Elements/Tooltip'
import { Link } from '@inertiajs/inertia-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnchor,
  faArrowUp, faCheck,
  faCompass, faDollarSign, faPlaneArrival, faPlaneDeparture,
  faSuitcase,
  faTicket,
  faUserGroup,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import dayjs from '../../../Helpers/date.helpers'
import { formatNumber } from '../../../Helpers/general.helpers'

const AcceptedContracts = ({ contractsList, cancelBid, selectedContract, updateSelectedContract }) => {
  return (
    <>
      {contractsList && contractsList.map(contract => (
      <div key={contract.id} onClick={() => updateSelectedContract(contract)} className={`${contract.id === selectedContract.id ? 'bg-orange-200 hover:bg-orange-100' : 'bg-white'} border-t px-4 py-3 text-sm cursor-pointer z-40 flex`}>
        <div className="flex flex-col w-5/6 space-y-2">
          <div className="text-xs">Id: {contract.id}</div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Tooltip direction="top" content="Cargo">
                  <FontAwesomeIcon icon={faSuitcase} /><span className="text-lg mx-2">{contract.cargo_type_id === 1 ? <>{formatNumber(contract.cargo_qty)}</> : <>0</>}</span>lbs
                </Tooltip>
              </div>
              <div className="flex items-center">
                <Tooltip direction="top" content="Passengers">
                  <FontAwesomeIcon icon={faUserGroup} /><span className="text-lg mx-2">{contract.cargo_type_id === 2 ? <>{contract.cargo_qty}</> : <>0</>}</span>
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
                  <FontAwesomeIcon icon={faPlaneDeparture} /><span className="text-lg mx-2">{contract.current_airport.identifier}</span>
                </Tooltip>
              </div>
              <div>
                <Tooltip direction="top" content="Destination">
                  <FontAwesomeIcon icon={faPlaneArrival} />
                  <span className="text-lg mx-2">
                          {contract.arr_airport.identifier} {contract.arr_airport.longest_runway_surface === 'W' ? <FontAwesomeIcon icon={faAnchor} /> : <></>}
                        </span>
                </Tooltip>
              </div>
              <div>
                <Tooltip direction="top" content="Cargo details">
                  {formatNumber(contract.cargo_qty)} {contract.cargo_type_id === 1 ? '(lbs)' : '(pax)'} {contract.cargo}
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
          <Tooltip direction="left" content="Cancel contract">
            <button onClick={() => cancelBid(contract)} className="btn btn-primary btn-small">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </Tooltip>
        </div>
      </div>
      ))}
    </>
  )
}

export default AcceptedContracts
