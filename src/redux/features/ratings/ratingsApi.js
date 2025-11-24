import baseApi from "../../api/baseApi";

export const ratingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all ratings
        getAllRatings: builder.query({
            query: () => ({
                url: "/ratings",
                method: "GET",
            }),
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
