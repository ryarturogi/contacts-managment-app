import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface ContactsResult {
  id: string
  name: string
  email: string
  phone: string
}

interface GetContactsListQueryResponse {
  results: ContactsResult[]
  currentPage: number
  perPage: number
  totalPages: number
}

export const contactsApi: any = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.NEXT_PUBLIC_API_URL),
  }),

  endpoints: (builder) => ({
    getContactsList: builder.query<GetContactsListQueryResponse, void>({
      query: (arg: any) => {
        if (arg) {
          const { _sort, _orderBy, page, perPage } = arg
          const sort = _sort || 'asc'
          const order = _orderBy || 'firstName'

          const params = new URLSearchParams({
            page: page + 1,
            perPage,
            _sort: `${order}:${sort}`,
          })
          return `contacts?${params.toString()}`
        }
        return 'contacts'
      },
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetContactsListQuery,
  util: { getRunningQueriesThunk },
}: any = contactsApi
