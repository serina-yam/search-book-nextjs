import { Account, Stock, Like } from './supabase'
import supabase from '@/lib/supabase'

// データの全取得
export const getData = async (
  tableName : string
  ): Promise<void> => {
    const { data: allData, error } = await supabase
    .from(tableName)
    .select("*");

  if (error) {
    alert(error.message);
    return;
  }
}

// add account table
export const addAccount = async (
  name : string
  , last_login_time : Date
): Promise<void> => {
  const { data: likeData, error } = await supabase
    .from("account")
    .insert([{ name: name }])
    .select("*");

  if (error) {
    alert(error.message);
    return;
  }
}

// add stock table
export const addStock = async (
  user_id : string
  , isbn : string
): Promise<void> => {
  const { data: likeData, error } = await supabase
    .from("stock")
    .insert([{ isbn: isbn }])
    .select("*");

  if (error) {
    alert(error.message);
    return;
  }
}

// add like table
export const addLike = async (
  id: string,
  isbn: string,
  // data: Todopractice[] | null,
  // setData: React.Dispatch<React.SetStateAction<Todopractice[] | null>>
): Promise<void> => {
  const { data: likeData, error } = await supabase
    .from("like")
    .insert([{ isbn: isbn }])
    .select("*");

  // const todos = todoData as Todopractice[] | null;

  if (error) {
    alert(error.message);
    return;
  }

  // if (!todos) return;

  // setData([
  //   ...data!,
  //   {
  //     id: todos[todos.length - 1].id,
  //     title: taskTitle,
  //     status: false,
  //     created_at: todos[todos.length - 1].created_at,
  //   },
  // ]);
};

// add stock table
// あれば更新, なければ追加
export const addBook = async (
  user_id : string
  , isbn : string
): Promise<void> => {
  const { data: likeData, error } = await supabase
    .from("stock")
    .upsert([{ isbn: isbn }])
    .select("*");

  if (error) {
    alert(error.message);
    return;
  }
}

