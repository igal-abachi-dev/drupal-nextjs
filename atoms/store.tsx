import React, {useState, useRef, useEffect, Fragment, Suspense} from 'react';


import {Provider, atom, useAtom} from "jotai";
import {useHydrateAtoms, useAtomValue, useUpdateAtom} from "jotai/utils";
import {atomWithImmer} from 'jotai/immer';
import {focusAtom} from 'jotai/optics';
import {IHttpApi} from "../hooks/useAxios";


export type nullable<T> = (T | null);

export interface GlobalAppDataType {
    light: boolean;
    lastUpdate: string;
}

export const GlobalAppAtom = atomWithImmer<GlobalAppDataType>({
    light: false,
    lastUpdate: null
});

