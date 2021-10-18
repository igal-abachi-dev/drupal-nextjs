
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

//
// const axiosClient = axios.create();
//
// axiosClient.defaults.baseURL = 'https://example.com/api/v1';
//
//
//axiosClient.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//
// axiosClient.defaults.headers = {
//     'Content-Type': 'application/json',
//     Accept: 'application/json' // 'Accept': 'application/json, text/plain, */*'
// };
//"Accept": 'application/json, text/plain, */*',
//    "Content-Type": 'application/json;charset=UTF-8' //
//'Content-Type': 'application/x-www-form-urlencoded'
//
// //All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;//1000-2500 , default=0(no timeout)
//
// axiosClient.defaults.withCredentials = true;
//
//make hooks:
// export function getRequest(URL) {
//     return axiosClient.get(`/${URL}`).then(response => response);
// }
//
// export function postRequest(URL, payload) {
//     return axiosClient.post(`/${URL}`, payload).then(response => response);
// }
//
// export function patchRequest(URL, payload) {
//     return axiosClient.patch(`/${URL}`, payload).then(response => response);
// }
//
// export function deleteRequest(URL) {
//     return axiosClient.delete(`/${URL}`).then(response => response);
// }
// axios.interceptors.response.use(function (response) {
//     //Dispatch any action on success
//     return response;
// }, function (error) {
//     if(error.response.status === 401) {
//         //Add Logic to
//         //1. Redirect to login page or
//         //2. Request refresh token
//     }
//     return Promise.reject(error);
// });






//https://dev.to/harshmangalam/complete-setup-of-nextjs-swr-axios-and-material-ui-with-ssr-for-your-upcomming-projects-25b0

//https://dev.to/nilanth/how-to-use-axios-in-an-optimized-and-scalable-way-with-react-518n

export const getAllBlogContent = () => {

};


export const getPostById = (id:number) => {

};


