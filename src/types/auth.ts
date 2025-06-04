export type AuthProvider = 'google' | 'apple' | 'facebook';

export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    provider?: AuthProvider;
}

export interface AuthSession {
    user: UserProfile;
    access_token: string;
    expires_at?: number;
}
