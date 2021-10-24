import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import globalStateReducer from '../state/globalStateSlice';

const store = configureStore({
    reducer: {
        globalState: globalStateReducer,

        // one: oneSlice.reducer,
        // two: twoSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType,
        RootState,
        unknown,
        Action<string>>;

export default store;
