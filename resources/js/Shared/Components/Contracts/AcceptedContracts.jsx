import React from 'react'
import NoContent from '../../Elements/NoContent'
import Tooltip from '../../Elements/Tooltip'
import { Link } from '@inertiajs/inertia-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faArrowUp, faTicket, faXmark } from '@fortawesome/free-solid-svg-icons'
import dayjs from '../../../Helpers/date.helpers'

const EmptyData = (props) => {
  return (
    <>
      <FontAwesomeIcon className="text-xl" icon={faTicket} />
      <div>{props.text}</div>
    </>
  )
}

const AirportToolTip = (props) => {
  return (
    <>
      <div>Altitude: {props.airport.altitude}ft</div>
      <div>Longest Runway: {props.airport.longest_runway_surface} - {props.airport.longest_runway_length.toLocaleString(navigator.language)}ft x {props.airport.longest_runway_width}ft</div>
    </>
  )
}

const AcceptedContracts = ({ contractsList, cancelBid, selectedContract, updateSelectedContract }) => {
  return (
    <div className="rounded shadow bg-white overflow-x-auto my-4">
      {!contractsList && <NoContent content={<EmptyData text="No contracts" />} />}
      {contractsList && contractsList.length > 0 &&
        // (
        <div>
          <table className="table-condensed table-auto">
            <thead>
            <tr className="">
              <th>Id</th>
              <th>Departure</th>
              <th>Current</th>
              <th>Arrival</th>
              <th>Distance</th>
              <th>Heading</th>
              <th>Cargo</th>
              <th>Value</th>
              <th>Expires</th>
              <td>Cancel</td>
            </tr>
            </thead>
            <tbody className="cursor-pointer">
            {contractsList && contractsList.length > 0 && contractsList.map((contract) => (
              <>
                <tr key={contract.id} onClick={() => updateSelectedContract(contract)} className={selectedContract && contract.id === selectedContract.id ? 'bg-orange-200 hover:bg-orange-100' : ''}>
                  <td>{contract.id}</td>
                  <td>
                    <Tooltip content={<AirportToolTip airport={contract.dep_airport} />} direction="top">
                      <Link href={`/airports/${contract.dep_airport_id}`}>{contract.dep_airport_id}</Link> {contract.dep_airport.longest_runway_surface === 'W' && <FontAwesomeIcon icon={faAnchor} />}
                      <span className="text-xs">{contract.dep_airport.name} </span>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip content={<AirportToolTip airport={contract.current_airport} />} direction="top">
                      <Link href={`/airports/${contract.current_airport_id}`}>{contract.current_airport_id}</Link> {contract.current_airport.longest_runway_surface === 'W' && <FontAwesomeIcon icon={faAnchor} />}
                      <span className="text-xs">{contract.current_airport.name} </span>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip content={<AirportToolTip airport={contract.arr_airport} />} direction="top">
                      <Link href={`/airports/${contract.arr_airport_id}`}>{contract.arr_airport_id}</Link> {contract.arr_airport.longest_runway_surface === 'W' && <FontAwesomeIcon icon={faAnchor} />}<br/>
                      <span className="text-xs">{contract.arr_airport.name}</span>
                    </Tooltip>
                  </td>
                  <td>{contract.distance.toLocaleString(navigator.language)} nm</td>
                  <td>
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <span className="mr-2">{contract.heading}</span>
                      </div>
                      <div className="w-1/2 flex">
                        <span style={{ transform: `rotate(${contract.heading}deg)` }}><FontAwesomeIcon icon={faArrowUp} className="text-gray-700" /></span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {contract.cargo_qty.toLocaleString(navigator.language)} {contract.cargo_type_id === 1 ? 'lbs' : ''} {contract.cargo}
                  </td>
                  {/* <td>${contract.contract_value.toLocaleString()}</td> */}
                  <td>${contract.contract_value}<br/></td>
                  <td>
                    {dayjs(contract.expires_at).format('DD/MM/YYYY HH:mm')}
                  </td>
                  <td>
                    <button onClick={() => cancelBid(contract)} className="btn btn-secondary flex items-center">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              </>
            ))}
            </tbody>
          </table>
        </div>
        // )
      }
    </div>
  )
}

export default AcceptedContracts
