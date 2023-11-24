'use client'

import { Avatar } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Layout from '@/app/mypage/[userId]/layout'
import LogoutButton from '@/components/logoutButton'
import NavigationBar from '@/components/navigationBar'
import Stock from '@/components/stock'
import useAuth from '@/hooks/useAuth'
import supabase, { DbResultOk, Tables } from '@/lib/supabase'
import utilStyles from '@/styles/utils.module.css'

export default function Mypage({}: { params: { slug: string } }) {
  const { profileFromGithub } = useAuth()
  const [books, setBooks] = useState<Tables<'book'>[]>()
  const user_id = '64587946'


  useEffect(() => {
    fetchStocks()
  })

  // ユーザーの本棚情報取得
  const fetchStocks = async () => {
    const { data: stockData } = await supabase.from('stock').select('isbn').eq('user_id', user_id)
    const isbnArray = stockData
      ?.map((item: any) => item.isbn)
      .filter((isbn: any) => typeof isbn === 'string') as string[];

    if (isbnArray.length === 0) return

    const stocksByUserQuery = supabase
      .from('book')
      .select('*')
      .in('id', isbnArray)
      .returns<Tables<'book'>[]>()

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
              name={profileFromGithub.fullName}
              size="sm"
              src={profileFromGithub.avatarUrl}
            />
            <h2>{profileFromGithub.fullName}さんの本棚</h2>
          </div>
          <LogoutButton />
        </div>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-4">
            {books &&
              books.map((book: Tables<'book'>) => (
                <Stock
                  key={book.id}
                  isbn={book.id}
                  title={book.name}
                  thumbnail={book.thumbnail}
                  shelfCount={book.shelf_count}
                  likeCount={book.like_count}
                />
              ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
