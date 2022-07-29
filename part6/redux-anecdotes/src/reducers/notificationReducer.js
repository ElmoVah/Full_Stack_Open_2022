import { createSlice } from '@reduxjs/toolkit'

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

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, time*1000)
  }
} 

export default notificationSlice.reducer
