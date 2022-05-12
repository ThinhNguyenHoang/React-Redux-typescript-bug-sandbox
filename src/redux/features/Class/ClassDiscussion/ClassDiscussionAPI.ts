import { ID, PaginatedResponse } from "../../../interfaces/types";
import { apiSlice } from "../../CentralAPI";
import { transformSearchQuery } from "../../APIUtils/TransformParameter";
import {
	SearchCriteria,
	SearchCriteriaType,
} from "../../../utils/createSliceWithSearch/createSliceEnhancedWithSearch";

export type Post = {
	id: ID;
	title: string;
	content: string;
	classId?: ID;
	upVoteCount: number;
	downVoteCount: number;
	repliesCount: number;
	personalPreference?: PostInteraction | undefined;
	comments: PaginatedResponse<Comment>;
};

export type PostInteraction = "UP_VOTE" | "DOWN_VOTE" | "NONE";

export type Comment = {
	id: ID;
	content: string;
	childrenComments: Comment[];
	numberOfChildrenComments: number;
	parentCommentId: ID;
};

const classPostApiWithInvalidateTags = apiSlice.enhanceEndpoints({
	addTagTypes: ["ClassPost", "ClassComment"],
});
const classPostAPI = classPostApiWithInvalidateTags.injectEndpoints({
	endpoints: (build) => ({
		// * Post
		getAllPostForClass: build.query<
			PaginatedResponse<Post>,
			{ classId: ID; searchCriteria: SearchCriteria }
		>({
			query: ({ classId, searchCriteria }) =>
				`classes/${classId}/posts?${transformSearchQuery(searchCriteria)}`,
			providesTags: (res, err, args) => [{ type: "ClassPost", id: "LIST" }],
		}),
		getPostDetail: build.query<
			Post,
			{
				classId: ID;
				postId: ID;
				commentPagination: { page: number; size: number };
			}
		>({
			query: ({ classId, postId, commentPagination: { page, size } }) =>
				`classes/${classId}/posts/${postId}?page=${page}&size=${size}`,
			providesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
			],
		}),
		createPost: build.mutation<
			Partial<Post>,
			{ postInfo: Partial<Post>; classId: ID }
		>({
			query: ({ classId, postInfo }) => {
				return {
					url: `classes/${classId}/posts/`,
					method: "POST",
					body: postInfo,
				};
			},
			invalidatesTags: (res, err, args) => [{ type: "ClassPost", id: "LIST" }],
		}),
		updatePost: build.mutation<
			Partial<Post>,
			{ postInfo: Partial<Post>; classId: ID; postId: ID }
		>({
			query: ({ classId, postInfo, postId }) => {
				return {
					url: `classes/${classId}/posts/${postId}`,
					method: "PUT",
					body: postInfo,
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: "LIST" },
				{ type: "ClassPost", id: args.postId },
			],
		}),
		deletePost: build.mutation<void, { classId: ID; postId: ID }>({
			query: ({ classId, postId }) => {
				return {
					url: `classes/${classId}/posts/${postId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (res, err, args) => [{ type: "ClassPost", id: "LIST" }],
		}),

		// * Post Interaction
		interactWithPost: build.mutation<
			Partial<Post>,
			{ classId: ID; postId: ID; postInteraction: PostInteraction }
		>({
			query: ({ classId, postId, postInteraction }) => {
				return {
					url: `classes/${classId}/posts/${postId}/interaction`,
					method: "POST",
					body: {
						type: postInteraction,
					},
				};
			},

			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
			],
		}),
		commentToPost: build.mutation<
			Partial<Post>,
			{ classId: ID; postId: ID; content: string }
		>({
			query: ({ classId, postId, content }) => {
				return {
					url: `classes/${classId}/posts/${postId}/comments`,
					method: "POST",
					body: {
						content,
					},
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
				{ type: "ClassComment", id: "LIST" },
			],
		}),
		replyToComment: build.mutation<
			Partial<Post>,
			{ classId: ID; postId: ID; parentCommentId: ID; content: string }
		>({
			query: ({ classId, postId, parentCommentId, content }) => {
				return {
					url: `classes/${classId}/posts/${postId}/comments`,
					method: "POST",
					body: {
						parentCommentId,
						content,
					},
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
				{ type: "ClassComment", id: "LIST" },
			],
		}),
		getChildCommentsOfComment: build.query<
			PaginatedResponse<Comment>,
			{
				classId: ID;
				postId: ID;
				commentId: ID;
				childCommentPagination: {
					page: number;
					size: number;
				};
			}
		>({
			query: ({
				classId,
				postId,
				commentId,
				childCommentPagination: { page, size },
			}) =>
				`classes/${classId}/posts/${postId}/comments/${commentId}?page=${page}&size=${size}`,
			providesTags: (res, err, args) => [{ type: "ClassComment", id: "LIST" }],
		}),
		updateComment: build.mutation<
			Partial<Post>,
			{ classId: ID; postId: ID; commentId: ID; commentContent: string }
		>({
			query: ({ classId, postId, commentId, commentContent }) => {
				return {
					url: `classes/${classId}/posts/${postId}/comments/${commentId}`,
					method: "PUT",
					body: {
						content: commentContent,
					},
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
			],
		}),
		deleteComment: build.mutation<
			void,
			{ classId: ID; postId: ID; commentId: ID }
		>({
			query: ({ classId, postId, commentId }) => {
				return {
					url: `classes/${classId}/posts/${postId}/comments/${commentId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: (res, err, args) => [
				{ type: "ClassPost", id: args.postId },
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	// * Post API
	useGetAllPostForClassQuery,
	useGetPostDetailQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,

	// * Post Interaction API
	useInteractWithPostMutation,
	// ? Comment
	useCommentToPostMutation,
	useReplyToCommentMutation,
	useGetChildCommentsOfCommentQuery,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
} = classPostAPI;

// * Provide tags for cache invalidation when code splitting
// * https://github.com/reduxjs/redux-toolkit/issues/1510
