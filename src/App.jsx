import Outliner from './components/Outliner'
import Viewport from './components/Viewport'
import Panel from './components/Panel'
import maplibre from "maplibre-gl";
import { useEffect, useRef } from "react";

export default function App() {
  const map = useRef({})

  useEffect(() => {
    map.current = new maplibre.Map({
      container: "map",
      style: 'https://demotiles.maplibre.org/style.json',
      center: [2, 47],
      zoom: 4,
      doubleClickZoom: false,
      dragRotate: false
    })
  }, [])

  return (
    <>
      <Outliner />
      <Viewport />
      <Panel map={map} />
    </>
  )
}
