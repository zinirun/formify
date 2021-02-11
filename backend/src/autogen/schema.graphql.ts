
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;
}

export class User {
    id: number;
    provider: string;
    providerId: string;
    username: string;
}
