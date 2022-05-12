import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_CONSTANT } from "../../constants/ApiConfigs";
import LOCAL_STORAGE_KEYS from "../../constants/LocalStorageKey";
import { Mutex } from "async-mutex";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import API_ERRORS from "./ApiErrors";

const mutex = new Mutex();

const getToken = () => {
	return localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
};
const getRefreshToken = () => {
	return localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

const baseQuery = fetchBaseQuery({
	baseUrl: API_CONSTANT.BASE_URL,
	// * Return headres
	prepareHeaders(headers) {
		// By default, if we have a token in the store, let's use that for authenticated requests
		// * Use below code to attach the token to the request so the backend can validate the user
		const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		// set tenantId
		return headers;
	},
});

export type BackendErrorData = {
	code: string;
	message: string;
};

function isBackendErrorData(err: any): err is BackendErrorData {
	if (!err) return false;
	return (
		(err as BackendErrorData).code !== undefined &&
		(err as BackendErrorData).message !== undefined
	);
}
const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError | SerializedError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	// @ts-ignore
	if (result.error && "data" in result.error) {
		const { data: errData } = result.error;
		if (isBackendErrorData(errData)) {
			// * Stuff inside error data body - provided by backend
			const { code, message } = errData;
			switch (code) {
				case API_ERRORS.JWT_EXPIRED:
					if (!mutex.isLocked()) {
						const release = await mutex.acquire();

						try {
							const refreshResult = await baseQuery(
								{
									url: "auth/refresh/",
									method: "POST",
									body: { token: getToken(), refreshToken: getRefreshToken() },
								},
								api,
								extraOptions
							);
							if (refreshResult.data) {
								// @ts-ignore
								api.dispatch(authActions.tokenUpdated(refreshResult.data));
								result = await baseQuery(args, api, extraOptions);
							} else {
								// api.dispatch(authActions.cleanUpOnSignOut());
							}
						} finally {
							release();
						}
					} else {
						await mutex.waitForUnlock();
						result = await baseQuery(args, api, extraOptions);
					}
					break;
				case API_ERRORS.UNAUTHORIZED:
					break;
				default:
					break;
			}
		}
	}

	return result;
};

export interface ListResponse<T> {
	data: T[];
}

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});

// * Force refetch with dispatch (Not recommended)
// * https://stackoverflow.com/questions/69402541/how-update-state-in-rtk-query-by-useeffect
//
//
// * refetch
// * https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#manipulating-cache-behavior
//
// * Manual Cache update - Pessimistic vs Optimistic
// * https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
//
// * RTK Query is for calling api and data caching only --> Cannot dispatch action to change the data locally
// * https://stackoverflow.com/questions/68753347/process-fetched-data-rtk-query-redux-toolkit-react
