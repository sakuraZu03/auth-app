export interface User {
    id: number,
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
}
