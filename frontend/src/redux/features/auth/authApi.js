import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "./../../../utils/getBaseUrl";

// query for get methods
// mutation for put , patch , delete,post

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: ()=>({
        url: "/logout",
        method: "POST"
      })
    }),
    editProfile: builder.mutation({
      query: ({id, profileData}) => ({
        url: `/edit-profile/${id}`,
        method: "PATCH",
        body: profileData
      })
    })
  }),
});


export const {useLoginUserMutation,useRegisterUserMutation, useLogoutUserMutation , useEditProfileMutation} = authApi;
export default authApi;
