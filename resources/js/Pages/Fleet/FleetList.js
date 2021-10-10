import React from 'react'
import Layout from '../../Shared/Layout'
import PageTitle from '../../Shared/Navigation/PageTitle'
import Card from '../../Shared/Elements/Card'
import FleetMap from '../../Shared/Components/Fleet/FleetMap'

const FleetCardContent = ({ fleet }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col md:flex-row">
          <img className="rounded w-full md:w-auto" src="https://via.placeholder.com/300x150" />
          <div className="md:ml-3">
            <div className="text-2xl">{fleet.type} - {fleet.manufacturer} {fleet.name}</div>
            <p>{fleet.aircraft.length} aircraft in fleet</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row mt-2 md:mt-0">
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Powerplants: </span><br/>
              <span>{fleet.number_of_engines}x {fleet.powerplants}</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Fuel Type: </span><br/>
              <span>100ll</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Fuel Capacity: </span><br/>
              <span>{fleet.fuel_capacity} gal</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Service Ceiling: </span><br/>
              <span>{fleet.service_ceiling} ft</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Max Range: </span><br/>
              <span>{fleet.range}</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Max Cruise Speed: </span><br/>
              <span>{fleet.cruise_speed} kts</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">PAX Capacity: </span><br/>
              <span>{fleet.pax_capacity} kg</span>
            </div>
            <div className="mr-8">
              <span className="text-md font-bold text-gray-600">Cargo Capacity: </span><br/>
              <span>{fleet.cargo_capacity} kg</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 overflow-x-auto">
        {fleet.aircraft.length > 0 &&
        <table className="table table-auto">
          <thead>
          <tr>
            <th scope="col">Registration</th>
            <th scope="col">Current Location</th>
            <th scope="col">Flight Time (minutes)</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
            {fleet.aircraft.map((aircraft) => (
              <tr key={aircraft.id}>
                <td>{aircraft.registration}</td>
                <td>{aircraft.current_airport_id}</td>
                <td>{aircraft.flight_time_mins}</td>
                <td>{aircraft.status}</td>
              </tr>
            ))}
          </tbody>
          </table>
        }
      </div>
    </>
  )
}

const FleetList = ({ fleet }) => {
  const fleetItems = fleet.map((f) => <Card key={f.id} content={<FleetCardContent fleet={f} />} />)

  return (
    <div>
      <PageTitle title="Fleet" />
      {/* <FleetMap aircraft={aircraft} size="large" /> */}
      {fleetItems}
    </div>
  )
}

FleetList.layout = page => <Layout children={page} title="Fleet" />

export default FleetList