export class QuestionnaireResponse {
    resource: string
    episodeOfCare: string
    serviceRequest: string
    patientId: string

    items: QuestionnaireReponseItem[]

    public constructor(resource: string) {
        this.resource = resource;
        this.episodeOfCare = ""
        this.serviceRequest = ""
        this.patientId = ""
        this.items = []
    }
}
  
export class QuestionnaireReponseItem {
    linkId: string
    answers: string[]

    public constructor() {
        this.linkId = "";
        this.answers = []
    }
}