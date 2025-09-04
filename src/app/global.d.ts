import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Empresas = DB['public']['Tables']['empresas']['Row']


  interface SelectedTags {
  destination: string;
  activities: string[];
  duration: string;
  budget: string;
  travelers: string;
}

interface Recommendation {
  destinoRecomendado: string;
  descripcion: string;
  actividades: string[];
  consejosPracticos: string[];
  mejorEpoca: string;
  presupuestoEstimado: string;
  imagesUrls: string[];
}

}



