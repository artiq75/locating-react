import { forwardRef, useEffect, useRef } from 'react'
import { generatePopupHTML } from '../../core/functions'
import Map from '../../core/Map'

const Viewport = forwardRef(({ localEvents }, ref) => {
  const markers = useRef([])

  useEffect(() => {
    ref.current = new Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [2, 47],
      zoom: 4,
      doubleClickZoom: false,
      dragRotate: false
    })
  }, [])

  useEffect(() => {
    if (ref.current) {
      if (markers.current) {
        for (const marker of markers.current) {
          marker.remove()
        }
      }
      for (const localEvent of localEvents) {
        markers.current = [
          ref.current.marker({
            lng: localEvent.longitude,
            lat: localEvent.latitude,
          })
            .setPopup(
              ref.current.popup().setHTML(generatePopupHTML(localEvent))
            )
            .addTo(ref.current),
          ...markers.current
        ]
      }
    }
  }, [localEvents])

  return (
    <div className="viewport">
      <div id="map"></div>
    </div>
  )
})

export default Viewport
