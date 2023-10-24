export interface TestAssignment {
    id: number;
    testID: number;
    testDescription: string;
    assignedByID: number;
    assignedByName: string;
    assignedToID: number;
    assignedToName: string;
    assignedDate: Date;
    attempted: boolean;
  }
  