import { supabase } from "../config/supabase";

export async function signUp(email:string,password:string,userName:string) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                display_name: userName
            }
        }
    });

    if (error) throw error;
    return data;
}

export async function logIn(email:string,password:string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function logOut() {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session?.user ?? null;
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session ?? null;
}