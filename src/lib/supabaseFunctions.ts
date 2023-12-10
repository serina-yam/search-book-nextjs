import supabase from '@/lib/supabase'

/**
 * select * from stock where user_id = #{user_id}
 * @param user_id
 * @returns
 */
export const getStockByUserId = async (user_id: number) => {
  const { data: stockData } = await supabase.from('stock').select('*').eq('user_id', user_id)

  return stockData
}

/**
 * select * from stock where user_id = #{user_id} and isbn = #{isbn}
 * @param user_id
 * @param isbn
 * @returns
 */
export const getStock = async (user_id: number, id: string) => {
  const { data: stockData } = await supabase.from('stock').select('*').eq('user_id', user_id).eq('book_id', id)

  return stockData
}

/**
 *
 * @param user_id
 * @param isbn
 * @returns
 */
export const addStock = async (user_id: number, id: string, industryIdentifier: string) => {
  const { error } = await supabase.from('stock').insert([{ user_id: user_id, book_id: id, industryIdentifier: industryIdentifier }])
  return error
}

/**
 *
 * @param user_id
 * @param id
 * @returns
 */
export const deleteStock = async (user_id: number, id: string) => {
  const { error } = await supabase.from('stock').delete().eq('user_id', user_id).eq('book_id', id)
  return error
}

/**
 *
 * @param isbn
 * @returns
 */
export const getBook = async (id: string) => {
  const { data: bookData, error } = await supabase.from('book').select('*').eq('id', id).single()

  return bookData
}

/**
 * あれば更新, なければ追加
 * @param isbn
 * @param name
 * @param thumbnail
 * @returns
 */
export const addBook = async (
  id: string,
  industryIdentifier: string | null,
  isbn10: string | null,
  isbn13: string | null,
  name: string,
  thumbnail: string,
  publisher: string,
  publishedDate: string,
  pageCount: number,
  description: string,
  author: string | null
  ): Promise<void> => {
  const { error } = await supabase
    .from('book')
    .upsert([
      { id: id,
        industryIdentifier: industryIdentifier,
        isbn10: isbn10,
        isbn13: isbn13,
        name: name,
        thumbnail: thumbnail,
        publisher:publisher,
        published_date: publishedDate,
        page: pageCount,
        description: description,
        author: author
       }
    ])
    .select('*')

  if (error) {
    alert(error.message)
    return
  }
}
