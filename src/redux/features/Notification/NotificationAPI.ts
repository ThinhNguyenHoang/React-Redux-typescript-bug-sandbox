import {apiSlice} from "../CentralAPI";
import {
    DeleteNotificationByUser,
    NotificationClassPaged,
    NotificationClassSearchCriteria,
    NotificationDto,
    NotificationItem,
    SendNotificationRequest
} from "./NotificationType";
import {transformSearchQuery} from "../APIUtils/TransformParameter";
import {ID} from "../../interfaces/types";


const notificationApiWithInvalidateTags = apiSlice.enhanceEndpoints({addTagTypes: ['Notification']});
const notificationAPI = notificationApiWithInvalidateTags.injectEndpoints({
    endpoints: (build) => ({
        getAllNotification: build.query<NotificationDto[], void>({
            query: () => 'notification',
            providesTags: ['Notification']
        }),
        getNotificationWithPaging: build.query<NotificationClassPaged, NotificationClassSearchCriteria>({
            query: (criteria) => `classes/${criteria.classId}/announcement/received?${transformSearchQuery(criteria)}`,
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.listData.map(({id}) => ({type: 'Notification', id} as const)),
                        {type: 'Notification', id: 'LIST'},
                    ]
                    :
                    [{type: 'Notification', id: 'LIST'}]
        }),
        getNotification: build.query<NotificationItem, number>({
            query: (notificationId) => `notification/${notificationId}`
        }),
        sendNotification: build.mutation<Partial<NotificationItem>, { notificationBody: Partial<SendNotificationRequest>, classId: ID }>({
            query: ({notificationBody, classId}) => ({
                url: `classes/${classId}/announcement`,
                method: 'post',
                body: notificationBody
            }),
            invalidatesTags: [{type: 'Notification', id: 'LIST'}],
        }),
        deleteNotificationByUser: build.mutation<number, DeleteNotificationByUser>({
            query: body => ({
                url: `notification?userId=${body.userId}&notificationId=${body.notificationId}`,
                method: 'delete'
            }),
            invalidatesTags: (result, error, args) => [{type: 'Notification', id: args.notificationId}]
        }),
        getTestResult: build.query<{}, {}>({
            query: () => "http://localhost:3001/notification",
            providesTags: ['Notification']
        })
    }),
    overrideExisting: false
})


export const {
    useGetAllNotificationQuery,
    useGetNotificationWithPagingQuery,
    useGetTestResultQuery,
    useSendNotificationMutation,
    useGetNotificationQuery,
    useDeleteNotificationByUserMutation
} = notificationAPI;


// * Provide tags for cache invalidation when code splitting
// * https://github.com/reduxjs/redux-toolkit/issues/1510

