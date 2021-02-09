export class UserAuthDto {
    readonly provider: string;
    readonly providerId: string;
    readonly email?: string;
    readonly username: string;
}
