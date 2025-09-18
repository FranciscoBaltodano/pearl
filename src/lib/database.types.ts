export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  pearl: {
    Tables: {
      actividad: {
        Row: {
          creado: string
          descripcion: string | null
          id: number
        }
        Insert: {
          creado?: string
          descripcion?: string | null
          id?: number
        }
        Update: {
          creado?: string
          descripcion?: string | null
          id?: number
        }
        Relationships: []
      }
      actividad_categoria: {
        Row: {
          id_actividad: number
          id_categoria: number
        }
        Insert: {
          id_actividad?: number
          id_categoria?: number
        }
        Update: {
          id_actividad?: number
          id_categoria?: number
        }
        Relationships: [
          {
            foreignKeyName: "actividad_categoria_id_actividad_fkey"
            columns: ["id_actividad"]
            isOneToOne: false
            referencedRelation: "actividad"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "actividad_categoria_id_categoria_fkey"
            columns: ["id_categoria"]
            isOneToOne: false
            referencedRelation: "categoria"
            referencedColumns: ["id"]
          },
        ]
      }
      afiliados: {
        Row: {
          actualizado_en: string | null
          creado_en: string | null
          descripcion: string | null
          descuento: string | null
          id: number
          id_usuario: string | null
          latitud: number
          longitud: number
          nombre: string
        }
        Insert: {
          actualizado_en?: string | null
          creado_en?: string | null
          descripcion?: string | null
          descuento?: string | null
          id?: number
          id_usuario?: string | null
          latitud: number
          longitud: number
          nombre: string
        }
        Update: {
          actualizado_en?: string | null
          creado_en?: string | null
          descripcion?: string | null
          descuento?: string | null
          id?: number
          id_usuario?: string | null
          latitud?: number
          longitud?: number
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "afiliados_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      analiticas: {
        Row: {
          accion: string
          id: number
          id_usuario: string | null
          timestamp: string | null
        }
        Insert: {
          accion: string
          id?: number
          id_usuario?: string | null
          timestamp?: string | null
        }
        Update: {
          accion?: string
          id?: number
          id_usuario?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analiticas_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      categoria: {
        Row: {
          creado: string
          id: number
          nombre: string | null
        }
        Insert: {
          creado?: string
          id?: number
          nombre?: string | null
        }
        Update: {
          creado?: string
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      direcciones: {
        Row: {
          calle: string
          ciudad: string
          codigo_postal: string
          estado: string
          id: number
          pais: string
          tipo_direccion: string
        }
        Insert: {
          calle: string
          ciudad: string
          codigo_postal: string
          estado: string
          id?: never
          pais: string
          tipo_direccion: string
        }
        Update: {
          calle?: string
          ciudad?: string
          codigo_postal?: string
          estado?: string
          id?: never
          pais?: string
          tipo_direccion?: string
        }
        Relationships: []
      }
      favoritos: {
        Row: {
          created_at: string
          descripcion: string | null
          id: number
          id_lugar: number | null
          id_usuario: string | null
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          id?: number
          id_lugar?: number | null
          id_usuario?: string | null
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          id?: number
          id_lugar?: number | null
          id_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      historial_pagos: {
        Row: {
          fecha_pago: string | null
          id: number
          id_usuario: string | null
          metodo_pago: string | null
          monto: number
        }
        Insert: {
          fecha_pago?: string | null
          id?: number
          id_usuario?: string | null
          metodo_pago?: string | null
          monto: number
        }
        Update: {
          fecha_pago?: string | null
          id?: number
          id_usuario?: string | null
          metodo_pago?: string | null
          monto?: number
        }
        Relationships: [
          {
            foreignKeyName: "historial_pagos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      historial_viajes: {
        Row: {
          comentarios: string | null
          fecha_viaje: string | null
          id: number
          id_usuario: string | null
          lugar_id: number | null
        }
        Insert: {
          comentarios?: string | null
          fecha_viaje?: string | null
          id?: number
          id_usuario?: string | null
          lugar_id?: number | null
        }
        Update: {
          comentarios?: string | null
          fecha_viaje?: string | null
          id?: number
          id_usuario?: string | null
          lugar_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "historial_viajes_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historial_viajes_lugar_id_fkey"
            columns: ["lugar_id"]
            isOneToOne: false
            referencedRelation: "lugares"
            referencedColumns: ["id"]
          },
        ]
      }
      lugar: {
        Row: {
          creado: string
          descripcion: string | null
          id: number
          nombre: string | null
        }
        Insert: {
          creado?: string
          descripcion?: string | null
          id?: number
          nombre?: string | null
        }
        Update: {
          creado?: string
          descripcion?: string | null
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      lugares: {
        Row: {
          actualizado_en: string | null
          creado_en: string | null
          descripcion: string | null
          id: number
          latitud: number
          longitud: number
          nombre: string
        }
        Insert: {
          actualizado_en?: string | null
          creado_en?: string | null
          descripcion?: string | null
          id?: never
          latitud: number
          longitud: number
          nombre: string
        }
        Update: {
          actualizado_en?: string | null
          creado_en?: string | null
          descripcion?: string | null
          id?: never
          latitud?: number
          longitud?: number
          nombre?: string
        }
        Relationships: []
      }
      recomendaciones: {
        Row: {
          creado_en: string | null
          id: number
          id_usuario: string | null
          lugar_id: number | null
          puntuacion: number | null
        }
        Insert: {
          creado_en?: string | null
          id?: number
          id_usuario?: string | null
          lugar_id?: number | null
          puntuacion?: number | null
        }
        Update: {
          creado_en?: string | null
          id?: number
          id_usuario?: string | null
          lugar_id?: number | null
          puntuacion?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendaciones_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendaciones_lugar_id_fkey"
            columns: ["lugar_id"]
            isOneToOne: false
            referencedRelation: "lugares"
            referencedColumns: ["id"]
          },
        ]
      }
      rol: {
        Row: {
          created_at: string
          id: number
          nombre: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          nombre?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          nombre?: string | null
        }
        Relationships: []
      }
      suscripciones: {
        Row: {
          activo: boolean | null
          fecha_fin: string | null
          fecha_inicio: string | null
          id: number
          id_usuario: string | null
          plan: string
        }
        Insert: {
          activo?: boolean | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: number
          id_usuario?: string | null
          plan: string
        }
        Update: {
          activo?: boolean | null
          fecha_fin?: string | null
          fecha_inicio?: string | null
          id?: number
          id_usuario?: string | null
          plan?: string
        }
        Relationships: [
          {
            foreignKeyName: "suscripciones_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          apellido: string | null
          avatar_url: string | null
          correo: string
          created_at: string
          genero: string | null
          id: string
          nombre: string | null
          telefono: string | null
        }
        Insert: {
          apellido?: string | null
          avatar_url?: string | null
          correo: string
          created_at?: string
          genero?: string | null
          id?: string
          nombre?: string | null
          telefono?: string | null
        }
        Update: {
          apellido?: string | null
          avatar_url?: string | null
          correo?: string
          created_at?: string
          genero?: string | null
          id?: string
          nombre?: string | null
          telefono?: string | null
        }
        Relationships: []
      }
      usuarioXrol: {
        Row: {
          id_rol: number
          id_usuario: string
        }
        Insert: {
          id_rol: number
          id_usuario?: string
        }
        Update: {
          id_rol?: number
          id_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarioXrol_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarioXrol_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  pearl: {
    Enums: {},
  },
} as const
