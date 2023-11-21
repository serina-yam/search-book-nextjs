import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { Library, MoonStar, LibraryBig, Link as LinkImg } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LoginButton from '@/components/LoginButton'
import LogoutButton from '@/components/LogoutButton'
import useAuth from '@/hooks/useAuth'

export default function NavigationBar() {
  const { profileFromGithub } = useAuth()
  const { session: isLogin } = useAuth()

  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href={'/'}>
            <div className="flex">
              <LibraryBig />
              <MoonStar />
              <LibraryBig />
            </div>
          </Link>
        </NavbarBrand>
        <NavbarItem>
          {isLogin ? (
            <>
              <Link className="flex" href={`/mypage/${profileFromGithub.id}`}>
                <div className="cursor-pointer">
                  <Avatar
                    isBordered
                    as="button"
                    className="mr-4 transition-transform"
                    name={profileFromGithub.fullName}
                    size="sm"
                    src={profileFromGithub.avatarUrl}
                  />
                </div>
              </Link>
            </>
          ) : (
            <LoginButton />
          )}
        </NavbarItem>
      </Navbar>
    </>
  )
}
