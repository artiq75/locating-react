import { useMemo } from 'react'

export default function OutlinerItem({
  localEvent,
  onLocalEventDelete,
  onEditID,
  localEventEditableID
}) {
  const handleDelete = function (localEvent) {
    if (!confirm('Voulez-vous vraiment supprimer ?')) return
    onLocalEventDelete(localEvent)
  }

  const isEditable = useMemo(() => {
    return localEvent.id === localEventEditableID
  }, [localEvent, localEventEditableID])

  return (
    <article className="outliner-item" key={localEvent.id}>
      <h2>{localEvent.title}</h2>
      <div className="outliner-item-actions">
        {!isEditable && (
          <button
            className="btn btn-primary small"
            onClick={() => onEditID(localEvent.id)}
          >
            Modifier
          </button>
        )}
        {isEditable && (
          <button className="btn btn small" onClick={() => onEditID(null)}>
            Annuler
          </button>
        )}
        <button
          className="btn btn-danger small"
          onClick={() => handleDelete(localEvent)}
        >
          Supprimer
        </button>
      </div>
    </article>
  )
}
