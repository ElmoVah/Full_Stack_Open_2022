import { createSlice } from '@reduxjs/toolkit'

let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (message) => {
  return dispatch => {
    clearTimeout(timeout)
    dispatch(showNotification(message))
    timeout = setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }
}

export default notificationSlice.reducer
