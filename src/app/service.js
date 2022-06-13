import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const exampleAPI = createApi({
	reducerPath: 'exampleAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://62a357635bd3609cee686264.mockapi.io/insurance/API/' }),
	endpoints: (builder) => ({
		getResourceByName: builder.query({
			query: (resourceName) => `${resourceName}`
		}),
		getRecordById: builder.query({
			query: (resourceName,recordId) => `${resourceName}/${recordId}`
		})
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetResourceByNameQuery } = exampleAPI