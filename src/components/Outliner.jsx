export default function Outliner({ localEvents, onLocalEventDelete }) {
  const handleDelete = function (localEvent) {
    if (!confirm('Voulez-vous vraiment supprimer ?')) return
    onLocalEventDelete(localEvent)
  }

  return (
    <aside className="outliner">
      {localEvents.map((localEvent) => (
        <article className="outliner-item" key={localEvent.id}>
          <h2>{localEvent.title}</h2>
          <div className="outliner-item-actions">
            <button className="btn btn-primary small">Modifier</button>
            <button
              className="btn btn-danger small"
              onClick={() => handleDelete(localEvent)}
            >
              Supprimer
            </button>
          </div>
        </article>
      ))}
    </aside>
  )
}
