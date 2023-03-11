import { useEffect, useRef } from 'react'
import { localEventReducerAction } from '../reducers/localEventReducer'

export default function Panel({
  map,
  localEvents,
  dispatch,
  localEventEditableID,
  onEditID
}) {
  const form = useRef(null)

  useEffect(() => {
    map.current?.on('click', (e) => {
      form.current.elements['longitude'].value = e.lngLat.lng
      form.current.elements['latitude'].value = e.lngLat.lat
    })
  }, [])

  useEffect(() => {
    if (!localEventEditableID) form.current.reset()
    const localEvent = localEvents.find((l) => l.id === localEventEditableID)
    for (const field in localEvent) {
      if (!form.current.elements[field]) continue
      form.current.elements[field].value = localEvent[field]
    }
  }, [localEventEditableID])

  const handleSubmit = function (e) {
    e.preventDefault()

    const data = new FormData(form.current)

    if (!localEventEditableID) {
      dispatch({
        type: localEventReducerAction.ADD,
        payload: Object.fromEntries(data)
      })
    } else {
      dispatch({
        type: localEventReducerAction.EDIT,
        payload: {
          id: localEventEditableID,
          ...Object.fromEntries(data)
        }
      })
    }

    form.current.reset()
  }

  const handleReset = function () {
    if (localEventEditableID) {
      onEditID(null)
    }
  }

  return (
    <aside className="panel">
      <form
        ref={form}
        onSubmit={handleSubmit}
        noValidate={true}
        onReset={handleReset}
      >
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
          <textarea name="description" id="description" cols="30" rows="10" />
        </p>
        <div className="g2 gap1">
          <button className="btn btn-primary" type="submit">
            Enregistrer
          </button>
          {localEventEditableID && (
            <button className="btn btn" type="reset">
              Annuler
            </button>
          )}
        </div>
      </form>
    </aside>
  )
}
