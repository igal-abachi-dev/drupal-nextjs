import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import {AxiosFetcher, Widget} from "../services/api.service";

import {selectLight, selectLastUpdate, selectGlobalState} from "../state/globalStateSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";


import _ from 'lodash';
import DOMPurify from 'dompurify';
//window.DOMPurify || (window.DOMPurify = require('dompurify').default || require('dompurify'));
import Scrollbar from "../components/Scrollbar";

import {Settings} from 'luxon';
import {AllPostsRenderer, PostRenderer} from "../components/renderers";
import useSWR, {SWRResponse} from "swr";

//import styles from '../styles/Home.module.css';

const isSSR = typeof window === "undefined";

const Home: NextPage = () => {
    const isSSR = typeof window === "undefined";

    const light:boolean = useAppSelector(selectLight);
    const lastUpdate:string = useAppSelector(selectLastUpdate);
    console.log({
        light,
        lastUpdate
    });

    Settings.defaultLocale = "he-IL";
    Settings.defaultZone = "Israel";//Asia/Jerusalem //UTC


//https://swr.vercel.app/docs/suspense


//    https://github.com/reactwg/react-18/discussions/37

    //https://github.com/reactwg/react-18/discussions/22

    /*

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})
    */

    //cors
    //https://www.drupal.org/node/2715637

// <Suspense fallback={<Spinner />}>

    //  const [globalAppAtom, setGlobalAppAtom] = useAtom(GlobalAppAtom);
    //  console.log(globalAppAtom);


    const swrResponse = useSWR(`/`, AxiosFetcher, {revalidateOnFocus: false});

    return (
        <div>
            <Head>
                <title>Next App</title>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Scrollbar>
                {
                    Widget(swrResponse, AllPostsRenderer)
                }
            </Scrollbar>


            {/*https://github.com/mui-org/material-ui/tree/next/docs/src/pages/getting-started/templates/blog*/}


            {/*https://github.com/vercel/next.js/blob/canary/examples/cms-buttercms/pages/posts/%5Bslug%5D.js*/}

            {/*https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress/lib*/}

            {/*  perfect-scrollbar*/}

            {/*  <style jsx>{`*/}
            {/*  `}</style>*/}
            {/*  <style global jsx>{`*/}
            {/*`}</style>*/}
        </div>
    )
}

export default Home;
