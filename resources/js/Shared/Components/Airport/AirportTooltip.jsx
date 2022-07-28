import React from 'react'

const AirportTooltip = ({ airport }) => {
  return (
    <>
      <div>Altitude: {airport.altitude}ft</div>
      <div>Longest Runway: {airport.longest_runway_surface} - {airport.longest_runway_length.toLocaleString(navigator.language)}ft x {airport.longest_runway_width}ft</div>
    </>
  )
}

export default AirportTooltip
