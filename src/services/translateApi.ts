import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { TRANSLATE_IP } from "../data/constantData";

export const translateApi = createApi({
    reducerPath: 'translateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: TRANSLATE_IP,
        prepareHeaders(headers, { getState }) {
            const access_token = (getState() as RootState).token.access_token;

            if (access_token) {
                headers.set('authorization', `Bearer ${access_token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        textTranslate: builder.mutation({
            query: (body: {content: string, target: string, source: string}) => {
                return { url: "/translation/text", method: "post", body}
            }
        })
    })
});

export const { useTextTranslateMutation } = translateApi