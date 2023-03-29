import { Questionnaire } from '../../models/Questionnaire';
import { QuestionnaireResponse } from '../../models/QuestionnaireResponse';
import { QuestionnaireResponseCount } from '../../models/QuestionnaireResponseCount';
import { futApiSlice } from '../../redux/fut-api-slice';
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
          url: `patients/${qResponse.patientId}/questionnaireResponses`,
          method: "POST",
          body: JSON.stringify(qResponse),
          responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "QuestionnaireResponse could not be created" }),
        }
      },
      invalidatesTags: ["questionnaireResponse"]
    }),

    getQuestionnaireResponseCount: builder.query<QuestionnaireResponseCount, {
      patientId: string,
      EpisodeOfCare: string,
      basedOnServiceRequest: string
    }>({
      query: (queryParams) => ({
        url: `patients/${queryParams.patientId}/questionnaireResponses`,
        method: "GET",
        params: {
          episodeOfCare: queryParams.EpisodeOfCare,
          basedOnServiceRequest: queryParams.basedOnServiceRequest
        },
        responseHandler: (res) => handleResponse({
          response: res,
          toastWithResult: false,
          toastErrorText: "QuestionnaireResponse count could not be fetched"
        }),
      }),
      providesTags: ["questionnaireResponse"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetQuestionnairesQuery,
  usePostQuestionnaireResponseMutation,
  useGetQuestionnaireResponseCountQuery
} = questionnaireSlice;
