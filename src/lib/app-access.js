import { supabase } from './supabase.js';

export async function fetchMyApps() {
  const { data, error } = await supabase
    .from('app_access')
    .select('app, role')
    .order('app');
  if (error) throw error;
  return data;
}
