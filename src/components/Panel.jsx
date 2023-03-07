import { useEffect } from 'react'

export default function Panel({ map }) {
  useEffect(() => {
    if (map.current) {
      map.current.on('click', (e) => {
        console.log(e)
      })
    }
  }, [])

  return (
    <aside className="panel">
      <form>
        <p className="form-group">
          <label htmlFor="title">Titre</label>
          <input type="text" name="title" id="title" />
        </p>
        <div className="g2 gap1">
          <p className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude" />
          </p>
          <p className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input type="number" name="latitude" id="latitude" />
          </p>
        </div>
        <div className="g2 gap1">
          <p className="form-group">
            <label htmlFor="start">Début</label>
            <input type="datetime-local" name="start" id="start" />
          </p>
          <p className="form-group">
            <label htmlFor="end">Fin</label>
            <input type="datetime-local" name="end" id="end" />
          </p>
        </div>
        <p className="form-group">
          <label htmlFor="description">Déscription</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </p>
        <button className="btn btn-primary" type="submit">
          Enregistrer
        </button>
      </form>
    </aside>
  )
}
