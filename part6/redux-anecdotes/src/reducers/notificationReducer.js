import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: "Placeholder notification" }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
reducers: {
  setNotification(state, action) {
    const content = action.payload
    state.push({
      content
    })
  }
}
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
