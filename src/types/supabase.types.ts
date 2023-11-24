export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          created_at: string
          id: number
          last_login_time: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          last_login_time?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          last_login_time?: string | null
          name?: string | null
        }
        Relationships: []
      }
      book: {
        Row: {
          created_at: string
          id: string
          like_count: number | null
          name: string | null
          shelf_count: number | null
          thumbnail: string | null
        }
        Insert: {
          created_at?: string
          id: string
          like_count?: number | null
          name?: string | null
          shelf_count?: number | null
          thumbnail?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          like_count?: number | null
          name?: string | null
          shelf_count?: number | null
          thumbnail?: string | null
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          isbn: string
          user_id: number | null
        }
        Insert: {
          created_at?: string
          isbn: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          isbn?: string
          user_id?: number | null
        }
        Relationships: []
      }
      stock: {
        Row: {
          created_at: string
          isbn: string
          user_id: number
        }
        Insert: {
          created_at?: string
          isbn: string
          user_id: number
        }
        Update: {
          created_at?: string
          isbn?: string
          user_id?: number
        }
        Relationships: []
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