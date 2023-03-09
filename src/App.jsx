import Outliner from './components/Outliner/Outliner'
import Viewport from './components/Viewport'
import Panel from './components/Panel'
import { createContext, useMemo, useReducer, useRef, useState } from 'react'
import localEventReducer, {
  localEventReducerAction,
  localEventInitialState
} from './reducers/localEventReducer'

export const LocalEventContext = createContext({
  localEvents: localEventInitialState,
  localEventEditableID: null,
  onEditID: () => {},
  onLocalEventDelete: () => {}
})

export default function App() {
  const [localEventEditableID, setLocalEventEditableID] = useState(null)
  const [{ localEvents }, dispatch] = useReducer(
    localEventReducer,
    localEventInitialState
  )
  const map = useRef(null)

  const handleLocalEventAdd = function (localEvent) {
    dispatch({ type: localEventReducerAction.ADD, payload: localEvent })
  }

  const handleLocalEventEdit = function (localEvent) {
    dispatch({
      type: localEventReducerAction.EDIT,
      payload: {
        id: localEventEditableID,
        ...localEvent
      }
    })
  }

  const handleLocalEventDelete = function (localEvent) {
    dispatch({ type: localEventReducerAction.DELETE, payload: localEvent })
  }

  const handleLocalEventDeleteAll = function () {
    dispatch({ type: localEventReducerAction.RESET })
  }

  const handleEditID = function (id) {
    setLocalEventEditableID(id)
  }

  const value = useMemo(() => {
    return {
      localEventEditableID,
      onLocalEventDelete: handleLocalEventDelete,
      onEditID: handleEditID
    }
  }, [localEventEditableID])

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
