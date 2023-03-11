import { memo, useContext, useMemo } from 'react'
import { LocalEventContext } from '../../App'
import { localEventReducerAction } from '../../reducers/localEventReducer'

const OutlinerItem = memo(function ({ localEvent }) {
  const { localEventEditableID, onEditID, dispatch } =
    useContext(LocalEventContext)

  const handleEdit = function () {
    onEditID(localEvent.id)
  }

  const handleCancel = function () {
    onEditID(null)
  }

  const handleDelete = function () {
    if (!confirm('Voulez-vous vraiment supprimer ?')) return
    dispatch({ type: localEventReducerAction.DELETE, payload: localEvent })
  }

  const isEditable = useMemo(() => {
    return localEvent.id === localEventEditableID
  }, [localEvent, localEventEditableID])
  
  return (
    <article className="outliner-item" key={localEvent.id}>
      <h2>{localEvent.title}</h2>
      <div className="outliner-item-actions">
        {!isEditable && (
          <button className="btn btn-primary small" onClick={handleEdit}>
            Modifier
          </button>
        )}
        {isEditable && (
          <button className="btn btn small" onClick={handleCancel}>
            Annuler
          </button>
        )}
        <button className="btn btn-danger small" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </article>
  )
})

export default OutlinerItem
