import {BaseResponse} from "../../interfaces/types";
import {apiSlice} from "../CentralAPI";

const fileApiInvalidatesTags = apiSlice.enhanceEndpoints({});

export interface CreateShareFileTokenRequest {
  fullpaths: string[]
}

export interface CreateShareFileTokenResponse extends BaseResponse {
  token: string
}

export interface DecodeShareFileTokenRequest {
  token: string
}

export interface DecodeShareFileTokenResponse extends BaseResponse {
  fullpaths: string[]
}

const fileApi = fileApiInvalidatesTags.injectEndpoints({
  endpoints: (build) => ({
    createShareFileToken: build.mutation<CreateShareFileTokenResponse, CreateShareFileTokenRequest>({
      query: (body) => ({
        url: 'files/createShareFileToken',
        method: 'post',
        body
      }),
    }),
    decodeShareFileToken: build.mutation<DecodeShareFileTokenResponse, DecodeShareFileTokenRequest>({
      query: (body) => ({
        url: "files/decodeShareFileToken",
        method: 'post',
        body
      })
    })
  })
});

export const { useCreateShareFileTokenMutation, useDecodeShareFileTokenMutation } = fileApi;