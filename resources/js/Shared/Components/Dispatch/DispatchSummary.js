import React from 'react'

const DispatchSummary = (props) => {
  return (
    <>
      <div className="text-xl">Dispatch Summary</div>
      <p className="mt-2">Planned Destination: {props.pirep && <span>{props.pirep.destination_airport_id}</span>}</p>
      <div className="mt-2">
        <div>
          {props.selectedAircraft && <div className="flex justify-start items-center"><i className="material-icons mr-2">flight</i><span>{props.selectedAircraft.registration} - {props.selectedAircraft.fleet.manufacturer} {props.selectedAircraft.fleet.name} ({props.selectedAircraft.fleet.type})</span></div>}
        </div>
      </div>
      <div className="mt-2">
        <div className="text-lg mb-1">Payload:</div>
        <div>Pilot & payload weight (inc. fuel): {props.selectedAircraft && <span className={props.selectedAircraft && (props.personWeight + props.fuelWeight + props.cargoWeight) > (props.selectedAircraft.fleet.mtow - props.selectedAircraft.fleet.zfw) ? 'text-red-500' : ''}>{(props.personWeight + props.fuelWeight + props.cargoWeight)} kg / {(props.selectedAircraft.fleet.mtow - props.selectedAircraft.fleet.zfw)} kg</span>}</div>
        <div>Cargo payload: {props.selectedAircraft && <span className={props.selectedAircraft && props.cargoWeight > props.selectedAircraft.fleet.cargo_capacity ? 'text-red-500' : ''}>{props.cargoWeight} kg / {props.selectedAircraft.fleet.cargo_capacity} kg</span>}</div>
        <div>Passenger count: {props.selectedAircraft && <span className={props.selectedAircraft && props.passengerCount > props.selectedAircraft.fleet.pax_capacity ? 'text-red-500' : ''}>{props.passengerCount} / {props.selectedAircraft.fleet.pax_capacity}</span>}</div>
        <div className="mt-1">Fuel: {props.pirep && <span>{props.pirep.planned_fuel}</span>} gal</div>
      </div>
    </>
  )
}

export default DispatchSummary