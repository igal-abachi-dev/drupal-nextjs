import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from "jotai";
import {GlobalAppAtom} from "../atoms/store";

function MyApp({ Component, pageProps }: AppProps) {
  const { initialState } = pageProps;

  const isSSR = typeof window === "undefined";

//  const SsrSuspense = isSSR ? Fragment : Suspense;
 return (<Provider > {/*initialValues={initialState && [[GlobalAppAtom, initialState]]}*/}
    <Component {...pageProps} />
  </Provider>);
}
export default MyApp
