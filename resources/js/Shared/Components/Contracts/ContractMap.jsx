import React, { useEffect, useRef, useState } from 'react'
import maplibre from 'maplibre-gl'
import { parseMapStyle } from '../../../Helpers/general.helpers'
import dayjs from '../../../Helpers/date.helpers'

const accessToken = 'pk.eyJ1IjoicnVzc2VsbHd3ZXN0IiwiYSI6ImNrc29vZm5paDEweGIzMnA3MXAzYTFuMDQifQ.7veU-ARmzYClHDFsVQvT5g'

const ContractMap = ({ departure, contracts, selectedContract, mapStyle, searchUpdated }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markers = useRef([])
  const depMarker = useRef(null)
  const [sourceSet, setSourceSet] = useState(false)

  useEffect(() => {
    if (map.current) {
      if (searchUpdated && markers.current) {
        markers.current.forEach(marker => {
          marker.remove()
        })
      }
      return
    }
    map.current = new maplibre.Map({
      container: mapContainer.current,
      style: parseMapStyle(mapStyle),
      center: [
        143.23070,
        -6.36188
      ],
      zoom: 9,
      accessToken
    })
  })

  useEffect(() => {
    if (departure) {
      if (sourceSet) {
        map.current.removeLayer('route')
        map.current.removeSource('route')
        setSourceSet(false)
      }
      if (markers.current !== null) {
        markers.current = null
      }
      const depLngLat = [departure.lon, departure.lat]
      loadDeparture(depLngLat)
    }
  }, [departure])

  useEffect(async () => {
    if (contracts) {
      if (sourceSet) {
        if (map.current.getLayer('route')) {
          map.current.removeLayer('route')
        }
        if (map.current.getSource('route')) {
          map.current.removeSource('route')
        }
        setSourceSet(false)
      }
      loadContracts()
    }
  }, [contracts])

  useEffect(() => {
    if (selectedContract) {
      let depLngLat = []
      let arrLngLat = []
      if (sourceSet) {
        if (map.current.getLayer('route')) {
          map.current.removeLayer('route')
        }
        if (map.current.getSource('route')) {
          map.current.removeSource('route')
        }
        setSourceSet(false)
      }

      if (selectedContract !== null && Object.keys(selectedContract).length !== 0) {
        console.log(selectedContract)
        depLngLat = [departure.lon, departure.lat]
        arrLngLat = [selectedContract.destination.lon, selectedContract.destination.lat]

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
          setSourceSet(true)
          const bounds = [depLngLat, arrLngLat]
          map.current.fitBounds(bounds, {
            padding: 150// { top: 150, bottom: 70, right: 70, left: 70 }
          })
        }
      }
    }
  }, [selectedContract])

  const loadContracts = () => {
    // if (markers.current.length > 0) {
    //   markers.current.forEach(marker => {
    //     console.log('i am inside a marker')
    //     marker.remove()
    //   })
    // }

    contracts.forEach(contract => {
      const cPopUp = new maplibre.Popup({
        offset: 25,
        closeOnClick: true,
        closeOnMove: true
      }).setHTML(
        `
        <div>${contract.destination.identifier} - ${contract.destination.name}</div>
        <div class="flex space-x-2"><div>${contract.distance}nm</div> <div>${contract.heading}&#176;</div></div>
        <div>${contract.cargo_qty} ${contract.cargo_type === 1 ? '(lbs)' : '(pax)'} ${contract.cargo}</div>
        <div>${dayjs(contract.expires_at).format('DD/MM/YYYY HH:mm')}</div>
        `)

      const el = document.createElement('div')
      el.className = 'bg-green-600 text-white text-xs rounded-full border-white border-2 h-10 w-10 p-1 flex items-center justify-center'
      el.innerText = contract.destination.identifier

      const contractMarker = new maplibre.Marker(el)
        .setLngLat([contract.destination.lon, contract.destination.lat])
        .setPopup(cPopUp)
        .addTo(map.current)
      markers.current = markers.current || []
      markers.current.push(contractMarker)
    })
  }

  const loadDeparture = (depLngLat) => {
    if (depMarker.current !== null) {
      depMarker.current.remove()
    }

    const depPopup = new maplibre.Popup({ offset: 25 }).setText(
      `${departure.identifier} - ${departure.name}`
    )

    const dep = document.createElement('div')
    dep.className = 'bg-orange-500 text-white text-xs rounded-full border-white border-2 h-12 w-12 p-2 flex items-center justify-center'
    dep.innerText = departure.identifier

    const depM = new maplibre.Marker(dep).setLngLat(depLngLat)
      .setPopup(depPopup)
      .addTo(map.current)

    depMarker.current = depM
    map.current.setCenter(depLngLat)
  }

  return (
    <div ref={mapContainer} className="map-container-full" />
  )
}

export default ContractMap
