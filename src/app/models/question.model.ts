export interface Question {
    id: number;
    testID: number;
    question: string;
    questionType: number;
    isDeleted: boolean;
    mandatory: boolean;
    options: string;
    correctAnswers: string;
    active: boolean;
  }
  