import Outliner from './components/Outliner/Outliner'
import Viewport from './components/Viewport'
import Panel from './components/Panel'
import { createContext, useMemo, useReducer, useRef, useState } from 'react'
import localEventReducer, {
  localEventInitialState
} from './reducers/localEventReducer'

export const LocalEventContext = createContext({
  localEventEditableID: null,
  onEditID: () => {},
  dispatch: () => {}
})

export default function App() {
  const [localEventEditableID, setLocalEventEditableID] = useState(null)
  const [{ localEvents }, dispatch] = useReducer(
    localEventReducer,
    localEventInitialState
  )
  const map = useRef(null)

  const value = useMemo(() => {
    return {
      dispatch,
      localEventEditableID,
      onEditID: setLocalEventEditableID
    }
  }, [localEventEditableID])

  return (
    <>
      <LocalEventContext.Provider value={value}>
        <Outliner localEvents={localEvents} dispatch={dispatch} />
      </LocalEventContext.Provider>
      <Viewport ref={map} localEvents={localEvents} />
      <Panel
        map={map}
        localEvents={localEvents}
        dispatch={dispatch}
        localEventEditableID={localEventEditableID}
        onEditID={setLocalEventEditableID}
      />
    </>
  )
}
