import {createWrapper, HYDRATE, MakeStore} from "next-redux-wrapper";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector as useReduxSelector,} from "react-redux";
import {authReducer} from "./auth";
import {goodsReducer} from "./goods";
import {cartReducer} from "./cart";
import {userLocalMap} from "./userLocalMap";
import {showLoginModal} from "./showLoginModal";
import {notificationReducer} from "./notificaion";

const rootReducer = combineReducers({
    authReducer, goodsReducer, cartReducer, userLocalMap, showLoginModal, notificationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload,
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

//* 타입 지원되는 커스텀 useSelector
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);
