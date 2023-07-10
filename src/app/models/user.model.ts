export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    batchId: string;
    registerationDate: Date;
    active: boolean;
    isDeleted: boolean;
}