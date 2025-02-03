import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
    getComments: builder.query({
      query: () => '/comments'
    }),
    createPosts: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      })
    })
  }),
});

export const { useGetPostsQuery, useGetCommentsQuery, useCreatePostsMutation } = postsApi;
