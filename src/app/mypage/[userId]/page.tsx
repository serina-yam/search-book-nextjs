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
  const userId = 64587946
  const [lastLoginTime, setLastLoginTime] = useState<string | null | undefined>('')


  useEffect(() => {

    // getAccount(user_id)
    //   .then((data) => {
    //     const timestamp = data?.last_login_time; // Supabaseから取得したタイムスタンプ
    //     if (timestamp !== null && timestamp !== undefined) {
    //       const japanTime = new Date(timestamp).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    //       setLastLoginTime(japanTime)
    //     }
    //   })
    fetchStocks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ユーザーの本棚情報取得
  const fetchStocks = async () => {
    const { data: stockData } = await supabase.from('stock').select('isbn').eq('user_id', userId)
    const isbnArray = stockData
      ?.map((item: any) => item.isbn)
      .filter((isbn: any) => typeof isbn === 'string') as string[];

    if (isbnArray === undefined || isbnArray.length === 0) return

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
          {/* <div>最終ログイン日時：{lastLoginTime}</div> */}
          <LogoutButton />
        </div>
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="grid grid-cols-2 items-start gap-2 sm:grid-cols-2">
            {books &&
              books.map((book: Tables<'book'>) => (
                <Stock
                  key={book.id}
                  isbn={book.id}
                  title={book.name}
                  thumbnail={book.thumbnail}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
