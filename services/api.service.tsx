import Axios from "axios";
import useSWR, {SWRConfig, SWRResponse} from "swr";
import {HttpApi, IHttpApi, useAxios, sanitize} from "../hooks/useAxios";
import {DateTime} from "luxon";

const isSSR = typeof window === "undefined";

const baseUrl: string = 'https://master-7rqtwti-3hqtmcw5mgmri.ovhcloud-fr-1.webpaas.ovh.net/api/content';


const http = new HttpApi(baseUrl);
// http.setToken(null);

export const AxiosFetcher = async (url: string) => {
    // console.log('swr: ',url , http);

    return await http.get<any>(url)
};

export function widget(res: SWRResponse<any, any>, renderer: (data: any) => any): any {
    if (isSSR) {
        //console.log('swr: ssr');
        return (<div></div>);
    }

    // x icon
    if (res.error) {
        //console.log('swr: error');
        return <div>failed to load</div>
    }

    //spinner
    if (!res.data) {
        //  console.log('swr: loading');
        return <div>loading...</div>
    }

    //console.log('swr: rendering');

    //should handle null/empty data too

    const component: any = renderer(res.data);
    //console.log('swr', component);
    return component;
}


