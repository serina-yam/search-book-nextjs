'use client'

import { Button } from '@nextui-org/react'
import { LogOut } from 'lucide-react'
import supabase from '@/lib/supabase'

const LogoutButton = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return error
    }
    window.location.href = "/"
  }
  return (
    <Button onClick={handleSignOut} color="primary" variant="bordered" startContent={<LogOut />}>
      Logout
    </Button>
  )
}

export default LogoutButton
