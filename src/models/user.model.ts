import { BookModel } from "./book.model";

export interface UserModel {
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    roles: string[];
    cart?: BookModel[]
}

export interface UserWithToken extends UserModel {
    token: string;
}