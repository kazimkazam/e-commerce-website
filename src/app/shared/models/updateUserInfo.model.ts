export interface ResetPasswordResponse {
    email: string
}

export interface ChangePasswordResponse {
    localId: string,
    email: string,
    passwordHash: string,
    providerUserInfo?: {},
    idToken?: string,
    refreshToken?: string,
    expiresIn?: string
}