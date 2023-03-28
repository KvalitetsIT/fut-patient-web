import { FormControl, Stack, Button, CircularProgress, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Formik, Form, FormikErrors, FormikTouched } from "formik";
import { t } from "i18next";
import * as yup from 'yup';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/da';
import { QuestionnaireReponseItem } from "../../models/QuestionnaireResponse";
import { ValidatedSelect } from "../input/validatedSelect";
import { Question, Questionnaire } from "../../models/Questionnaire";
import { useState } from "react";

export interface FormProps {
    onSubmit: (submission: QuestionnaireReponseItem[], formik : any) => Promise<void>
    onCancel: () => void,
    isLoading?: boolean
}

interface QuestionnaireFormProps extends FormProps {
    questionnaire?: Questionnaire
    loading?: boolean
}

function createQuestion(index: number, item: Question, props: QuestionnaireFormProps,
        errors: any,
        touched : FormikTouched<{ answers: QuestionnaireReponseItem[]; checked: boolean; }>,
        values: { answers: QuestionnaireReponseItem[]; checked: boolean; },
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) {
            
    let errorElement = undefined;
    if (errors.answer) {
        errorElement = <p>Der skal vælges et svar.</p>
    }

    return (<div key = {index}>
        <Typography variant="h5">{ item.text }</Typography>

        <ValidatedSelect
            name={""}
            error={errorElement}
            labelId="answer-select-label"
            id="answer-select"
            value={values.answers[index].answers[0]} // Only one answer per question
            label=""
            onChange={(event) => {
                values.answers[index].answers[0] = event.target.value as string;
                setFieldValue("answers", values.answers)
            }}
        >
            <MenuItem key={"empty"} value={""}></MenuItem>
            {item.answerOptions.map((option) => {
                return <MenuItem key={option} value={option}>{option}</MenuItem>
            })}
        </ValidatedSelect>
    </div>);
}

function createInitialAnswers(q: Questionnaire) {
    const result: QuestionnaireReponseItem[] = [];

    q.items.forEach((item) => {
        const responseItem = new QuestionnaireReponseItem();
        responseItem.answers.push("");
        responseItem.linkId = item.linkId;
        result.push(responseItem);
    });

    return result;
}

export function QuestionnaireForm(props: QuestionnaireFormProps) {

    const [stateDisabled, setStateDisabled] = useState(false);

    if (props.isLoading) return (<></>)
    else {
        
        return (
            <FormControl fullWidth sx={{ mt: 4 }}>
                <Formik
                    initialValues={{
                        answers: createInitialAnswers(props.questionnaire!),
                        checked: false
                    }}
                    onSubmit={(values, formik) => {
                        setStateDisabled(true);
                        props.onSubmit(values.answers, formik);
                    }}
                    enableReinitialize={false}
                    validate={
                        (values) => {
                            console.log("Validate hehe", values);
                            const errors : any = {};
                            if (values.answers[0].answers[0].length <= 0) {
                                errors["answer"] = "Svaret må ikke være tomt";
                            }
                            console.log(errors);
                            return errors;
                        }
                    }
                >
            
                    {({ errors, touched, values, handleChange, setFieldValue }) => (
                        <Form>
                            <Stack spacing={2}>
                                {
                                    props.questionnaire?.items && props.questionnaire?.items.map((item, index) => {
                                        return createQuestion(index, item, props, errors, touched, values, setFieldValue)
                                    })
                                }

                                <Stack spacing={2} direction={"row"}>
                                    <Button
                                        type={"submit"}
                                        variant="contained"
                                        disabled={props.loading || stateDisabled}
                                        fullWidth={true}
                                    >
                                        {props.loading ? <CircularProgress color={"inherit"} size={"1.5em"}></CircularProgress> : <>{t("Submit")}</>}
                                    </Button>
    
                                    <Button
                                        fullWidth={true}
                                        onClick={props.onCancel}
                                        variant="outlined">{t("Cancel") + ""}
                                    </Button>
                                </Stack>
                                    
                            </Stack>
                        </Form>
                    )}
    
                </Formik>
            </FormControl >
        )
    }
    
  
}