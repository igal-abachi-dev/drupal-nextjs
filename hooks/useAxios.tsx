import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import qs from 'qs';
import _ from "lodash";
import DOMPurify from "dompurify";


export type nullable<T> = (T | null);

const isSSR = typeof window === "undefined";

export interface IHttpApi {
    setToken(token: nullable<string>): void;

    get<T>(url: string, queryString: any): Promise<T>;

    get<T>(url: string): Promise<T>;

    get<T>(): Promise<T>;

    post<T>(url: string, data: any): Promise<T>;

    patch<T>(url: string, data: any): Promise<T>;

    put<T>(url: string, data: any): Promise<T>;

    delete<T>(url: string): Promise<T>;
}


const xsrfCookieName: string = 'XSRF-TOKEN';
const xsrfHeaderName: string = 'X-XSRF-TOKEN';

export const sanitize = (data: string): string => {
    // @ts-ignore
    return _.unescape(DOMPurify.sanitize(data ?? "", {SAFE_FOR_JQUERY: true}));
};

export class HttpApi implements IHttpApi {
    constructor(baseApiUrl: string) {
        this.baseApiUrl = baseApiUrl;
        this.axClient = axios.create();
        this.axClient.defaults.baseURL = this.baseApiUrl;

        this.axClient.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        this.axClient.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
        this.axClient.defaults.timeout = 7000;//1000-2500 , default=0(no timeout)
        //c# default: 100 seconds ,  as DNS query may take up to 15 seconds, so ip url is faster
        // login takes up to 5 sec
        this.axClient.defaults.withCredentials = false; //?

        axios.interceptors.response.use(function (res) {
            // if(res.headers['custom-Header'] == 'qwerty123'){
            //     //do action...
            // }
            return res;
        }, function (err) {
            if (err.response.status === 401) {
                console.log(401, 'UnAuthorized!')

                //Redirect to login page , or
                //Request refresh token
            }
            return Promise.reject(err);
        });

    }

    private readonly baseApiUrl: string;
    private readonly axClient: AxiosInstance;

    //jwt
    setToken(token: nullable<string>): void {
        if (this.axClient != null)
            if (token == null || token.length == 0) {
                // this.axClient.defaults.withCredentials = false; //?
                this.axClient.defaults.headers.common['Authorization'] = '';
            } else {
                // this.axClient.defaults.withCredentials = true; //?
                this.axClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
    }



    async get<T>(url: string = "", queryString: any = null): Promise<T> {
        //       'X-XSRF-TOKEN': (_xsrfToken || "")
        if (isSSR || this.axClient == null) {
            return Promise.resolve(null);
        }
        let qry: string = "";
        if (queryString != null) {
            const str = queryString as string;
            if (str != null && str.length > 0) {
//              const prefixed = qs.parse('?a=b&c=d', { ignoreQueryPrefix: true });
                qry = "?" + queryString;
            } else {
                qry = "?" + qs.stringify(queryString); // , { encode: false , strictNullHandling: true ,  skipNulls: true }
            }
        }
        //let cancelToken = axios.CancelToken.source();
        return await this.axClient.get(`${url}${qry}`)//  {cancelToken: cancelToken.token}
            .then(res => {
                console.log('GET: ',url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('GET: ',url, err);
                return err.response.data; // throw err; ?
            });
    }

    async post<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            return Promise.resolve(null);
        }
        //transformRequest() -> stringifySafely() -> does JSON.stringify(data);
        return await this.axClient.post(`${url}`, data)
            .then(res => {
                //if url != login/refreshToken...
                console.log('POST: ',url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('POST: ',url, err);
                return err.response.data;
            });
    }

    async patch<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            return Promise.resolve(null);
        }
        return await this.axClient.patch(`${url}`, data)
            .then(res => {
                console.log('PATCH: ',url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('PATCH: ',url, err);
                return err.response.data;
            });
    }

    async put<T>(url: string, data: any): Promise<T> {
        if (isSSR || this.axClient == null) {
            return Promise.resolve(null);
        }
        return await this.axClient.put(`${url}`, data)
            .then(res => {
                console.log('PUT: ',url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('PUT: ',url, err);
                return err.response.data;
            });
    }

    async delete<T>(url: string): Promise<T> {
        if (isSSR || this.axClient == null) {
            return Promise.resolve(null);
        }
        return await this.axClient.delete(`${url}`)
            .then(res => {
                console.log('DELETE: ',url, res.data);
                return res;
            })
            .then(res => res.data as T)
            .catch(err => {
                console.error('DELETE: ',url, err);
                return err.response.data;
            });
    }

    //JSON.stringify(data, null, 4)

}


export function useAxios(baseUrl: string, token: nullable<string> = null): nullable<IHttpApi> {

    const [httpApi, setHttpApi] = useState<nullable<IHttpApi>>(null);

    if (httpApi != null/* && token != null*/) {
        httpApi.setToken(token);
    }

    useEffect(() => {
        const api = new HttpApi(baseUrl);
        api.setToken(token);
        setHttpApi(api);

        return () => {
            setHttpApi(null);
        };
    }, []);

    return httpApi;
}

/*
       <form onSubmit={event => {
        setUrl(`http://......./search?query=${query}`);

        event.preventDefault();
      }}>*/
