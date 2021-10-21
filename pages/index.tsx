import type {NextPage} from 'next';
import Head from 'next/head';
import {AxiosFetcher,  widget} from "../services/api.service";

import _ from 'lodash';
import DOMPurify from 'dompurify';
//window.DOMPurify || (window.DOMPurify = require('dompurify').default || require('dompurify'));
import Scrollbar from "../components/Scrollbar";

import {useAtom} from "jotai";
import {GlobalAppAtom} from "../atoms/store";
import {Settings} from 'luxon';
import {AllPostsRenderer, PostRenderer} from "../components/renderers";
import useSWR, {SWRResponse} from "swr";

const isSSR = typeof window === "undefined";

const Home: NextPage = () => {

    const isSSR = typeof window === "undefined";
    Settings.defaultLocale = "he-IL";
    Settings.defaultZone = "Israel";//Asia/Jerusalem //UTC



//https://swr.vercel.app/docs/suspense

    //https://codesandbox.io/s/github/pmndrs/jotai/tree/main/examples/hacker_news?file=/src/App.tsx

    //https://codesandbox.io/s/nextjs-with-jotai-5ylrj?file=/components/Clock.js

    //https://github.com/vercel/next.js/blob/canary/examples/with-jotai/pages/index.tsx

    //https://github.com/pmndrs/jotai

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

    // const [globalAppAtom, setGlobalAppAtom] = useAtom(GlobalAppAtom);
    // console.log(globalAppAtom);


    const swrResponse = useSWR(`/`,  AxiosFetcher,{revalidateOnFocus :false});

    return (
        <div>
            <Head>
                <title>Next App</title>
                <meta name="description" content=""/>
            </Head>

            <Scrollbar>
                {
                    widget(swrResponse, AllPostsRenderer)
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
