import baseApi from "../../api/baseApi";

export const itemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ⭐ Create Item
        createItem: builder.mutation({
            query: (data) => ({
                url: "/items/create-item",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Items"],
        }),

        // ⭐ Get All Items
        getAllItems: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString();
                return {
                    url: `/items?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["Items"],
        }),

        // ⭐ Get Single Item by ID
        getItemById: builder.query({
            query: (id) => ({
                url: `/items/${id}`,
                method: "GET",
            }),
            providesTags: ["Items"],
        }),

        // ⭐ Update Item
        updateItem: builder.mutation({
            query: ({ id, data }) => ({
                url: `/items/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Items"],
        }),

        // ⭐ Delete Item
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/items/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Items"],
        }),

    }),
});

export const {
    useCreateItemMutation,
    useGetAllItemsQuery,
    useGetItemByIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation
} = itemApi;
