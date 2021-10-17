import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {widget, axiosFetcher} from "../services/api.service";
import useSWR from "swr";

import _ from 'lodash';
import DOMPurify from 'dompurify';
//window.DOMPurify || (window.DOMPurify = require('dompurify').default || require('dompurify'));

import Scrollbar from "../components/Scrollbar";

const Home: NextPage = () => {

    const isSSR = typeof window === "undefined";

    const swrResponse = useSWR('/', axiosFetcher /*, { suspense: true }*/);
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

    return (
        <div>
            <Head>
                <title>Next App</title>
                <meta name="description" content=""/>
            </Head>
            {
                //cors
                //https://www.drupal.org/node/2715637

// <Suspense fallback={<Spinner />}>

                widget(swrResponse, (data: any) => {
                    let posts = data.map(p => {
                        return {
                            id: p.nid[0].value,
                            type: p.type[0].target_id,
                            title: p.title[0].value,
                            body: p.body[0].value,
                            summery: p.body[0].summery,
                            created: p.created[0].value,
                            changed: p.changed[0].value,
                        };
                    });

                    //sanitize:
                    if (!isSSR)
                        posts = posts.map(p => {
                            // @ts-ignore
                            p.body = _.unescape(DOMPurify.sanitize(p.body ?? "<div></div>", {SAFE_FOR_JQUERY: true}));
                            //p.title = _.unescape(DOMPurify.sanitize(p.title ?? "", {SAFE_FOR_JQUERY: true}));
                            return p;
                        });

                    console.log(posts);

                    return (<Scrollbar>
                        {
                            posts.map(p => {
                                return (<div key={'p-' + p.id}>
                                    <h4>{p.title}</h4>
                                    <div
                                        dangerouslySetInnerHTML={{__html: p.body}}>
                                    </div>
                                </div>)
                            })
                        }
                    </Scrollbar>);
                })
            }


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
