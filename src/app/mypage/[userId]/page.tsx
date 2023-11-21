'use client'

import { Avatar, User } from '@nextui-org/react'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import useAuth from '@/hooks/useAuth'

export default function Mypage({ params }: { params: { slug: string } }) {
  const { profileFromGithub } = useAuth()

  return (
    <>
      <div>
        <Link href={"/"}>
          <ArrowLeftCircle />
        </Link>
        <div className="flex items-center">
          <Avatar
            className="mr-2 transition-transform"
            name={profileFromGithub.fullName}
            size="sm"
            src={profileFromGithub.avatarUrl}
          />
          <h2>{profileFromGithub.fullName}さんの本棚</h2>
          </div>
      </div>
      <LogoutButton />
    </>
  )
}
