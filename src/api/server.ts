'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getUserData } from "./signup"
import { revalidatePath } from "next/cache"

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

// export async function signIn(dataForm: { email: string; password: string; }) {
//   const supabase = await createClient();

//   const { error } = await supabase.auth.signInWithPassword(dataForm)

//   if (error) {
//     throw new Error(`${error}`)
//   }

//   return redirect('/')
// }

export async function signIn(dataForm: { email: string; password: string; }) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword(dataForm);

    if (error) {
      throw new Error(`Login failed: ${error.message}`);
    }

    if (data.user) {
      // Revalidar todas las rutas que dependen de autenticación
      revalidatePath('/', 'layout');
      revalidatePath('/profile');
      revalidatePath('/test');
      
      console.log("Login successful for:", data.user.email);
    }

    return redirect('/');
  } catch (error) {
    console.error("Error in signIn:", error);
    throw error;
  }
}

// export async function signOut() {
//   const supabase = await createClient();
//   return await supabase.auth.signOut()
// }

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      throw new Error(`Sign out failed: ${error.message}`);
    }

    revalidatePath('/', 'layout');
    
  } catch (error) {
    console.error("Error in signOut:", error);
    throw error;
  }
  
  redirect('/login');
}


export async function readUser() {
  const supabase = await createClient()
  return await supabase.auth.getUser()
}

export async function readSession() {
  const supabase = await createClient()
  return await supabase.auth.getSession()
}

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


export async function getAuthUser() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error("Error getting auth user:", error);
      return { user: null, error };
    }
    
    return { user, error: null };
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    return { user: null, error };
  }
}

export async function getCompleteUserData() {
  try {
    const { user: authUser, error: authError } = await getAuthUser();
    
    if (authError || !authUser) {
      return { 
        authUser: null, 
        userData: null, 
        error: authError || new Error("No authenticated user") 
      };
    }

    const { usuario: userData, error: userError } = await getUserData(authUser.id);
    
    if (userError || !userData) {
      const fallbackUser = {
        nombre: authUser.email?.split('@')[0] || 'Usuario',
        avatar_url: '',
        email: authUser.email || ''
      };
      
      return { 
        authUser, 
        userData: fallbackUser, 
        error: null,
        isFallback: true 
      };
    }

    return { 
      authUser, 
      userData, 
      error: null,
      isFallback: false 
    };
  } catch (error) {
    console.error("Error in getCompleteUserData:", error);
    return { 
      authUser: null, 
      userData: null, 
      error: error as Error 
    };
  }
}