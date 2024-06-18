import {createClient} from "@supabase/supabase-js";

export const supabaseConfig = {
    url: "http://fakeurl.com",
    key: "fake-key"
}

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key)
