'use client'

import { Avatar } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Layout from '@/app/layout'
import LogoutButton from '@/components/logoutButton'
import NavigationBar from '@/components/navigationBar'
import Stock from '@/components/stock'
import { useAuth } from '@/hooks/authProvider'
import supabase, { DbResultOk, Tables } from '@/lib/supabase'
import utilStyles from '@/styles/utils.module.css'


export default function Mypage({ params }: { params: { userId: string }}) {
  const profileFromGithub = useAuth()?.profileFromGithub
  const [books, setBooks] = useState<Tables<'book'>[]>()
  const userId = params.userId

  useEffect(() => {
    fetchStocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ユーザーの本棚情報取得
  const fetchStocks = async () => {
    const { data: stockData } = await supabase.from('stock').select('book_id').eq('user_id', userId)
    const bookIdArray = stockData
      ?.map((item: any) => item.book_id)
      .filter((bookId: any) => typeof bookId === 'string') as string[]

    if (bookIdArray === undefined || bookIdArray.length === 0) return

    const stocksByUserQuery = supabase.from('book').select('*').in('id', bookIdArray).returns<Tables<'book'>[]>()

    type stocksByUser = DbResultOk<typeof stocksByUserQuery>
    const { data, error } = await stocksByUserQuery
    if (error) throw error
    const stocksByUser: stocksByUser = data
    setBooks(data)
  }

  return (
    <Layout>
      <NavigationBar />
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar
              className="mr-2 transition-transform"
              name={profileFromGithub?.fullName}
              size="sm"
              src={profileFromGithub?.avatarUrl}
            />
            <h2>{profileFromGithub?.fullName}さんの本棚</h2>
          </div>
          <LogoutButton />
        </div>
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-3">
            {books &&
              books.map((book: Tables<'book'>) => (
                <Stock 
                  key={book.id}
                  id={book.id}
                  isbn={book.isbn}
                  title={book.name}
                  author={book.author}
                  thumbnail={book.thumbnail}
                  publisher={book.publisher}
                  publishedDate={book.published_date}
                  pageCount={book.page}
                  description={book.description}
                   />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
