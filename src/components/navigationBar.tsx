import { Avatar, Navbar, NavbarBrand, NavbarItem } from '@nextui-org/react'
import { MoonStar, LibraryBig } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginButton from '@/components/loginButton'
import { useAuth } from '@/hooks/authProvider'

export default function NavigationBar() {
  const contextValue = useAuth()
  const profileFromSession = contextValue?.profileFromSession
  const isLogin = contextValue?.session ? true : false
  const loginPage = usePathname().includes('login') ? true : false

  return (
    <>
      <Navbar isBordered isBlurred={false}>
        <NavbarBrand>
          <Link href={'/'}>
            <div className="flex">
              <LibraryBig />
              <h1 className="px-1 font-bold">Search Book</h1>
              <MoonStar />
            </div>
          </Link>
        </NavbarBrand>
        <NavbarItem>
        {loginPage ? 
          null
          : 
          (isLogin ? 
            <Link className="flex" href={`/mypage/${profileFromSession?.id}`}>
              <div className="cursor-pointer">
                <Avatar
                  isBordered
                  as="button"
                  className="mr-4 transition-transform"
                  name={profileFromSession?.fullName}
                  size="sm"
                  src={profileFromSession?.avatarUrl}
                />
              </div>
            </Link>
            : <LoginButton />
          )
        }
        </NavbarItem>
      </Navbar>
    </>
  )
}
