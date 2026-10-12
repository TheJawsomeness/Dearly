import { supabase } from "../config/supabase";

export async function signUp(email,password) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password
    });

    if (error) throw error;
    return data;
}

export async function logIn(email,password) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function logOut() {
    const {data, error} = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session?.user ?? null;
}