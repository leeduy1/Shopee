import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'
expect.extend(matchers)

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter()
    // waitFor sẽ run callback 1 vài lần
    // cho đến khi hết timeout hoặc expect pass
    // số lần run phụ thuộc vào timeout và interval
    // mặc định: timeout = 1000ms và interval = 50ms\

    // verify vào đúng trang chủ
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
      },
      { timeout: 3000 }
    )

    // Vefify chuyển sang trang login
    await user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })

  test('Về trang not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
    // await waitFor(() => {
    //   expect(true).toBe(false)
    // })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
    // await logScreen()
  })

  test('Render trang register', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
    })
  })
})
