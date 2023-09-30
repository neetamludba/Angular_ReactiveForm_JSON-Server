export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    hashPass: string;
    role: string;
    batchId: number;
    registerationDate: Date;
    active: boolean;
    isDeleted: boolean;
}