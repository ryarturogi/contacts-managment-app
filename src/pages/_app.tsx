import DefaultLayout from '@/components/layout/DefaultLayout'
import { wrapper } from '@/lib/store'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </DefaultLayout>
  )
}
export default wrapper.withRedux(App)
