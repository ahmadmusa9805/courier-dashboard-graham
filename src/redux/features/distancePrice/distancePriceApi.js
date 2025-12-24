import baseApi from "../../api/baseApi";

export const distancePriceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Distance Price
        createDistancePrice: builder.mutation({
            query: (data) => ({
                url: "/distance-prices/create-distance-price",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["DistancePrice"],
        }),

        // Get Distance Price by ID
        getDistancePriceById: builder.query({
            query: (id) => ({
                url: `/distance-prices/${id}`,
                method: "GET",
            }),
            providesTags: ["DistancePrice"],
        }),

        // Get All Distance Prices (if needed)
        getAllDistancePrices: builder.query({
            query: () => ({
                url: "/distance-prices",
                method: "GET",
            }),
            providesTags: ["DistancePrice"],
        }),

        // Update Distance Price
        updateDistancePrice: builder.mutation({
            query: ({ id, data }) => ({
                url: `/distance-prices/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["DistancePrice"],
        }),

        // Delete Distance Price
        deleteDistancePrice: builder.mutation({
            query: (id) => ({
                url: `/distance-prices/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DistancePrice"],
        }),
    }),
});

export const {
    useCreateDistancePriceMutation,
    useGetDistancePriceByIdQuery,
    useGetAllDistancePricesQuery,
    useUpdateDistancePriceMutation,
    useDeleteDistancePriceMutation,
} = distancePriceApi;
