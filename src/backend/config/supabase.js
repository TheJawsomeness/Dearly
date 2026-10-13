import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL =
    "https://orwbogsqoefxfdyomjuy.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_xUEC--0ITmr4J7ZTI28K3A_x3YBTkPe";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);