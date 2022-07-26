import React from 'react'
import dayjs from '../../Helpers/date.helpers'
import { Link } from '@inertiajs/inertia-react'
import Pagination from '../../Shared/Elements/Pagination'
import AppLayout from '../../Shared/AppLayout'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../../Shared/Elements/Tooltip'

const AirportToolTip = (props) => {
  return (
    <>
      <div>Altitude: {props.airport.altitude}ft</div>
      <div>Longest Runway: {props.airport.longest_runway_surface} - {props.airport.longest_runway_length.toLocaleString(navigator.language)}ft x {props.airport.longest_runway_width}ft</div>
    </>
  )
}

const CompletedContracts = ({ contracts }) => {
  return (
    <div className="p-4">
        <div className="rounded shadow bg-white overflow-x-auto my-4">
        <table className="table-condensed table-auto">
          <thead>
          <tr className="">
            <th>Id</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Distance</th>
            <th>Cargo</th>
            <th>Value</th>
            <td>Completed Date</td>
          </tr>
          </thead>
          <tbody>
          {contracts && contracts.data.length > 0 && contracts.data.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>
                  <Tooltip content={<AirportToolTip airport={contract.dep_airport} />} direction="top">
                    <Link href={`/airports/${contract.dep_airport_id}`}>{contract.dep_airport_id}</Link> {contract.dep_airport.longest_runway_surface === 'W' && <FontAwesomeIcon icon={faAnchor} />}
                    <span className="text-xs">{contract.dep_airport.name} </span>
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
                  {contract.cargo_qty.toLocaleString(navigator.language)} {contract.cargo_type_id === 1 ? 'lbs' : ''} {contract.cargo}
                </td>
                {/* <td>${contract.contract_value.toLocaleString()}</td> */}
                <td>${contract.contract_value}<br/></td>
                <td>
                  {dayjs(contract.completed_at).format('DD/MM/YYYY HH:mm')}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 shadow rounded">
        <Pagination pages={contracts} />
      </div>
    </div>
  )
}

CompletedContracts.layout = page => <AppLayout children={page} title="Completed Contracts" heading="Completed Contracts" />

export default CompletedContracts
