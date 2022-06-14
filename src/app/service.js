import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const exampleAPI = createApi({
	reducerPath: 'exampleAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://62a357635bd3609cee686264.mockapi.io/insurance/API/' }),
	endpoints: (builder) => ({
		getResourceByName: builder.query({
			query: (resourceName) => `${resourceName}`,
			providesTags: (result,error, resourceName) =>
				// is result available?
				result
					? // successful query
					[
						...result.map(({ id }) => ({ type: resourceName, id })),
						{ type: resourceName, id: 'LIST' },
					]
					: // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
					[{ type: resourceName, id: 'LIST' }],
		}),
		getRecordById: builder.query({
			query: ({resourceName, recordId}) => `${resourceName}/${recordId}`,
			providesTags: (result, error, {recordId, resourceName}) => [{ type: resourceName, id: recordId }],
		}),
		addRecord: builder.mutation({
			query: ({resourceName, body}) => ({
				url: `${resourceName}`,
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { resourceName}) => {
				return [{ type: resourceName, id: 'LIST' }]
			},
		}),
		updateRecord: builder.mutation({
			query: ({resourceName, recordId, body}) => ({
				url: `${resourceName}/${recordId}`,
				method: 'PUT',
				body: body
			}),
			transformResponse: (response, meta, arg) => response.data,
			async onQueryStarted(
				arg,
				{ dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
			) {},
			async onCacheEntryAdded(
				arg,
				{
					dispatch,
					getState,
					extra,
					requestId,
					cacheEntryRemoved,
					cacheDataLoaded,
					getCacheEntry,
				}
			) {},
			invalidatesTags: (result, error, { id, resourceName}) => {
				return [{ type: resourceName, id }]
			},

		}),
		deleteRecord: builder.mutation({
			query: ({resourceName, recordId}) => ({
				url: `${resourceName}/${recordId}`,
				method: 'DELETE'
			}),
			async onQueryStarted(
				arg,
				{ dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
			) {},
			async onCacheEntryAdded(
				arg,
				{
					dispatch,
					getState,
					extra,
					requestId,
					cacheEntryRemoved,
					cacheDataLoaded,
					getCacheEntry,
				}
			) {},
			invalidatesTags: (result, error, { id, resourceName}) => {
				return [{ type: resourceName, id }]
			},

		})
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetResourceByNameQuery, useGetRecordByIdQuery, useUpdateRecordMutation, useDeleteRecordMutation, useAddRecordMutation } = exampleAPI