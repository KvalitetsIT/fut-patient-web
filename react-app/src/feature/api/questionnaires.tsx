import { Questionnaire } from '../../models/Questionnaire';
import { QuestionnaireResponse } from '../../models/QuestionnaireResponse';
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
    postQuestionnaireResponse: builder.mutation<QuestionnaireResponse, QuestionnaireResponse>({
      query: (qResponse: QuestionnaireResponse) => {
        console.log("qResponse", qResponse);
        return {
          url: `patients/${qResponse.patientId}/questionnaireResponse`,
          method: "POST",
          body: JSON.stringify(qResponse),
          responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "QuestionnaireResponse could not be created" }),
        }
      },
      invalidatesTags: ["questionnaireResponse"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuestionnairesQuery, usePostQuestionnaireResponseMutation } = questionnaireSlice;
