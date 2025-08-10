export type AuthProvider = 'google' | 'apple' | 'facebook';

export interface UserProfile {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    provider?: AuthProvider;
}
