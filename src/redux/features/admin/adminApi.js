// src/redux/features/admin/adminApi.js
import { baseApi } from "../../api/baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all admins
        getAllAdmins: builder.query({
            query: (params) => {
                const queryString = new URLSearchParams({ role: "admin", ...params }).toString();
                return `/users?${queryString}`;
            },
            providesTags: ["Admin"],
        }),

        // GET admin by ID
        getAdminById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result, error, id) => [{ type: "Admin", id }],
        }),


        // CREATE admin
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/users/create-user",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Admin"],
        }),

        // UPDATE admin
        updateAdmin: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Admin", id }, "Admin"],
        }),

        // DELETE admin
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admin"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllAdminsQuery,
    useGetAdminByIdQuery,
    useAddAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
} = adminApi;
