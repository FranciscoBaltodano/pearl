import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Empresas = DB['public']['Tables']['empresas']['Row']

}

