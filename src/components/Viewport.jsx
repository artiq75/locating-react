import { forwardRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'

const Viewport = forwardRef((props, ref) => {
  useEffect(() => {
    ref.current = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [2, 47],
      zoom: 4,
      doubleClickZoom: false,
      dragRotate: false
    })
  }, [])

  return (
    <div className="viewport">
      <div id="map"></div>
    </div>
  )
})

export default Viewport
