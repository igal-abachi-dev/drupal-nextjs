import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {widget, axiosFetcher} from "../services/api.service";
import useSWR from "swr";

import _ from 'lodash';
import DOMPurify from 'dompurify';

const Home: NextPage = () => {

    const swrResponse = useSWR('/', axiosFetcher);


    return (
        <div>
            <Head>
                <title>Next App</title>
                <meta name="description" content=""/>
            </Head>
            {
                //cors
                //https://www.drupal.org/node/2715637


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
                    posts = posts.map(p=>{
                        p.body = _.unescape(DOMPurify.sanitize(p.body ?? "<div></div>", {SAFE_FOR_JQUERY: true}));
                        return p;
                    });

                    console.log(posts);

                    return posts.map(p => {
                        return (<div key={'p-' + p.id}>
                            <h4>{p.title}</h4>
                            <div
                                dangerouslySetInnerHTML={{__html: p.body}}>
                            </div>
                        </div>);
                    });
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
