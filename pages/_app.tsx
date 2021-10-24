import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import React, { useState, useRef, useEffect, Fragment, Suspense } from 'react'



import {Provider} from 'react-redux';
import store from '../state/store';

function MyApp({Component, pageProps}: AppProps) {
    const {initialState} = pageProps;

    const isSSR = typeof window === "undefined";
    const SsrSuspense = isSSR ? Fragment : Suspense;

    return (
    <Provider store={store}>
        {/*<SsrSuspense fallback={<h2>Loading...</h2>}>*/}
            <Component {...pageProps} />
        {/*</SsrSuspense>*/}
    </Provider>
    );
}

export default MyApp;
