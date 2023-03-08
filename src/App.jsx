import Outliner from './components/Outliner/Outliner'
import Viewport from './components/Viewport'
import Panel from './components/Panel'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import Storage, { StorageKey } from '../core/Storage'

export const LocalEventContext = createContext({
  localEvents: [],
  localEventEditableID: null,
  onEditID: (value) => {},
  onLocalEventDelete: (value) => {}
})

export default function App() {
  const [localEvents, setLocalEvents] = useState([])
  const [localEventEditableID, setLocalEventEditableID] = useState(null)
  const map = useRef(null)

  useEffect(() => {
    const storage = Storage.get(StorageKey.LOCAL_EVENT)
    if (storage) {
      setLocalEvents(storage)
    }
  }, [])

  const handleLocalEventAdd = function (localEvent) {
    const newLocalEvent = {
      id: crypto.randomUUID(),
      ...localEvent
    }
    setLocalEvents((state) =>
      Storage.set(StorageKey.LOCAL_EVENT, [newLocalEvent, ...state])
    )
  }

  const handleLocalEventEdit = function (localEvent) {
    const newLocalEvents = localEvents.map((le) => {
      if (le.id !== localEventEditableID) return le
      return {
        id: localEventEditableID,
        ...localEvent
      }
    })
    setLocalEvents(Storage.set(StorageKey.LOCAL_EVENT, newLocalEvents))
  }

  const handleLocalEventDelete = function (localEvent) {
    const newLocalEvents = localEvents.filter((le) => le.id !== localEvent.id)
    setLocalEvents(Storage.set(StorageKey.LOCAL_EVENT, newLocalEvents))
  }

  const handleLocalEventDeleteAll = function () {
    setLocalEvents(Storage.set(StorageKey.LOCAL_EVENT, []))
  }

  const handleEditID = function (id) {
    setLocalEventEditableID(id)
  }

  const value = useMemo(() => {
    return {
      localEvents,
      localEventEditableID,
      onLocalEventDelete: handleLocalEventDelete,
      onEditID: handleEditID
    }
  }, [localEvents, localEventEditableID])

  return (
    <>
      <LocalEventContext.Provider value={value}>
        <Outliner
          localEvents={localEvents}
          onLocalEventDeleteAll={handleLocalEventDeleteAll}
        />
      </LocalEventContext.Provider>
      <Viewport ref={map} />
      <Panel
        map={map}
        localEvents={localEvents}
        onLocalEventAdd={handleLocalEventAdd}
        onLocalEventEdit={handleLocalEventEdit}
        localEventEditableID={localEventEditableID}
        onEditID={setLocalEventEditableID}
      />
    </>
  )
}
