'use client'

import { Card, CardBody, Image, CardFooter, CardHeader, useDisclosure } from '@nextui-org/react'
import { BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import AlertModal from './alertModal'
import { useAuth } from '@/hooks/authProvider'
import { addBook, addStock, deleteStock, getBook } from '@/lib/supabaseFunctions'

export default function Stock({
  isbn,
  title,
  thumbnail,
  publisher,
  publishedDate,
  pageCount,
  description
}: {
  isbn: string
  title: string | null
  thumbnail: string | null
  publisher: string | null
  publishedDate: string | null
  pageCount: number | null
  description: string | null
}) {
  const [stock, setStock] = useState(false)
  const submitStockProcessing = useRef(false)

  const profileFromGithub = useAuth()?.profileFromGithub
  const userId: number = profileFromGithub?.id ?? 0;
  const [isbnState, setIsbnState] = useState(isbn)
  const [modalOpen, setModalOpen] = useState(false)

  const onDeleteStock = () => {
    if (userId === 0) return
    // 連続送信中止
    if (submitStockProcessing.current) return
    submitStockProcessing.current = true

    deleteStock(userId, isbnState)
      .then(() => {
        setStock(false)
        submitStockProcessing.current = false
        setModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
        setStock(false)
        submitStockProcessing.current = false
        setModalOpen(false)
        window.location.reload()
      })
  }

  const handleDelete = () => {
    if (userId === 0 || !userId || !isbnState) return setModalOpen(false) // 必要な情報がない場合は処理しない
    onDeleteStock()
  }

  return (
    <>
      <Card className="h-full cursor-pointer rounded-xl bg-slate-50 py-4">
        <CardHeader className="flex justify-end pr-7">
          <button
            onClick={() => {
              setIsbnState(isbn)
              setModalOpen(true)
            }}
          >
            <BookmarkCheck color="#eb4667" />
          </button>
        </CardHeader>
        <Link href={`/books/${isbn}`} className="flex">
          <CardBody className="items-center overflow-visible py-2">
            <Image alt={title} className="rounded-xl object-cover shadow-lg" src={thumbnail} width={128} />
          </CardBody>
          <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
            <div>ISBN:{isbn}</div>
            <div>Title:{title}</div>
          </CardFooter>
        </Link>
      </Card>
      <AlertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        userId={userId}
        isbn={isbn}
      />
    </>
  )
}
