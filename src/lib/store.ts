import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { contactsApi } from './contactsApi'

export const makeStore = () =>
  configureStore({
    reducer: {
      drawer: (state = false, action) => {
        switch (action.type) {
          case 'TOGGLE_DRAWER':
            return !state
          default:
            return state
        }
      },
      [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: (gDM) => gDM().concat(contactsApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
