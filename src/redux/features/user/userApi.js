// src/redux/features/user/userApi.js
import baseApi from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all users with pagination and search
    getAllUsers: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return `/users${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ["User"],
    }),



    // CREATE user
    addUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // UPDATE user
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // DELETE user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
