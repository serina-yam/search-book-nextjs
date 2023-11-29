'use client'

import { Image } from '@nextui-org/react'
import Layout from './layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'

export default function Book({ params }: { params: { slug: string } }) {
  return (
    <Layout>
      <NavigationBar />
      <div className="mt-12 h-full rounded-xl bg-slate-50 p-12">
        <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <div className="flex items-center justify-center">
            <div className="w-1/3">
              <Image
                alt="自転しながら公転する"
                className="rounded-xl object-cover shadow-lg"
                src="http://books.google.com/books/content?id=8Nj6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                width={200}
              />
            </div>
            <div>
              <h2>自転しながら公転する</h2>
              <dl>
                <dt>ISBN</dt>
                <dd>PKEY:BT000084187700100101900209 (OTHER)</dd>
              </dl>
              <dl>
                <dt>出版社</dt>
                <dd>新潮</dd>
              </dl>
              <dl>
                <dt>発売日</dt>
                <dd>2020-09-28</dd>
              </dl>
              <dl>
                <dt>ページ数</dt>
                <dd>358</dd>
              </dl>
            </div>
          </div>
          <div className="mt-12">
            東京のアパレルで働いていた都は母親の看病のため茨城の実家に戻り、地元のアウトレットのショップで店員として働き始めるが、職場ではセクハラなど問題続出、実家では両親共に体調を崩してしまい……。恋愛、家族の世話、そのうえ仕事もがんばるなんて、そんなこと無理！　ぐるぐる思い惑う都の人生の選択から目が離せない、共感度100％小説。
          </div>
        </div>
      </div>
    </Layout>
  )
}
