'use server'

import { createClient } from "@/lib/supabase/server"
// import { registerUser } from "./usuarios"
import { redirect } from "next/navigation"

export const updateEmail = async (newEmail: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.updateUser({
    email: newEmail
  })

  if (error) {
    throw new Error(`${error}`)
  }

  if (!data) {
    throw new Error("Error actualizando el correo")
  }

  return { data, error }
}

// export const verifyPass = async (id: string, updatePass: UpdatePassword) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase.rpc("verify_user_password", {
//     "user_id": id,
//     "password": updatePass.password
//   })

//   if (error) {
//     throw new Error(`${error}`)
//   }

//   if (!data) {
//     throw new Error("Contraseña actual incorrecta")
//   }

//   if (updatePass.password == updatePass.newPassword) {
//     throw new Error("La nueva contraseña debe ser diferente de la actual")
//   }

//   return await updatePassword(updatePass)
// }

// export const updatePassword = async (updatePass: UpdatePassword) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase.auth.updateUser({
//     password: updatePass.newPassword
//   })

//   if (error) {
//     throw new Error(`${error}`)
//   }

//   if (!data) {
//     throw new Error("Ocurrio un error")
//   }

//   return data
// }

export async function signIn(dataForm: { email: string; password: string; }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(dataForm)

  if (error) {
    throw new Error(`${error}`)
  }

  return redirect('/')
}

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut()
}

export async function readUser() {
  const supabase = await createClient()
  return await supabase.auth.getUser()
}

export async function readSession() {
  const supabase = await createClient()
  return await supabase.auth.getSession()
}

// export async function signUpWithEmailAndPassword (data: {
//   email: string
//   password: string
//   confirm: string
// }) {
//   const supabase = await createClient()
//   const result = await supabase.auth.signUp({
//     email: data.email,
//     password: data.password
//   })
//   return JSON.stringify(result)
// }

export async function signUpWithEmailAndPassword(data: {
  email: string
  password: string
  confirm: string
}) {
  try {
    if (data.password !== data.confirm) {
      return {
        userCreate: null,
        errorUserCreate: { message: "Las contraseñas no coinciden" }
      }
    }

    const supabase = await createClient()

    const { data: userCreate, error: errorUserCreate } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    })

    console.log('Resultado del signup:', { userCreate, errorUserCreate })

    return { userCreate, errorUserCreate }
  } catch (error) {
    console.error('Error en signUpWithEmailAndPassword:', error)
    return {
      userCreate: null,
      errorUserCreate: { message: (error as Error).message }
    }
  }
}


export async function signInWithEmailAndPassword (data: {
  email: string
  password: string
}) {
  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword(data)

  return JSON.stringify(result)
}

// interface RegisterData {
//   nombre: string;
//   apellido: string;
//   email: string;
//   password: string;
// }

// export const registro = async (userData: RegisterData) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase.auth.signUp({
//     email: userData.email,
//     password: userData.password
//   })

//   if (error || !data) {
//     throw new Error("Ocurrio un error al registrarte")
//   }

//   if (data.user) {
//     await registerUser({
//       id: data.user.id,
//       nombre: userData.nombre,
//       apellido: userData.apellido,
//       email: userData.email
//     });
    
//     return redirect('/')
//   }
  
//   throw new Error("Error registandote")
// };