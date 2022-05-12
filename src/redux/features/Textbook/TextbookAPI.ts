import { apiSlice } from "../CentralAPI";
import { transformSearchQuery } from "../APIUtils/TransformParameter";
import { PaginatedResponse } from "../../interfaces/types";
import { TextBook } from "./TextbookType";
import { SearchCriteria } from "../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

export type TextbookListDto = PaginatedResponse<TextBook>;

const TEXT_BOOK_ENDPOINT = "resources/textbook";

const textbookApiWithInvalidateTags = apiSlice.enhanceEndpoints({
	addTagTypes: ["Textbook"],
});
const textbookAPI = textbookApiWithInvalidateTags.injectEndpoints({
	endpoints: (build) => ({
		getTextbooks: build.query<TextbookListDto, SearchCriteria>({
			query: (criteria) =>
				`${TEXT_BOOK_ENDPOINT}?${transformSearchQuery(criteria)}`,
			providesTags: (result) =>
				result
					? [
							...result.listData.map(
								({ id }) => ({ type: "Textbook", id } as const)
							),
							{ type: "Textbook", id: "LIST" },
					  ]
					: [{ type: "Textbook", id: "LIST" }],
		}),
		getTextbookDetail: build.query<TextBook, number>({
			query: (id) => `resources/textbook/${id}`,
			providesTags: (res, err, args) => [{ type: "Textbook", id: args }],
		}),
		addTextbook: build.mutation<Partial<TextBook>, Partial<TextBook>>({
			query: (body) => ({
				url: `${TEXT_BOOK_ENDPOINT}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: [{ type: "Textbook", id: "LIST" }],
		}),
		updateTextbook: build.mutation<
			Partial<TextBook>,
			Partial<TextBook> & { id: number }
		>({
			query: ({ id, ...other }) => ({
				url: `${TEXT_BOOK_ENDPOINT}/${id}`,
				method: "PUT",
				body: other,
			}),
			invalidatesTags: (res, err, args) => [{ type: "Textbook", id: "LIST" }],
		}),
		deleteTextbook: build.mutation<Partial<TextBook>, number>({
			query: (id) => ({
				url: `${TEXT_BOOK_ENDPOINT}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (res, err, args) => [{ type: "Textbook", id: "LIST" }],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTextbooksQuery,
	useUpdateTextbookMutation,
	useAddTextbookMutation,
	useDeleteTextbookMutation,
} = textbookAPI;
