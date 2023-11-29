import supabase from '@/lib/supabase'

/**
 * select * from stock where user_id = #{user_id}
 * @param user_id
 * @returns
 */
export const getAccount = async (id: number) => {
  const { data } = await supabase.from('account').select('*').eq('id', id).single()

  return data
}

/**
 * add account table
 * @param name
 * @param last_login_time
 */
export const addAccount = async (id: number, name: string) => {
  // TODO +9hで登録されるようにする
  const lastLoginTime = new Date().toISOString()

  const { data, error } = await supabase
    .from('account')
    .upsert([{ id: id, name: name, last_login_time: lastLoginTime }])
    .select('*')

  if (error) {
    alert(error.message)
  }

  return data
}
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
export const getStock = async (user_id: number, isbn: string) => {
  const { data: stockData } = await supabase.from('stock').select('*').eq('user_id', user_id).eq('isbn', isbn)

  return stockData
}

/**
 *
 * @param user_id
 * @param isbn
 * @returns
 */
export const addStock = async (user_id: number, isbn: string) => {
  const { error } = await supabase.from('stock').insert([{ user_id: user_id, isbn: isbn }])
  return error
}

/**
 *
 * @param user_id
 * @param isbn
 * @returns
 */
export const deleteStock = async (user_id: number, isbn: string) => {
  const { error } = await supabase.from('stock').delete().eq('user_id', user_id).eq('isbn', isbn)
  return error
}

export const getLike = async (user_id: number, isbn: string) => {
  const { data: stockData } = await supabase.from('like').select('*').eq('user_id', user_id).eq('isbn', isbn)

  return stockData
}

/**
 *
 * @param user_id
 * @param isbn
 * @returns
 */
export const addLike = async (user_id: number, isbn: string) => {
  const { error } = await supabase.from('like').insert([{ user_id: user_id, isbn: isbn }])
  return error
}

/**
 *
 * @param user_id
 * @param isbn
 * @returns
 */
export const deleteLike = async (user_id: number, isbn: string) => {
  const { data } = await supabase.from('like').delete().eq('user_id', user_id).eq('isbn', isbn).select('*')
  return data
}

/**
 *
 * @param isbn
 * @returns
 */
export const getBook = async (isbn: string) => {
  const { data: bookData, error } = await supabase.from('book').select('*').eq('id', isbn).single()

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
  isbn: string,
  name: string,
  thumbnail: string,
  publisher: string,
  publishedDate: string,
  pageCount: number,
  description: string
  ): Promise<void> => {
  const { data: likeData, error } = await supabase
    .from('book')
    .insert([
      { id: isbn,
        name: name,
        thumbnail: thumbnail,
        publisher:publisher,
        published_date: publishedDate,
        page: pageCount,
        description: description
       }
    ])
    .select('*')

  if (error) {
    alert(error.message)
    return
  }
}
