import { FormControl, Stack, Button, CircularProgress, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Formik, Form, FormikErrors, FormikTouched } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';
import { QuestionnaireResponse } from "../../models/QuestionnaireResponse";
import { ValidatedSelect } from "../input/validatedSelect";
import { Question, Questionnaire } from "../../models/Questionnaire";

export interface FormProps<T> {
    onSubmit: (submission: T) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean
}

interface QuestionnaireFormProps extends FormProps<QuestionnaireResponse> {
    questionnaire?: Questionnaire
    loading?: boolean
}

function createQuestion(item: Question, props: QuestionnaireFormProps,
        errors: FormikErrors<{ answers: string[]; checked: boolean; }>,
        touched : FormikTouched<{ answers: string[]; checked: boolean; }>,
        values: { answers: string[]; checked: boolean; },
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) {

    return (<>
        <Typography variant="h5">{ item.text }</Typography>

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
            {item.answerOptions.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
        </ValidatedSelect>
    </>);
}

export function QuestionnaireForm(props: QuestionnaireFormProps) {

    const validationSchema = yup.object().shape({
        answers: yup.array().of(yup.string().min(1).required(t("Answer") + " " + t("is required"))),
    })

    if (props.isLoading) return (<></>)
    else {
        console.log("props", props);
        return (
            <FormControl fullWidth sx={{ mt: 4 }}>
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
                                {
                                    props.questionnaire?.items && props.questionnaire?.items.map((item) => {
                                        return createQuestion(item, props, errors, touched, values, setFieldValue)
                                    })
                                }

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