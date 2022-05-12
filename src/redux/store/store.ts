import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import rootReducer from "./rootReducer";
import {apiSlice} from "../features/CentralAPI";
import {rtkQueryErrorLogger} from "../middleware/ErrorToasterMiddleware";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware).concat(rtkQueryErrorLogger)
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;