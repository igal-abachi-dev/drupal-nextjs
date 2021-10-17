
import Axios from "axios";
import useSWR ,{ SWRConfig, SWRResponse } from "swr";

const isSSR = typeof window === "undefined";


export const axiosFetcher = async (url) => {
    try {
        //axios.get(url).then(res => res.data)
        const res = await Axios.get(baseUrl+url);
        return res.data;
    } catch (err) {
        throw err.response.data;
    }
};

const baseUrl:string = 'https://master-7rqtwti-3hqtmcw5mgmri.ovhcloud-fr-1.webpaas.ovh.net/api/content';

export const widget = (res :SWRResponse<any, any>, renderer:any) => {

    // x icon
    if (res.error) return <div>failed to load</div>
    //spinner
    if (!res.data) return <div>loading...</div>

    //should handle null/empty data too
    return renderer(res.data);
}


//Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
//Axios.defaults.withCredentials = true;

//https://dev.to/harshmangalam/complete-setup-of-nextjs-swr-axios-and-material-ui-with-ssr-for-your-upcomming-projects-25b0



export const getAllBlogContent = () => {

};


export const getPostById = (id:number) => {

};