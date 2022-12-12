import { Student } from "./student";

export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
}

export interface StudentUser extends Student{
    password: string;
}