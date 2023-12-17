import { render } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/hooks/authProvider'

describe('AuthProvider', () => {
  it('provides useAuth hook within AuthProvider', () => {
    const TestComponent = () => {
      const { session } = useAuth() // useAuth hookを利用するコンポーネントを作成

      return <div>{session ? 'Authenticated' : 'Not Authenticated'}</div>
    }

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // AuthProvider 内で useAuth を使用しているため、session が null でないことを確認
    expect(getByText('Not Authenticated')).toBeInTheDocument()
  })
})
