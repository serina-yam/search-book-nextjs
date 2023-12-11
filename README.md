<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->


# Search Book / 本ストックサービス


![service-image](https://github.com/serina-yam/search-book-nextjs/assets/64587946/27466d40-417d-4493-a24a-45aa06dc6cd6)
[![CI/CD](https://github.com/serina-yam/search-book-nextjs/actions/workflows/build-and-test-on-push.yml/badge.svg?branch=main)](https://github.com/serina-yam/search-book-nextjs/actions/workflows/build-and-test-on-push.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.5-007ACC?logo=TypeScript&logoColor=007ACC)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html)
[![React](https://img.shields.io/badge/React-v18.0-61DAFB?logo=React&logoColor=61DAFB)](https://react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18)
[![Next.js](https://img.shields.io/badge/Next.js-v14.0.2-000000?logo=Next.js&logoColor=000000)](https://nextjs.org/blog/next-14)
[![AWS](https://img.shields.io/badge/Amazon%20AWS-gray?logo=Amazon-AWS&logoColor=FFFFFF)](https://aws.amazon.com)

## サービス概要
読みたい本や気になる本を検索して本棚にストックしておけるサービスです。

## サービスURL
https://main.d1h9h0rr432r2c.amplifyapp.com/


## 使用技術一覧

**フロントエンド・バックエンド:** TypeScript 4.9.5 / React 18.0 / Next.js 14.0.2

- コード解析: ESLint
- フォーマッター: Prettier
- テストフレームワーク: Jest / React Testing Library
- CSSフレームワーク: Tailwind CSS
- 主要パッケージ: Axios / lucide / nextui / supabase/auth-helpers-nextjs / supabase/supabase-js

**DB:** Supabase

**インフラ:** AWS Amplify

**CI / CD:** GitHub Actions

**認証:** Supabase


## 主要対応一覧
### 機能

<!--
- メールアドレスとパスワードを利用したユーザー登録 / ログイン機能 
- ユーザー情報変更機能
- パスワード再設定機能
- 退会機能
-->
- GitHubアカウントを利用したユーザー登録 / ログイン機能
- ストックの取得 / 追加 / 削除機能
- 本の検索機能

### 画面

- 検索画面
- ポップアップ画面
- 詳細画面
- マイページ画面
- 404 / 500エラーのカスタム画面
- レスポンシブデザイン

### システム / インフラ

- Next.jsのImage / Linkコンポーネントなどの活用によるサービス全体の高速化
- GitHub ActionsによるCI / CDパイプラインの構築

## インフラ構成図

## ER図
![ER](https://github.com/serina-yam/search-book-nextjs/assets/64587946/e9fee8bc-e3ab-4fb8-8684-fcf8eb97df89)

## 画面遷移図
[Figma 画面遷移図](https://www.figma.com/file/TgaTiiwpM5eXJYn1lMzXv8/%E5%9B%B3%E6%9B%B8%E9%A4%A8%E6%9C%AC%E6%A4%9C%E7%B4%A2%E3%82%B5%E3%82%A4%E3%83%88?type=design&node-id=37%3A186&mode=design&t=vQTx6gS1RFQaDDOB-1)

## 今後追加予定の機能
現在、GitHubでしかログインできないため、メールアドレスとパスワードでログイン可能にする機能を追加する予定です。

- ログイン画面の作成
- サインアップ機能の実装
- ログイン方法にGoogle認証を追加
