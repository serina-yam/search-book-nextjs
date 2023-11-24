import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'

export default function Stock({
  isbn,
  title,
  thumbnail,
  shelfCount,
  likeCount,
}: {
  isbn: string
  title: string | null
  thumbnail: string | null
  shelfCount: number | null
  likeCount: number | null
}) {
  return (
    <>
      <Card className="h-full cursor-pointer rounded-xl bg-slate-50	 py-4">
        <CardBody className="items-center overflow-visible py-2">
          <Image alt={title} className="rounded-xl object-cover shadow-lg" src={thumbnail} width={128} />
        </CardBody>
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <div>ISBN:{isbn}</div>
          <div>Title:{title}</div>
          <div>Stock:{shelfCount ? shelfCount : 0}</div>
          <div>Like:{likeCount ? likeCount : 0}</div>
        </CardFooter>
      </Card>
    </>
  )
}
