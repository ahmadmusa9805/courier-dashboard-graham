import baseApi from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ⭐ Create Item
        createPayment: builder.mutation({
            query: (data) => ({
                url: "/payments/create-payment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["payments"],
        }),

        // ⭐ Get All Items
        getAllCourierJobsPaymentsWeekly: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString();
                return {
                    // url: `/courier-payments/weekly`,
                    url: `/courier-payments/weekly?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["payments"],
        }),
        // ⭐ Get All Items
        getAllCourierJobsPayments: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString();
                return {
                    // url: `/courier-payments/all-jobs`,
                    url: `/courier-payments/all-jobs?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["payments"],
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
            invalidatesTags: ["payments"],
        }),

        // ⭐ Delete Item
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/items/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["payments"],
        }),

    }),
});

export const {
    useCreateItemMutation,
    useGetAllItemsQuery,
    useGetAllCourierJobsPaymentsWeeklyQuery,
    useGetAllCourierJobsPaymentsQuery,
    useGetItemByIdQuery,
    useUpdateItemMutation,
    useDeleteItemMutation
} = paymentApi;
