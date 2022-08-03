import React, { useEffect, useRef, useState } from 'react'
import maplibre from 'maplibre-gl'
import { parseMapStyle } from '../../../Helpers/general.helpers'
import dayjs from '../../../Helpers/date.helpers'

const accessToken = 'pk.eyJ1IjoicnVzc2VsbHd3ZXN0IiwiYSI6ImNrc29vZm5paDEweGIzMnA3MXAzYTFuMDQifQ.7veU-ARmzYClHDFsVQvT5g'

const MyContractMap = ({ currentLocation, contracts, selectedContract, mapStyle, fleet, refreshContracts, updateRefresh }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markers = useRef([])
  const fleetMarkers = useRef([])
  // const depMarker = useRef(null)
  // const [sourceSet, setSourceSet] = useState(false)

  useEffect(() => {
    if (map.current) {
      return
    }
    map.current = new maplibre.Map({
      container: mapContainer.current,
      style: parseMapStyle(mapStyle),
      center: [
        currentLocation.lon, // change to current location
        currentLocation.lat
      ],
      zoom: 8,
      accessToken
    })
  })

  useEffect(() => {
    if (refreshContracts) {
      loadContracts()
      loadFleet()
      updateRefresh(false)
    }
  }, [refreshContracts])

  useEffect(async () => {
    console.log('contracts list change triggered')
    if (contracts) {
      // if (sourceSet) {
      //   if (map.current.getLayer('route')) {
      //     map.current.removeLayer('route')
      //   }
      //   if (map.current.getSource('route')) {
      //     map.current.removeSource('route')
      //   }
      //   setSourceSet(false)
      // }
      loadContracts()
    }
  }, [contracts])

  useEffect(() => {
    if (fleet) {
      loadFleet()
    }
  }, [fleet])

  useEffect(() => {
    if (selectedContract) {
      if (map.current.getLayer('route')) {
        map.current.removeLayer('route')
      }

      if (map.current.getSource('route')) {
        map.current.removeSource('route')
      }

      const depLngLat = [selectedContract.current_airport.lon, selectedContract.current_airport.lat]
      const arrLngLat = [selectedContract.arr_airport.lon, selectedContract.arr_airport.lat]

      if (map.current.isStyleLoaded()) {
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [depLngLat, arrLngLat]
            }
          }
        })
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#F97316',
            'line-width': 2,
            'line-dasharray': [2, 2]
          }
        })

        const bounds = [depLngLat, arrLngLat]
        map.current.fitBounds(bounds, {
          padding: 150// { top: 150, bottom: 70, right: 70, left: 70 }
        })
      }
    }

      //     map.current.removeLayer('route')
      //   }
      //   if (map.current.getSource('route')) {
      //     map.current.removeSource('route')
      //   }

    // if (selectedContract) {
    //   let depLngLat = []
    //   let arrLngLat = []
      // if (sourceSet) {
      //   if (map.current.getLayer('route')) {
      //     map.current.removeLayer('route')
      //   }
      //   if (map.current.getSource('route')) {
      //     map.current.removeSource('route')
      //   }
      //   setSourceSet(false)
      // }

      // if (selectedContract !== null && Object.keys(selectedContract).length !== 0) {
        // console.log(selectedContract)
        // depLngLat = [selectedContract.current_airport.lon, selectedContract.current_airport.lat]
        // arrLngLat = [selectedContract.arr_airport.lon, selectedContract.arr_airport.lat]
        //
        // if (map.current.getLayer('route')) {
        //   map.current.removeLayer('route')
        // }
        // if (map.current.getSource('route')) {
        //   map.current.removeSource('route')
        // }

        // loadDeparture(depLngLat, selectedContract)

        // if (map.current.isStyleLoaded()) {
        //   map.current.addSource('route', {
        //     type: 'geojson',
        //     data: {
        //       type: 'Feature',
        //       geometry: {
        //         type: 'LineString',
        //         coordinates: [depLngLat, arrLngLat]
        //       }
        //     }
        //   })
        //   map.current.addLayer({
        //     id: 'route',
        //     type: 'line',
        //     source: 'route',
        //     paint: {
        //       'line-color': '#F97316',
        //       'line-width': 2,
        //       'line-dasharray': [2, 2]
        //     }
        //   })
        //   setSourceSet(true)
        //   const bounds = [depLngLat, arrLngLat]
        //   map.current.fitBounds(bounds, {
        //     padding: 150// { top: 150, bottom: 70, right: 70, left: 70 }
        //   })
      //   }
      // }
  }, [selectedContract])

  const loadFleet = () => {
    if (fleetMarkers.current) {
      fleetMarkers.current.forEach(marker => {
        marker.remove()
      })
    }
    fleet.forEach(ac => {
      const acPopUp = new maplibre.Popup({
        offset: 25,
        closeOnClick: true,
        closeOnMove: true
      }).setHTML(
        `
        <div>${ac.registration} - ${ac.fleet.type} ${ac.fleet.manufacturer} ${ac.fleet.name}</div>
        `)

      const el = document.createElement('img')
      el.className = 'marker'
      el.width = 30
      el.height = 30
      el.src = 'https://res.cloudinary.com/dji0yvkef/image/upload/v1631525263/BDVA/icon_c208_orangekFus_whiteWings_revnmm.png'

      const acMarker = new maplibre.Marker(el)
        .setLngLat([ac.last_lon, ac.last_lat])
        .setPopup(acPopUp)
        .addTo(map.current)

      fleetMarkers.current = fleetMarkers.current || []
      fleetMarkers.current.push(acMarker)
    })
  }

  const loadContracts = () => {
    if (markers.current) {
      markers.current.forEach(marker => {
        marker.remove()
      })
    }
    const depList = []

    contracts.forEach(contract => {
      const cPopUp = new maplibre.Popup({
        offset: 25,
        closeOnClick: true,
        closeOnMove: true
      }).setHTML(
        `
        <div>${contract.arr_airport.identifier} - ${contract.arr_airport.name}</div>
        <div class="flex space-x-2"><div>${contract.distance}nm</div> <div>${contract.heading}&#176;</div></div>
        <div>${contract.cargo_qty} ${contract.cargo_type === 1 ? '(lbs)' : '(pax)'} ${contract.cargo}</div>
        <div>${dayjs(contract.expires_at).format('DD/MM/YYYY HH:mm')}</div>
        `)

      const el = document.createElement('div')
      el.className = 'bg-green-600 text-white text-xs rounded-full border-white border-2 h-10 w-10 p-1 flex items-center justify-center'
      el.innerText = contract.arr_airport.identifier

      if (!depList.includes(contract.current_airport.identifier)) {
        depList.push(contract.current_airport.identifier)

        const depPopup = new maplibre.Popup({ offset: 25 }).setText(
          `${contract.current_airport.identifier} - ${contract.current_airport.name}`
        )

        const dep = document.createElement('div')
        dep.className = 'bg-orange-500 text-white text-xs rounded-full border-white border-2 h-12 w-12 p-2 flex items-center justify-center'
        dep.innerText = contract.current_airport.identifier

        const depM = new maplibre.Marker(dep).setLngLat([contract.current_airport.lon, contract.current_airport.lat])
          .setPopup(depPopup)
          .addTo(map.current)

        markers.current = markers.current || []
        markers.current.push(depM)
      }

      const contractMarker = new maplibre.Marker(el)
        .setLngLat([contract.arr_airport.lon, contract.arr_airport.lat])
        .setPopup(cPopUp)
        .addTo(map.current)
      markers.current = markers.current || []
      markers.current.push(contractMarker)
    })
  }

  // const loadDeparture = (depLngLat, contract) => {
  //   if (depMarker.current !== null) {
  //     depMarker.current.remove()
  //   }
  //
  //   const depPopup = new maplibre.Popup({ offset: 25 }).setText(
  //     `${contract.current_airport.identifier} - ${contract.current_airport.name}`
  //   )
  //
  //   const dep = document.createElement('div')
  //   dep.className = 'bg-orange-500 text-white text-xs rounded-full border-white border-2 h-12 w-12 p-2 flex items-center justify-center'
  //   dep.innerText = contract.current_airport.identifier
  //
  //   const depM = new maplibre.Marker(dep).setLngLat(depLngLat)
  //     .setPopup(depPopup)
  //     .addTo(map.current)
  //
  //   depMarker.current = depM
  //   map.current.setCenter(depLngLat)
  // }

  return (
    <div ref={mapContainer} className="map-container-full" />
  )
}

export default MyContractMap
