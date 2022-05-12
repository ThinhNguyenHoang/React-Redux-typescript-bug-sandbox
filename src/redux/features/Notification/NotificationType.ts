import {PaginatedResponse} from "../../interfaces/types";
import { SearchCriteria } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

export interface NotificationDto {
    id: number,
    image?: string,
    senderId: number,
    senderName: string,
    subject: string,
    content: string,
    sentAt: Date,
    tags: string[]
}

export interface SendNotificationRequest extends Omit<NotificationDto, "tags"> {
    tags: string;
    attachment?: string;
    receiversId: number[];
    sendMailAsCopy: boolean;
}

export interface NotificationItem extends NotificationDto {
    attachment?: string;
}

export interface DeleteNotificationByUser {
    userId: number;
    notificationId: number;
}

export const notificationInitial : SendNotificationRequest = {
    content: "",
    id: 0,
    senderId: 0,
    senderName: "",
    sentAt: new Date(),
    subject: "",
    tags: "",
    receiversId: [],
    sendMailAsCopy: false
}


export interface NotificationClassSearchCriteria extends SearchCriteria {
    classId: number,
    receiverId: number | undefined
}

export type NotificationClassPaged = PaginatedResponse<NotificationItem>;