export class Entry {
    question: string;
    answer: any;
    type: string;

    constructor(question: string, answer: any, type: string) {
        this.question = question;
        this.answer = answer;
        this.type = type;
    }
}