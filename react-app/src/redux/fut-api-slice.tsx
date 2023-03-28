import { createApi } from '@reduxjs/toolkit/query/react'
import fetchDefaultBaseQuery from './BaseQuerySettings'

export const futApiSlice = createApi({
    reducerPath: 'fut_api',
    tagTypes: [
        'patients', 'patient', 'questionnaire', 'questionnaires',
        'questionnaireResponse', 'questionnaireResponses'

        
    ],
    refetchOnMountOrArgChange: true,
    baseQuery: fetchDefaultBaseQuery(),
    endpoints: () => ({}),
})


