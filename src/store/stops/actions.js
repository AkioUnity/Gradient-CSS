import deepEqual from 'deep-equal'

import { shiftConflictedStops, shiftStops } from './utils'
import { TOGGLE_TRASH_ICON } from './../icons/actions'
import { UPDATE_EDITED_STATE } from './../gradients/actions'
import { INITIAL_STATE as initStops } from './reducer'
import { INITIAL_STATE as initGradients } from './../gradients/reducer'
import { getGradientData } from '././../gradients/selectors'

const UPDATING_STOP_THRESHOLD = 5
export const STOP_LIMIT = 7
// actions
export const UPDATE_UPDATING_STOP = 'stops/UPDATE_UPDATING_STOP'
export const EDIT_STOP = 'stops/EDIT_STOP'
export const EDIT_STOP_COLOR = 'stops/EDIT_STOP_COLOR'
export const SWAP_STOP_COLORS = 'stops/SWAP_STOP_COLORS'
export const UPDATE_DRAGGED_STOP_POS = 'stops/UPDATE_DRAGGED_STOP_POS'
export const TOGGLE_ACTIVE_COLOR_PICKER = 'stops/TOGGLE_ACTIVE_COLOR_PICKER'
export const UPDATE_STOP_COLOR = 'stops/UPDATE_STOP_COLOR'
export const UPDATE_ACTIVE_STOP = 'stops/UPDATE_ACTIVE_STOP'
export const DELETE_ACTIVE_STOP = 'stops/DELETE_ACTIVE_STOP'
export const ADD_COLOR_STOP = 'stops/ADD_COLOR_STOP'
export const RESET_COLOR_STOP = 'stops/RESET_COLOR_STOP'

export const updateUpdatingStop = (stop, xPos) => dispatch =>
  dispatch({
    type: UPDATE_UPDATING_STOP,
    payload: {
      stop,
      xPos
    }
  })

export const editStop = id => dispatch =>
  dispatch({
    type: EDIT_STOP,
    payload: {
      id
    }
  })

export const editStopColor = (id, stop) => (dispatch, getState) => {
  const { stops: { updating: { pickingColorStop }, editingColor } } = getState()
  if ((editingColor === id && stop === pickingColorStop) || id === null) {
    return dispatch({
      type: EDIT_STOP_COLOR,
      payload: {
        id: null
      }
    })
  }
  return dispatch({
    type: EDIT_STOP_COLOR,
    payload: {
      id
    }
  })
}

export const swapStopsColors = (id, colors) => (dispatch, getState) => {
  const { stops, gradients } = getState()
  // const updatedStop = Object.keys(stops.values[id]).reduce((aggr, curr, index) => {
  //   aggr[curr] = colors[index];
  //   return aggr;
  // }, {});

  const updatedStop = Object.keys(stops.values[id]).reduce((aggr, curr, index) => {
    const newAggr = { ...aggr }
    newAggr[curr] = colors[index]
    return newAggr
  }, {})
  const orig = getGradientData(id, initGradients, initStops)
  const newdata = getGradientData(id, gradients, stops)
  newdata.stops = updatedStop

  dispatch({
    type: UPDATE_EDITED_STATE,
    payload: {
      edited: !deepEqual(orig, newdata),
      id
    }
  })

  return dispatch({
    type: SWAP_STOP_COLORS,
    payload: {
      id,
      updatedStop
    }
  })
}

