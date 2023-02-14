import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './store'

interface ContactsData {
  id: string | number
  name: string
  email: string
  phone: string
}

interface ContactUpdateData {
  id: string | number
  data: ContactsData
}

interface GetContactsListQueryResponse {
  results: ContactsData[]
  currentPage: number
  perPage: number
  totalPages: number
}

export const contactsApi: any = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.NEXT_PUBLIC_API_URL),
  }),
  tagTypes: ['Contacts'],
  endpoints: (builder) => ({
    getContactsList: builder.query<GetContactsListQueryResponse, void>({
      query: (arg: any) => {
        if (arg) {
          const { _sort, _orderBy, page, perPage, _contains } = arg

          let query = `contacts?_sort=${_orderBy}:${_sort}&page=${
            page + 1
          }&perPage=${perPage}`

          if (_contains) {
            return `${query}&email_contains=${_contains}`
          }
          return query
        }
        return 'contacts'
      },
    }),
    getContactDetails: builder.query<ContactsData, any>({
      query: ({ id }) => {
        return `contacts/${id}`
      },
    }),
    createContact: builder.mutation<ContactsData, ContactsData>({
      query: (contact) => {
        return {
          url: 'contacts',
          method: 'POST',
          body: contact,
        }
      },
    }),
    updateContact: builder.mutation<ContactUpdateData, ContactUpdateData>({
      query: (contact) => {
        const { id, data } = contact

        return {
          url: `contacts/${id}`,
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteContact: builder.mutation<ContactsData, ContactsData>({
      query: ({ id }) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
interface ApiSlice {
  useGetContactsListQuery: any
  useGetContactDetailsQuery: any
  useCreateContactMutation: any
  useUpdateContactMutation: any
  useDeleteContactMutation: any
  util: {
    getRunningQueriesThunk: ThunkAction<
      void,
      RootState,
      unknown,
      Action<string>
    >
  }
}

export const {
  useGetContactsListQuery,
  useGetContactDetailsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  util: { getRunningQueriesThunk },
}: ApiSlice = contactsApi
