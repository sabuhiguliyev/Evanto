import { User } from '@supabase/supabase-js';

export interface UserProfile {
  avatar_url?: string;
  full_name?: string;
}

export interface AuthUser {
  avatar_url?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
  };
}

/**
 * Get the appropriate avatar source with proper priority:
 * 1. User-uploaded profile photo (profile.avatar_url)
 * 2. Social login photo (user.avatar_url or user.user_metadata.avatar_url)
 * 3. Default avatar with user initials
 */
export const getAvatarSource = (
  profile?: UserProfile | null,
  user?: AuthUser | null
): string | undefined => {
  // Priority 1: User-uploaded profile photo
  if (profile?.avatar_url) {
    return profile.avatar_url;
  }
  
  // Priority 2: Social login photo
  if (user?.avatar_url) {
    return user.avatar_url;
  }
  
  if (user?.user_metadata?.avatar_url) {
    return user.user_metadata.avatar_url;
  }
  
  // Priority 3: No avatar (will show default with initials)
  return undefined;
};

/**
 * Get user initials for default avatar
 */
export const getUserInitials = (
  profile?: UserProfile | null,
  user?: AuthUser | null
): string => {
  const name = profile?.full_name || 
               user?.user_metadata?.full_name || 
               user?.user_metadata?.name || 
               user?.email?.split('@')[0] || 
               'User';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get avatar props for MUI Avatar component
 */
export const getAvatarProps = (
  profile?: UserProfile | null,
  user?: AuthUser | null,
  size: number = 40
) => {
  const src = getAvatarSource(profile, user);
  const initials = getUserInitials(profile, user);
  
  return {
    src,
    children: !src ? initials : undefined,
    sx: {
      width: size,
      height: size,
      bgcolor: !src ? '#5D9BFC' : undefined,
      color: !src ? 'white' : undefined,
      fontSize: size * 0.4,
      fontWeight: 'bold',
    }
  };
};
