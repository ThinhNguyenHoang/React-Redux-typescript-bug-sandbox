import { RootState } from "../../store/store";
import { EnhancedSliceWithSearch, generateInitialSearchSlice, createSliceEnhancedWithSearch } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

const NOTIFICATION_SLICE_KEY = "notification";

type NotificationId = {
	classId: number;
	receiverId: number;
};

const initialState: EnhancedSliceWithSearch<NotificationId> = {
	classId: -1,
	receiverId: -1,
	...generateInitialSearchSlice(),
};

export const notificationSlice = createSliceEnhancedWithSearch({
	name: NOTIFICATION_SLICE_KEY,
	initialState,
	reducers: {},
});

export const notificationSelector = {
	selectSearchCriteria: (state: RootState) => state.notification.searchCriteria,
};

export const { changeCriteria } = notificationSlice.actions;
