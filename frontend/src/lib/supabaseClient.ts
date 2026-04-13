import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jvxyetobkhyrjcllrkwn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2eHlldG9ia2h5cmpjbGxya3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMDY3NjYsImV4cCI6MjA5MTY4Mjc2Nn0.mXuT_q5Gd8wNRBOdiaxofPPsmY4n26hewCeftgn4HHc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
