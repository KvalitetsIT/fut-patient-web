import { Questionnaire } from '../../models/Questionnaire';
import HandleQuery from '../../redux/EndpointQueryHandler';
import { futApiSlice } from '../../redux/fut-api-slice';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';


// Define a service using a base URL and expected endpoints
export const questionnaireSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getQuestionnaires: builder.query<Questionnaire[], number>({
      query: (patientId) => ({
        url: `patients/${patientId}/questionnaires`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res,
          toastWithResult: false,
          toastErrorText: "Questionnaires could not be fetched"
        }),
      }),
      providesTags: ["questionnaires"]
    }),

  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuestionnairesQuery } = questionnaireSlice;
