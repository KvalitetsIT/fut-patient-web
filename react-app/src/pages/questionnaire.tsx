import { FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PatientForm } from "../components/forms/PatientForm";
import { QuestionnaireForm } from "../components/forms/QuestionnaireForm";
import { theme } from "../config/theme";
import { Patient } from "../feature/api/patients";
import { useGetQuestionnairesQuery } from "../feature/api/questionnaires";
import { Questionnaire, Question  } from "../models/Questionnaire";
import { QuestionnaireResponse } from "../models/QuestionnaireResponse";

const patientId = 258981; // No login yet, same patient always

interface QuestionnaireProps {
    questionnaire: Questionnaire
}


export const QuestionnaireDetails = () => {
    const { id: serviceRequestId } = useParams();
    const { data: questionnaires, isLoading } = useGetQuestionnairesQuery(patientId);

    if (isLoading) {
        return <p>Loading...</p>
    } else {
        const questionnaire : Questionnaire = questionnaires?.find(
            q => q.serviceRequest.split("/").pop() === serviceRequestId)!;
        console.log(questionnaire);
        return (
        <>
            <Typography variant="h4">{questionnaire.title}</Typography>
            <QuestionnaireForm
                questionnaire={questionnaire}
                loading={false}
                onSubmit={async (submission: QuestionnaireResponse) => {
                    console.log("Her er svaret", submission);
                }}
                onCancel={() => {

                }} 
            ></QuestionnaireForm>   
        </>
        )
    }

}