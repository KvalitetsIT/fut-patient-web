import { Divider, Typography } from "@mui/material";
import { useGetQuestionnairesQuery, usePostQuestionnaireResponseMutation, useGetQuestionnaireResponseCountQuery } from "../feature/api/questionnaires";

interface QuesionnaireResponseProps {
    patientId: string,
    episodeOfCare: string,
    serviceRequest: string,
}

export function QuesionnaireResponse(props: QuesionnaireResponseProps) {
    const { data, isLoading } = useGetQuestionnaireResponseCountQuery({
        patientId: props.patientId,
        EpisodeOfCare: props.episodeOfCare,
        basedOnServiceRequest: props.serviceRequest
    })

    console.log(data);
    if (isLoading) {
        return <p>Loading count...</p>;
    } else return (
        <>
            <Divider />
            <p>Antal svar: {data?.count}</p>
        </>
    )
}