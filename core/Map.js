import maplibregl from 'maplibre-gl'

export default class Map extends maplibregl.Map {
  constructor(options) {
    super(options)
  }

  /**
   * Créer un nouveau markeur attaché la map actuelle
   */
  marker(options = {}) {
    return new maplibregl.Marker(options).setLngLat(options).addTo(this)
  }

  /**
   * Créer une nouveau popup
   */
  popup(options = {}) {
    return new maplibregl.Popup(options)
  }

  /**
   * Vole dans la map jusqu'au coordonnées
   */
  flyTo(options) {
    super.flyTo({
      essential: true,
      zoom: 7,
      speed: 1,
      curve: 1,
      ...options
    })
  }
}
