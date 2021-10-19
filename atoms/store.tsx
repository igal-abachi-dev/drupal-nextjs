import { atom } from "jotai";
import {atomWithImmer} from 'jotai/immer';


export interface GlobalAppDataType{
    light:boolean;
    lastUpdate:string;
}
export const GlobalAppAtom = atomWithImmer<GlobalAppDataType>({
    light: false,
    lastUpdate: null
});


