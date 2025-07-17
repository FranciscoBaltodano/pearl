import { supabase } from '@/lib/supabase'

export async function getEmpresas() {
  const { data, error } = await supabase.
  rpc('get_empresas', {})

  if (error) {
    console.error('Error al obtener las empresas:', error)
    throw error
  }

  return data 
}
