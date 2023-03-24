import { FormControl, Stack, Button, CircularProgress, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';
import { QuestionnaireResponse } from "../../models/QuestionnaireResponse";
import { ValidatedSelect } from "../input/validatedSelect";
import { Questionnaire } from "../../models/Questionnaire";

export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean
}

interface QuestionnaireFormProps extends FormProps<QuestionnaireResponse> {
    questionnaire?: Questionnaire
    loading?: boolean
}

export function QuestionnaireForm(props: QuestionnaireFormProps) {

    const validationSchema = yup.object().shape({
        answers: yup.array().of(yup.string().min(1).required(t("Answer") + " " + t("is required"))),
    })

    // TODO: Only shows the first answer option currently!
    if (props.isLoading) return (<></>)
    else {
        console.log("props", props);
        return (
            <FormControl fullWidth>
                <Formik
                    initialValues={{
                        answers: [""],
                        checked: false
                    }}
                    onSubmit={(values) => props.onSubmit({
                        answers: values.answers,
                    })}
                    enableReinitialize
                    validationSchema={(validationSchema)}
                >
                    {({ errors, touched, values, handleChange, setFieldValue }) => (
                        <Form>
                            <Stack spacing={2}>
                                <InputLabel id="answer-select-label">Svar</InputLabel>
                                <ValidatedSelect
                                    name={""}
                                    error={errors.answers && touched.answers}
                                    labelId="answer-select-label"
                                    id="answer-select"
                                    value={values.answers[0]}
                                    label=""
                                    onChange={(event) => {
                                        setFieldValue("answers", [event.target.value]);
                                    }}
                                >
                                    {props?.questionnaire?.items[0]?.answerOptions.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
                                </ValidatedSelect>
    
                                <Stack spacing={2} direction={"row"}>
                                    <Button
                                        type={"submit"}
                                        variant="contained"
                                        disabled={props.loading}
                                        fullWidth={true}
                                    >
                                        {props.loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Submit")}</>}
                                    </Button>
    
                                    <Button fullWidth={true} onClick={props.onCancel} variant="outlined">{t("Cancel")+""}</Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
    
                </Formik>
            </FormControl >
        )
    }
    
  
}