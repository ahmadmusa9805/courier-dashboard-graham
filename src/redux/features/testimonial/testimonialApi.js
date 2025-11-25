import baseApi from "../../api/baseApi";

export const testimonialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ⭐ Create Testimonial
        createTestimonial: builder.mutation({
            query: (data) => ({
                url: "/testimonials/create-testimonial",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Testimonials"],
        }),

        // ⭐ Get All Testimonials
        getAllTestimonials: builder.query({
            query: (query) => {
                const params = new URLSearchParams(query).toString();
                return {
                    url: `/testimonials?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["Testimonials"],
        }),

        // ⭐ Get Single Testimonial by ID
        getTestimonialById: builder.query({
            query: (id) => ({
                url: `/testimonials/${id}`,
                method: "GET",
            }),
            providesTags: ["Testimonials"],
        }),

        // ⭐ Update Testimonial
        updateTestimonial: builder.mutation({
            query: ({ id, data }) => ({
                url: `/testimonials/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Testimonials"],
        }),

        // ⭐ Delete Testimonial
        deleteTestimonial: builder.mutation({
            query: (id) => ({
                url: `/testimonials/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Testimonials"],
        }),

    }),
});

export const {
    useCreateTestimonialMutation,
    useGetAllTestimonialsQuery,
    useGetTestimonialByIdQuery,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
} = testimonialApi;
