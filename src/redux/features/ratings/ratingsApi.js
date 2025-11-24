import baseApi from "../../api/baseApi";

export const ratingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all ratings with pagination
        getAllRatings: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString();
                return {
                    url: `/ratings?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["Ratings"],
        }),

        // DELETE a rating by ID
        deleteRating: builder.mutation({
            query: (id) => ({
                url: `/ratings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Ratings"],
        }),
    }),
});

export const { useGetAllRatingsQuery, useDeleteRatingMutation } = ratingsApi;
