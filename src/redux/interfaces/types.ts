// * Brief data entry is the list of brief info
// * (May contain some field of the detaield version / but must have an ID --> Get more detailed version);
// * Detailed entry is the currently focused item

export interface SliceStateWithPaginationAndDetail<BriefDataEntry,DetailedDataEntry> {
    detailed: DetailedDataEntry | undefined,
    detailedStatus: AsyncStatus,
    data: BriefDataEntry[],
    status: AsyncStatus,
    page: number,
    limit: number,
}

// * Brief data entry is the list of brief info
// * (May contain some field of the detaield version / but must have an ID --> Get more detailed version);
export interface SliceStateWithSimpleList<DataEntry>{
    data: DataEntry[],
    status: AsyncStatus,
    page: number,
    limit: number,
}

export interface BaseResponse {
    code: string,
    message: string
}

export interface PaginatedRequest {
    id: ID,
    page: number,
    size: number
}

export interface PaginatedResponse<T> {
    page: number,
    perPage: number,
    total: number,
    totalPages: number,
    listData: T[];
}

export interface AsyncStatus {
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean,
    errors: {}
}

export interface IdFetchParam {
    id: string
}

export interface HashWithStringKey<T>{
    [key: string] : T
}
export type ID = number;
export const DEFAULT_FRONTEND_ID = -1;





export type UseQueryResult<T> = {
    // Base query state
    originalArgs?: unknown // Arguments passed to the query
    data?: T // The latest returned result regardless of hook arg, if present
    currentData?: T // The latest returned result for the current hook arg, if present
    error?: unknown // Error result if present
    requestId?: string // A string generated by RTK Query
    endpointName?: string // The name of the given endpoint for the query
    startedTimeStamp?: number // Timestamp for when the query was initiated
    fulfilledTimeStamp?: number // Timestamp for when the query was completed

    // Derived request status booleans
    isUninitialized: boolean // Query has not started yet.
    isLoading: boolean // Query is currently loading for the first time. No data yet.
    isFetching: boolean // Query is currently fetching, but might have data from an earlier request.
    isSuccess: boolean // Query has data from a successful load.
    isError: boolean // Query is currently in an "error" state.

    refetch?: () => void // A function to force refetch the query
}