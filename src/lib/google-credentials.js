import { supabase } from './supabase.js';

const GOOGLE_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/contacts.readonly',
];

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: GOOGLE_SCOPES.join(' '),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${import.meta.env.VITE_HUB_URL}/auth/callback`,
    },
  });
}

// provider_refresh_token is only present on the very first OAuth callback;
// subsequent sessions don't include it. Capture it now or it's gone.
export async function captureGoogleCredentials(session) {
  if (!session?.provider_refresh_token) return { skipped: true };

  const { error } = await supabase.from('google_credentials').upsert({
    user_id: session.user.id,
    refresh_token: session.provider_refresh_token,
    access_token: session.provider_token ?? null,
    access_token_expires_at: session.expires_at
      ? new Date(session.expires_at * 1000).toISOString()
      : null,
    scopes: GOOGLE_SCOPES,
    google_email: session.user.email,
  });

  if (error) throw error;
  return { captured: true };
}
