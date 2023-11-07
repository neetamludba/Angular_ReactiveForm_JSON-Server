export interface Answer {
    id: number;
    attemptID: number;
    questionID: number;
    skipped: boolean;
    answer: string;
    answerTime: Date
  }
  