import { Typography } from "@mui/material";
import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { QuestionnaireForm } from "../components/forms/QuestionnaireForm";
import { QuesionnaireResponse } from "../components/QuesionnaireResponse";
import { useGetQuestionnairesQuery, usePostQuestionnaireResponseMutation, useGetQuestionnaireResponseCountQuery } from "../feature/api/questionnaires";
import { Questionnaire } from "../models/Questionnaire";
import { QuestionnaireReponseItem, QuestionnaireResponse } from "../models/QuestionnaireResponse";

const patientId = 258981; // No login yet, same patient always

export const QuestionnaireDetails = () => {
    const navigate = useNavigate();
    const { id: serviceRequestId } = useParams();
    const { data: questionnaires, isLoading } = useGetQuestionnairesQuery(patientId);
    
    const [
        createResponse, // This is the mutation trigger
        { isLoading: isUpdating }, // This is the destructured mutation result
    ] = usePostQuestionnaireResponseMutation();

    if (isLoading) {
        return <p>Loading...</p>
    } else {
        const questionnaire : Questionnaire = questionnaires?.find(
            q => q.serviceRequest.split("/").pop() === serviceRequestId)!;

        return (
        <>
            <Typography variant="h4">{questionnaire.title}</Typography>

            <QuestionnaireForm
                questionnaire={questionnaire}
                loading={false}
                onSubmit={async (submission: QuestionnaireReponseItem[], formik: FormikHelpers<{
                    answers: QuestionnaireReponseItem[];
                    checked: boolean;
                }>) => {    
                    const response = new QuestionnaireResponse(questionnaire.resource);
                    response.items = submission;
                    response.episodeOfCare = questionnaire.episodeOfCare;
                    response.patientId = patientId + "";
                    response.serviceRequest = questionnaire.serviceRequest;

                    await createResponse(response);
                    navigate("/");

                }}
                onCancel={() => {
                    navigate("/");
                }} 
            ></QuestionnaireForm>
            
                <QuesionnaireResponse
                    patientId={patientId + ""}
                    episodeOfCare={questionnaire.episodeOfCare}
                    serviceRequest={questionnaire.serviceRequest + ""} />
        </>
        )
    }

}