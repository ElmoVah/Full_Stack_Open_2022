import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'

const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

const userSlice = createSlice({
  name: 'user',
  initialState: loggedUserJSON ? JSON.parse(loggedUserJSON) : null,
  reducers: {
    setUser(state, action) {
      if(action.payload !== null){
        blogsService.setToken(action.payload.token)
      } else {
        blogsService.setToken(null)
      }
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const logIn = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    console.log('user', user)
    dispatch(setUser(user))
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    )
  }
}

export const logOut = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer