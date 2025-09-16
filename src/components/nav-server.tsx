
import { readUser } from "@/api/server";
import Navbar from "./navbar";
import { createClient } from "@/lib/supabase/server";


export default async function Nav() {
    const { data: { user } } = await readUser();

    if (!user) {
        return <Navbar user={null} />;
    }

    const supabase = await createClient();

    const usuario = await supabase.from('usuarios').select('nombre, avatar_url').eq("id", user.id).single()

    if ( !usuario) {
        console.error("Error fetching user data");
        return <Navbar user={null} />;
    }

    return <Navbar user={usuario.data} />;
}
