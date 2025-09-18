// import { supabase } from "@/lib/supabase"
import { createClient } from "@/lib/supabase/client"

export async function verifyUser ({
  correo
}: {
  correo: string
}) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('verify_pearl_user', {
    user_email: correo 
  })

  if (error) {
    return { error: error }
  }

  if (data > 0) {
    return { error: { message: 'El correo ya está registrado' } }
  }

  return { error: null }
}

export async function updateUsuario({ 
  id, 
  data 
}: { 
  id: string
  data: {
    nombre?: string | null
    apellido?: string | null
    telefono?: string | null
  }
}) {
  const supabase = createClient() // Crear instancia aquí
  
  const { data: usuario, error: errorUsuario } = await supabase.rpc('update_pearl_usuario', {
    user_id: id,
    user_nombre: data.nombre || null,
    user_apellido: data.apellido || null,
    user_telefono: data.telefono || null
  })
  
  return { usuario, errorUsuario }
}

export async function setRoleUser({
  id,
  rol
}: {
  id: string
  rol: number
}) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('set_pearl_user_role', {
    user_id: id,
    role_id: rol
  })

  return { data, error }
}


// export async function getUserData (userId: string) {
//   const { data: usuario, error } = await supabase
//     .from('usuarios')
//     .select('nombre, avatar_url')
//     .eq("id", userId)
//     .single();

//     console.log(usuario)

//   return { usuario, error }
// }


export async function getUserData(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_user", {
    user_id: userId
  })

  if (error) {
    console.error("Error obteniendo usuario:", error)
    return { usuario: null, error }
  }

  const usuario = data && data.length > 0 ? data[0] : null

  return { usuario, error: null }
}