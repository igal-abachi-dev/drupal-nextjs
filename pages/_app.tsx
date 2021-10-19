import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import React, { useState, useRef, useEffect, Fragment, Suspense } from 'react'

import {Provider, atom, useAtom} from "jotai";
import {useHydrateAtoms, useAtomValue, useUpdateAtom} from "jotai/utils";
import {atomWithImmer} from 'jotai/immer';
import {focusAtom} from 'jotai/optics';

import {GlobalAppAtom} from "../atoms/store";

function MyApp({Component, pageProps}: AppProps) {
    const {initialState} = pageProps;

    const isSSR = typeof window === "undefined";
    // useHydrateAtoms(
    //     initialState ? [[postCache, initialState.prefetchedPostData]] : []
    // );
    const SsrSuspense = isSSR ? Fragment : Suspense;

    return (<Provider> {/*initialValues={initialState && [[GlobalAppAtom, initialState]]}*/}

        <SsrSuspense fallback={<h2>Loading...</h2>}>
            <Component {...pageProps} />
        </SsrSuspense>
    </Provider>);
}

export default MyApp
