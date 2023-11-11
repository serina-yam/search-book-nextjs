import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import BookCardInfo from '@/components/bookCardInfo'

export default function BookCard({
  id,
  title,
  isbn10,
  isbn13,
  description,
  publishedDate,
  averageRating,
  authors,
  infoLink,
  pageCount,
  thumbnail,
  previewLink,
  price,
  publisher,
  availability,
}: {
  id: string
  title: string
  isbn10: string
  isbn13: string
  previewLink: string
  cover_image?: string
  description: string
  publishedDate: string
  averageRating: number
  authors: string[]
  infoLink: string
  pageCount: number
  thumbnail: string
  language?: string
  price?: number
  publisher?: string
  availability?: string
}) {
  return (
    <>
      <Popover placement="right" backdrop="opaque" className="max-w-lg">
        <PopoverTrigger>
          <Card className="py-4 capitalize cursor-pointer">
            <CardBody className="overflow-visible py-2">
              <Image alt={title} className="object-cover rounded-xl shadow-lg" src={thumbnail} width={270} />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{title}</p>
              {/* {libraryInfo.map((info) => (
                <small key={info.library} className="text-default-500">{info.library}:{info.state}</small>
                ))} */}
            </CardFooter>
          </Card>
        </PopoverTrigger>
        <PopoverContent>
          <BookCardInfo
            key={id}
            id={id}
            title={title}
            isbn10={isbn10}
            isbn13={isbn13}
            previewLink={previewLink}
            cover_image={thumbnail}
            description={description}
            publishedDate={publishedDate}
            averageRating={averageRating}
            authors={authors}
            infoLink={infoLink}
            pageCount={pageCount}
            thumbnail={thumbnail}
            price={price}
            publisher={publisher}
            availability={availability}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
