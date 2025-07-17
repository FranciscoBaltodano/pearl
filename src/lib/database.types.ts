export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      beneficios: {
        Row: {
          descripcion: string | null
          empleado_id: number | null
          id: number
          tipo_beneficio: string | null
          valor: number | null
        }
        Insert: {
          descripcion?: string | null
          empleado_id?: number | null
          id?: never
          tipo_beneficio?: string | null
          valor?: number | null
        }
        Update: {
          descripcion?: string | null
          empleado_id?: number | null
          id?: never
          tipo_beneficio?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beneficios_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      deducciones_fiscales: {
        Row: {
          empresa_id: number | null
          fecha_aplicacion: string | null
          id: number
          monto_deduccion: number | null
          tipo_deduccion: string | null
          transaccion_id: number | null
        }
        Insert: {
          empresa_id?: number | null
          fecha_aplicacion?: string | null
          id?: never
          monto_deduccion?: number | null
          tipo_deduccion?: string | null
          transaccion_id?: number | null
        }
        Update: {
          empresa_id?: number | null
          fecha_aplicacion?: string | null
          id?: never
          monto_deduccion?: number | null
          tipo_deduccion?: string | null
          transaccion_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deducciones_fiscales_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deducciones_fiscales_transaccion_id_fkey"
            columns: ["transaccion_id"]
            isOneToOne: false
            referencedRelation: "transacciones"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      empleados: {
        Row: {
          apellido: string | null
          email: string | null
          empresa_id: number | null
          fecha_contratacion: string | null
          id: number
          nombre: string | null
          puesto: string | null
          salario: number | null
          telefono: string | null
        }
        Insert: {
          apellido?: string | null
          email?: string | null
          empresa_id?: number | null
          fecha_contratacion?: string | null
          id?: never
          nombre?: string | null
          puesto?: string | null
          salario?: number | null
          telefono?: string | null
        }
        Update: {
          apellido?: string | null
          email?: string | null
          empresa_id?: number | null
          fecha_contratacion?: string | null
          id?: never
          nombre?: string | null
          puesto?: string | null
          salario?: number | null
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empleados_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          fecha_registro: string | null
          id: number
          nombre: string | null
          sector: string | null
          tipo: string | null
        }
        Insert: {
          fecha_registro?: string | null
          id?: never
          nombre?: string | null
          sector?: string | null
          tipo?: string | null
        }
        Update: {
          fecha_registro?: string | null
          id?: never
          nombre?: string | null
          sector?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      evaluaciones: {
        Row: {
          calificacion: number | null
          comentarios: string | null
          empleado_id: number | null
          evaluador: string | null
          fecha: string | null
          id: number
        }
        Insert: {
          calificacion?: number | null
          comentarios?: string | null
          empleado_id?: number | null
          evaluador?: string | null
          fecha?: string | null
          id?: never
        }
        Update: {
          calificacion?: number | null
          comentarios?: string | null
          empleado_id?: number | null
          evaluador?: string | null
          fecha?: string | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "evaluaciones_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      planilla: {
        Row: {
          deducciones: number | null
          empleado_id: number | null
          fecha_pago: string | null
          id: number
          salario_bruto: number | null
          salario_neto: number | null
        }
        Insert: {
          deducciones?: number | null
          empleado_id?: number | null
          fecha_pago?: string | null
          id?: never
          salario_bruto?: number | null
          salario_neto?: number | null
        }
        Update: {
          deducciones?: number | null
          empleado_id?: number | null
          fecha_pago?: string | null
          id?: never
          salario_bruto?: number | null
          salario_neto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "planilla_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendaciones: {
        Row: {
          empresa_id: number | null
          fecha: string | null
          id: number
          recomendacion: string | null
          tipo: string | null
        }
        Insert: {
          empresa_id?: number | null
          fecha?: string | null
          id?: number
          recomendacion?: string | null
          tipo?: string | null
        }
        Update: {
          empresa_id?: number | null
          fecha?: string | null
          id?: number
          recomendacion?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendaciones_estrategicas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      reportes_financieros: {
        Row: {
          contenido: string | null
          empresa_id: number | null
          fecha_generacion: string | null
          id: number
          tipo_reporte: string | null
        }
        Insert: {
          contenido?: string | null
          empresa_id?: number | null
          fecha_generacion?: string | null
          id?: never
          tipo_reporte?: string | null
        }
        Update: {
          contenido?: string | null
          empresa_id?: number | null
          fecha_generacion?: string | null
          id?: never
          tipo_reporte?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reportes_financieros_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      transacciones: {
        Row: {
          categoria: string | null
          descripcion: string | null
          empresa_id: number | null
          fecha: string | null
          id: number
          monto: number | null
          tipo: string | null
        }
        Insert: {
          categoria?: string | null
          descripcion?: string | null
          empresa_id?: number | null
          fecha?: string | null
          id?: never
          monto?: number | null
          tipo?: string | null
        }
        Update: {
          categoria?: string | null
          descripcion?: string | null
          empresa_id?: number | null
          fecha?: string | null
          id?: never
          monto?: number | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transacciones_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          email: string | null
          empresa_id: number | null
          fecha_registro: string | null
          id: number
          nombre: string | null
          rol: string | null
        }
        Insert: {
          email?: string | null
          empresa_id?: number | null
          fecha_registro?: string | null
          id?: never
          nombre?: string | null
          rol?: string | null
        }
        Update: {
          email?: string | null
          empresa_id?: number | null
          fecha_registro?: string | null
          id?: never
          nombre?: string | null
          rol?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      get_empresas: {
        Args: Record<PropertyKey, never>
        Returns: {
          fecha_registro: string | null
          id: number
          nombre: string | null
          sector: string | null
          tipo: string | null
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
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
  public: {
    Enums: {},
  },
} as const
