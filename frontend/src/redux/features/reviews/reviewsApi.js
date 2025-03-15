import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";


const reviewsApi = createApi({

    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
        credentials: "include",
    }),

    tagTypes: ["Reviews"],

    endpoints: (builder) => ( {

        // post a review 
        postAReview: builder.mutation({
            query: (reviewData)=> ({
                url: "/post-review",
                method: "POST",
                body: reviewData
            }),
            invalidatesTags: (result , error , {postId})=> [ {type: "Reviews", id: postId}]
        }),

        // get reviews count
        getReviewsCount: builder.query({
            query: ()=> ({
                url: "/total-reviews",
            })
        }),

        // get reviews data for user 
        getReviewByUserId: builder.query({

            query: (userId)=> ({
                url: `${userId}`
            }),

            providesTags: (result)=> result ? [{type: "Reviews", id: result[0]?.email}] : [] 
        })
    })

})

export const { usePostAReviewMutation , useGetReviewsCountQuery , useGetReviewByUserIdQuery} = reviewsApi

export default reviewsApi