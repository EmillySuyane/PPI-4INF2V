import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";


export const SessionContext = createContext();


export function SessionContextProvider({ children }) {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
let mounted = true;


async function loadSession() {
try {
const { data } = await supabase.auth.getSession();
if (!mounted) return;
setSession(data.session ?? null);
} catch (err) {
console.error("getSession error", err);
} finally {
if (mounted) setLoading(false);
}
}


loadSession();


const { data: { subscription } = {} } = supabase.auth.onAuthStateChange((_, session) => {
setSession(session ?? null);
});


return () => {
mounted = false;
try { subscription.unsubscribe(); } catch(e){}
};
}, []);


async function signUp(email, password, username) {
return supabase.auth.signUp({
email,
password,
options: { data: { username, admin: false } }
});
}


async function signIn(email, password) {
return supabase.auth.signInWithPassword({ email, password });
}


async function signOut() {
await supabase.auth.signOut();
setSession(null);
}


return (
<SessionContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
{children}
</SessionContext.Provider>
);
}