import Storage, { StorageKey } from '../../core/Storage'

export const localEventReducerAction = Object.freeze({
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
  RESET: 'reset'
})

export const localEventInitialState = {
  localEvents: Storage.get(StorageKey.LOCAL_EVENT) || []
}

export default function localEventReducer(state, action) {
  switch (action.type) {
    case localEventReducerAction.ADD:
      const newLocalEvent = {
        id: crypto.randomUUID(),
        ...action.payload
      }
      return {
        localEvents: Storage.set(StorageKey.LOCAL_EVENT, [newLocalEvent, ...state.localEvents])
      }
    case localEventReducerAction.EDIT:
      const newEditState = state.localEvents.map((localEvent) => {
        if (localEvent.id !== action.payload.id) return localEvent
        return action.payload
      })
      return {
        localEvents: Storage.set(StorageKey.LOCAL_EVENT, newEditState)
      }
    case localEventReducerAction.DELETE:
      const newDeleteState = state.localEvents.filter(
        (localEvent) => localEvent.id !== action.payload.id
      )
      return {
        localEvents: Storage.set(StorageKey.LOCAL_EVENT, newDeleteState)
      }
    case localEventReducerAction.RESET:
      return {
        localEvents: Storage.set(StorageKey.LOCAL_EVENT, [])
      }
    default:
      throw new Error(`L'action ${action.type} est inconnue!`)
  }
}
