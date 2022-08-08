import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import signedInUserReducer from './reducers/signedInUserReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: signedInUserReducer,
    users: usersReducer
  }
})

export default store