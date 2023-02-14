import DefaultLayout from '@/components/layout/DefaultLayout'
import { wrapper } from '@/lib/store'
import { Provider } from 'react-redux'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Lato', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
})

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <Component {...props.pageProps} />
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={true}
            pauseOnHover={false}
          />
        </DefaultLayout>
      </ThemeProvider>
    </Provider>
  )
}
export default App
