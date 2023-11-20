import { createClient } from '@supabase/supabase-js'

export type Account = {
  id: string
  created_at: string
  name: string
  last_login_time: string
}

export type Stock = {
  id: string
  user_id: string
  isbn: string
  created_at: string
}

export type Like = {
  id: string
  user_id: string
  isbn: string
  created_at: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
