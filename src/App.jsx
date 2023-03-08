import Outliner from './components/Outliner'
import Viewport from './components/Viewport'
import Panel from './components/Panel'
import { useEffect, useRef, useState } from 'react'
import Storage from '../core/Storage'

const LOCAL_EVENT_STORAGE_KEY = 'localEvent'

export default function App() {
  const [localEvents, setLocalEvents] = useState([])
  const map = useRef(null)

  useEffect(() => {
    setLocalEvents(Storage.get(LOCAL_EVENT_STORAGE_KEY))
  }, [])

  const handleLocalEventAdd = function (localEvent) {
    const newLocalEvent = {
      id: crypto.randomUUID(),
      ...localEvent
    }
    setLocalEvents((state) =>
      Storage.set(LOCAL_EVENT_STORAGE_KEY, [newLocalEvent, ...state])
    )
  }

  const handleLocalEventEdit = function (localEvent) {
    const newLocalEvents = localEvents.map((le) => {
      if (le.id !== localEvent.id) return
      return localEvent
    })
    setLocalEvents(Storage.set(LOCAL_EVENT_STORAGE_KEY, newLocalEvents))
  }

  const handleLocalEventDelete = function (localEvent) {
    const newLocalEvents = localEvents.filter((le) => le.id !== localEvent.id)
    setLocalEvents(Storage.set(LOCAL_EVENT_STORAGE_KEY, newLocalEvents))
  }

  return (
    <>
      <Outliner
        localEvents={localEvents}
        onLocalEventDelete={handleLocalEventDelete}
      />
      <Viewport ref={map} />
      <Panel map={map} onLocalEventAdd={handleLocalEventAdd} />
    </>
  )
}
