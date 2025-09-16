import { type Database as DB } from '@/lib/database.types'

declare global {
  type Database = DB
  type Empresas = DB['pearl']['Tables']['empresas']['Row']
  type UsuariosInsert = DB['pearl']['Tables']['usuarios']['Insert']


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

interface ItinerarioDia {
  dia: number;
  destino: string;
  actividades: string[];
  descripcion: string;
  imagenesUrls: string[];
}

type UsuariosCreate ={
    // apellido?: string | null | undefined;
    correo: string;
    id?: string | undefined;
    nombre?: string | null | undefined;
}

}



