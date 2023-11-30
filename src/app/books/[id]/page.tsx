'use client'

import { Image } from '@nextui-org/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import { Tables } from '@/lib/supabase'
import { getBook } from '@/lib/supabaseFunctions'
import utilStyles from '@/styles/utils.module.css'

export default function BookPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Tables<'book'>>()
  const isbn = params.id;

  useEffect(() => {
    const fetchBook = async () => {
      getBook(isbn).then((bookData) => {
        if (bookData) {
          setBook(bookData)
        } else {
          // DBになかったらAPIから取得
          // searchBooksByTitle()
        }
      })
    }

    fetchBook()
  }, [isbn])

  const searchBooksByTitle = async (title: string) => {
    try {
      if (title.length === 0) {
        return []
      }
      const response = await axios.get(`${'https://www.googleapis.com/books/v1/volumes'}?q=${title}`)
      return response.data.items
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <NavigationBar />
      <div className="mt-12 h-full rounded-xl bg-slate-50 p-12">
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="flex flex-col items-center justify-center sm:flex-row">
            <div className="flex w-full justify-center sm:w-1/3">
              <Image
                alt="自転しながら公転する"
                className="rounded-xl object-cover shadow-lg"
                src={book?.thumbnail}
                width={200}
              />
            </div>
            <div>
              <h2>{book?.name}</h2>
              <dl className="flex">
                <dt className="w-32">ISBN</dt>
                <dd>{book?.id}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">出版社</dt>
                <dd>{book?.publisher}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">発売日</dt>
                <dd>{book?.published_date}</dd>
              </dl>
              <dl className="flex">
                <dt className="w-32">ページ数</dt>
                <dd>{book?.page == null || book?.page === 0 ? '' : book?.page}</dd>
              </dl>
            </div>
          </div>
          <div className="mt-12">
            {book?.description}
          </div>
        </div>
      </div>
    </Layout>
  )
}