// eslint-disable-next-line consistent-return
export const updateDraggedStopPos = xPos => (dispatch, getState) => {
  const {
    stops: { updating: { stop, origUnchanged, passThreshold }, editing, updatingStopXPos, editingColor },
    dimensions: { swatch: { left, width } },
    icons: { deleteStop }
  } = getState()

  if (stop !== null) {
    let updatedStopValues = { ...origUnchanged }
    let updatedStop = Math.round((xPos - left) / width * 100)

    if (updatedStop < 0) updatedStop = 0
    else if (updatedStop > 100) updatedStop = 100

    delete updatedStopValues[stop]
    if (updatedStopValues[updatedStop] !== undefined) {
      updatedStopValues = shiftConflictedStops(updatedStopValues, updatedStop, stop > updatedStop)
    }
    updatedStopValues[updatedStop] = origUnchanged[stop]

    if (Math.abs(updatingStopXPos - xPos) >= UPDATING_STOP_THRESHOLD) {
      if (!deleteStop) {
        dispatch({
          type: TOGGLE_TRASH_ICON,
          payload: {
            id: editing
          }
        })
      }

      dispatch({
        type: UPDATE_EDITED_STATE,
        payload: {
          edited: true,
          id: editing
        }
      })

      if (editingColor) {
        dispatch({
          type: EDIT_STOP_COLOR,
          payload: {
            id: editing
          }
        })
      }

      return dispatch({
        type: UPDATE_DRAGGED_STOP_POS,
        payload: {
          editing,
          updatedStopValues,
          updatedStop: updatedStop.toString(),
          passThreshold: true
        }
      })
    } else if (passThreshold) {
      return dispatch({
        type: UPDATE_DRAGGED_STOP_POS,
        payload: {
          editing,
          updatedStopValues,
          updatedStop: updatedStop.toString()
        }
      })
    }
  }
}

export const updateActiveColorPicker = (stop, currActive) => dispatch => {
  if (stop === currActive || stop === null) {
    return dispatch({
      type: TOGGLE_ACTIVE_COLOR_PICKER,
      payload: {
        stop: null
      }
    })
  }
  return dispatch({
    type: TOGGLE_ACTIVE_COLOR_PICKER,
    payload: {
      stop
    }
  })
}

export const updateStopColor = (stop, color, id) => dispatch => {
  dispatch({
    type: UPDATE_EDITED_STATE,
    payload: {
      edited: true,
      id
    }
  })

  return dispatch({
    type: UPDATE_STOP_COLOR,
    payload: {
      stop,
      color,
      id
    }
  })
}

export const updateActiveStop = stop => dispatch =>
  dispatch({
    type: UPDATE_ACTIVE_STOP,
    payload: {
      stop
    }
  })

// eslint-disable-next-line consistent-return
export const deleteActiveStop = id => (dispatch, getState) => {
  const { stops, gradients } = getState()
  const orig = getGradientData(id, initGradients, initStops)
  const newdata = getGradientData(id, gradients, stops)
  delete newdata.stops[stops.updating.active]

  dispatch({
    type: UPDATE_EDITED_STATE,
    payload: {
      edited: !deepEqual(orig, newdata),
      id
    }
  })

  const newValues = { ...stops.values[id] }
  if (Object.keys(newValues).length > 2) {
    delete newValues[stops.updating.active]

    dispatch({
      type: DELETE_ACTIVE_STOP,
      payload: {
        editing: id,
        newValues
      }
    })

    return dispatch({
      type: TOGGLE_TRASH_ICON,
      payload: {
        id: null
      }
    })
  }
}

// eslint-disable-next-line consistent-return
export const addColorStop = id => (dispatch, getState) => {
  const { stops, gradients } = getState()

  const newValues = shiftStops(stops.values[id])
  if (Object.keys(newValues).length < STOP_LIMIT) {
    const orig = getGradientData(id, initGradients, initStops)
    const newdata = getGradientData(id, gradients, stops)
    newdata.stops = newValues

    dispatch({
      type: UPDATE_EDITED_STATE,
      payload: {
        edited: !deepEqual(orig, newdata),
        id
      }
    })

    return dispatch({
      type: ADD_COLOR_STOP,
      payload: {
        editing: id,
        newValues
      }
    })
  }
}

export const resetColorStop = id => dispatch =>
  dispatch({
    type: RESET_COLOR_STOP,
    payload: {
      id
    }
  })
