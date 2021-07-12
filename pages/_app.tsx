import { SWRConfig } from 'swr'
import { Provider } from 'next-auth/client'
import { fetcher } from '@utils/fetcher'

import './styles.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher,
        }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  )
}
