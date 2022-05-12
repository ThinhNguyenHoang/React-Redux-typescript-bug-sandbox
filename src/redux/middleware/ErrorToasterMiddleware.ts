import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI,
} from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		console.log(action);
		if (isRejectedWithValue(action)) {
			console.warn("We got a rejected action!");
			// antdNotifier.warn(action?.error?.data?.message ?? `Some thing went wrong with action: ${JSON.stringify(action?.meta?.arg.endpointName)}`,'API Error')
		}

		return next(action);
	};
