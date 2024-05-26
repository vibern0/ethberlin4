export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_mentor_quest: {
        Row: {
          description: string | null
          expire_at: string
          id: number
          title: string
          user_id: number
        }
        Insert: {
          description?: string | null
          expire_at: string
          id?: number
          title: string
          user_id: number
        }
        Update: {
          description?: string | null
          expire_at?: string
          id?: number
          title?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
        ]
      }
      app_user: {
        Row: {
          bio: string | null
          created_at: string
          events: Json | null
          id: number
          identifier: string
          is_mentor: boolean
          mentor_score: number
          social: Json | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          events?: Json | null
          id?: number
          identifier: string
          is_mentor?: boolean
          mentor_score?: number
          social?: Json | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          events?: Json | null
          id?: number
          identifier?: string
          is_mentor?: boolean
          mentor_score?: number
          social?: Json | null
          username?: string | null
        }
        Relationships: []
      }
      app_user_connections: {
        Row: {
          accepted: boolean | null
          channel: string | null
          id: number
          mentee_id: number
          quest_id: number
          survey: Json | null
          updownvote: boolean | null
        }
        Insert: {
          accepted?: boolean | null
          channel?: string | null
          id?: number
          mentee_id: number
          quest_id: number
          survey?: Json | null
          updownvote?: boolean | null
        }
        Update: {
          accepted?: boolean | null
          channel?: string | null
          id?: number
          mentee_id?: number
          quest_id?: number
          survey?: Json | null
          updownvote?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
          {
            foreignKeyName: "app_user_connections_to_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "accepted_connections_with_quests"
            referencedColumns: ["quest_id"]
          },
          {
            foreignKeyName: "app_user_connections_to_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "app_mentor_quest"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      accepted_connections_with_quests: {
        Row: {
          connection_id: number | null
          mentee_identifier: string | null
          mentee_username: string | null
          mentor_id: number | null
          mentor_identifier: string | null
          mentor_username: string | null
          quest_description: string | null
          quest_expire_at: string | null
          quest_id: number | null
          quest_title: string | null
          updownvote: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
        ]
      }
      mentor_requests: {
        Row: {
          channel: string | null
          connection_id: number | null
          mentee_bio: string | null
          mentee_events: Json | null
          mentee_id: number | null
          mentee_identifier: string | null
          mentee_social: Json | null
          mentee_survey: Json | null
          mentee_username: string | null
          mentor_id: number | null
          mentor_identifier: string | null
          request_status: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_mentor_user_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
        ]
      }
      mentors_by_topic: {
        Row: {
          bio: string | null
          connection_channel: string | null
          connection_from: number | null
          connection_to: number | null
          events: Json | null
          expire_at: string | null
          mentor_id: number | null
          mentor_identifier: string | null
          social: Json | null
          topic: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["connection_from"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_connections_from_fkey"
            columns: ["connection_from"]
            isOneToOne: false
            referencedRelation: "mentors_by_topic"
            referencedColumns: ["mentor_id"]
          },
          {
            foreignKeyName: "app_user_connections_to_fkey"
            columns: ["connection_to"]
            isOneToOne: false
            referencedRelation: "app_mentor_quest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "app_user_connections_to_fkey"
            columns: ["connection_to"]
            isOneToOne: false
            referencedRelation: "accepted_connections_with_quests"
            referencedColumns: ["quest_id"]
          },
        ]
      }
    }
    Functions: {
      get_mentors_with_connection_status: {
        Args: {
          current_user_identifier: string
        }
        Returns: {
          mentor_id: number
          mentor_identifier: string
          social: Json
          username: string
          bio: string
          events: Json
          title: string
          description: string
          expire_at: string
          connection_status: number
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
