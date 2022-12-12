export interface LoginResult {
    isOk: boolean;
    studentId:number;
    email: string;
}

export interface ChangePassData{
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface ChangePassResult {
    isOk: boolean;
}

