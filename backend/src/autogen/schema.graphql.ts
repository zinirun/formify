
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class FormInput {
    title: string;
    content: string;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract getFormById(id?: number): Form | Promise<Form>;
}

export abstract class IMutation {
    abstract createForm(form?: FormInput): Form | Promise<Form>;
}

export class User {
    id: number;
    provider: string;
    providerId: string;
    username: string;
    email?: string;
}

export class Form {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}
