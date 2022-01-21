import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Store'
import { AppRouteer } from './Routers/AppRouter'

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <AppRouteer/>
    </Provider>
  )
}
