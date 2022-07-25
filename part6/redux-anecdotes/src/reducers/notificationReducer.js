import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const likeNotification = (anecdote) => {
  return dispatch => {
    dispatch(setNotification(`you voted ${anecdote}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
} 

export default notificationSlice.reducer
