'use client'
import Layout from '@/app/layout'
import NavigationBar from '@/components/navigationBar'
import utilStyles from '@/styles/utils.module.css'



// TODO エラー画面デザインする
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Layout>
      <NavigationBar />
      <main>
        <div className={utilStyles.headingMd}>
          <div className={utilStyles.container}>
            <h2>Something went wrong!</h2>
            <button className='cursor-pointer' onClick={() => reset()}>Try again</button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
