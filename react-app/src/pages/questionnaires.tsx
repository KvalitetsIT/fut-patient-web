import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useGetQuestionnairesQuery } from "../feature/api/questionnaires";
import { theme } from "../config/theme";
import { Questionnaire } from "../models/Questionnaire";

const patientId = 258981; // No login yet, same patient always

export const Questionnaires = () => {
    const { data: questionnaires, isLoading } = useGetQuestionnairesQuery(patientId);

    function createListItem(questionnaire: Questionnaire) {
        const parts = questionnaire.serviceRequest.split("/");
        const serviceRequestId = parts[parts.length - 1];
        
        return <ListItem component={Link} to={`/serviceRequest/${serviceRequestId}`}
                key={questionnaire.serviceRequest}> 
            <ListItemText sx={{
                borderWidth: 1,
                borderColor: theme.palette.primary.main,
                borderStyle: "solid",
                padding: 2,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText
            }}
                primary={<Typography variant="h5">{questionnaire.title}</Typography>}>
                secondary={<p>{questionnaire.description}</p>}
            </ListItemText>
        </ListItem>
    }

    if (isLoading) {
        return <p>Loading...</p>
    } else return (
    <>
        <Typography variant="h4">Questionnaires</Typography>
        <List>
        {
            questionnaires && questionnaires.map(createListItem)
        }
        </List>
    </>
    )
}