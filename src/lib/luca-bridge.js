// Hand the Supabase session to Luca's /auth/session endpoint so it sets
// shared cookies on .tanzillo.ai. Until each sub-app runs its own Supabase
// client, this is what makes "log in once" actually carry across domains.
export function bridgeSessionToLuca(session, returnTo) {
  const url = new URL(`${import.meta.env.VITE_LUCA_URL}/auth/session`);
  url.searchParams.set('token', session.access_token);
  url.searchParams.set('refresh', session.refresh_token);
  if (returnTo) url.searchParams.set('returnTo', returnTo);
  return url.toString();
}
