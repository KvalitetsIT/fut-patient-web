export interface Question {
    linkId: string
    text: string
    type: string
    required: boolean
    answerOptions: [string]
}

export interface Questionnaire {
    resource: string
    episodeOfCare: string
    serviceRequest: string
    title: string
    description: string
    items: [Question]
}
  