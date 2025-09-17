import { supabase } from "@/lib/supabase"


export async function getUserByCorreo ({ correo }: { correo: string }) {
  const { count: dataCorreo, error: errorCorreo } = await supabase
    .from('usuarios')
    .select('*', { count: 'exact', head: true })
    .eq('correo', correo)

  return { dataCorreo, errorCorreo }
}

export async function verifyUser ({
  correo
}: {
  correo: string
}) {
  const { dataCorreo, errorCorreo } = await getUserByCorreo({ correo })

  if (errorCorreo) {
    return { error: errorCorreo }
  }


  if ((dataCorreo ?? 0) > 0) {
    return { error: { message: 'El correo ya está registrado' } }
  }

  return { error: null }
}


// export async function createUsuario ({ data }: { data: UsuariosInsert }) {
//   const { data: usuario, error: errorUsuario } = await supabase
//     .from('usuarios')
//     .insert({ ...data })
//     .select('*')
//     .single()
//   return { usuario, errorUsuario }
// }

// export async function createUsuario ({ data }: { data: UsuariosCreate }) {
//   const { data: usuario, error: errorUsuario } = await supabase
//     .from('usuarios')
//     .insert({ ...data })
//     .select('*')
//     .single()
//   return { usuario, errorUsuario }
// }

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
  const { data: usuario, error: errorUsuario } = await supabase
    .from('usuarios')
    .update({ ...data })
    .eq('id', id)
    .select('*')
    .single()
  
  return { usuario, errorUsuario }
}

export async function setRoleUser({
  id,
  rol
}: {
  id: string
  rol: number
}) {
  const { data, error } = await supabase
    .from('usuarioXrol') 
    .insert({ id_usuario: id, id_rol: rol })
    .select('*')
    .single()

  return { data, error }
}


export async function getUserData (userId: string) {
  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('nombre, avatar_url')
    .eq("id", userId)
    .single();

    console.log(usuario)

  return { usuario, error }
}
