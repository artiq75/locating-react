import { localEventReducerAction } from '../../reducers/localEventReducer'
import OutlinerItem from './OutlinerItem'

export default function Outliner({ localEvents, dispatch }) {
  const handleDeleteAll = function () {
    if (!confirm('Voulez-vous vraiment tout supprimer?')) return
    dispatch({ type: localEventReducerAction.RESET })
  }

  return (
    <aside className="outliner">
      <h1>
        {localEvents.length
          ? `${localEvents.length} Evenements`
          : 'Aucun Evenement'}
      </h1>
      {localEvents.length > 0 && (
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Tout supprimer
        </button>
      )}
      {localEvents.map((localEvent) => (
        <OutlinerItem key={localEvent.id} localEvent={localEvent} />
      ))}
    </aside>
  )
}
