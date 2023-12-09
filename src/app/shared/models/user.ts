export interface IUser {
    id?: number,
    name: string,
    email: string,
    ava: string,
    role: UserRole,
    balance: number,
    password: string,
    controlQuestion: string,
    controlAnswer: string
}

export enum UserRole {
    User = 0,
    Admin = 10
}