import { screen, waitFor, fireEvent } from '@testing-library/react'
import path from 'src/constants/path'
import { renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

describe('Login', () => {
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
  })
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    fireEvent.submit(submitButton)
    waitFor(async () => {
      expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
      expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    })
  })

  it('Hiển thị lỗi required khi nhập sai định dạng', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const PasswordInput = document.querySelector('form button[type="password"]') as HTMLInputElement

    fireEvent.change(emailInput, {
      target: {
        value: 'test@mail'
      }
    })
    fireEvent.change(PasswordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.click(submitButton)
    expect(await screen.findByText('Email không đúng định dạng')).toBeTruthy()
    expect(await screen.findByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
  })
})

// import { screen, waitFor, fireEvent } from '@testing-library/react'
// import path from 'src/constants/path'
// import { renderWithRouter } from 'src/utils/testUtils'
// import { beforeAll, describe, expect, it } from 'vitest'

// describe('Login', () => {
//   let emailInput: HTMLInputElement
//   let passwordInput: HTMLInputElement
//   let submitButton: HTMLButtonElement
//   beforeAll(async () => {
//     renderWithRouter({ route: path.login })
//     await waitFor(() => {
//       expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
//     })
//     emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
//     passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
//     submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
//   })
//   it('Hiển thị lỗi required khi không nhập gì', async () => {
//     fireEvent.submit(submitButton)
//     await waitFor(() => {
//       expect(screen.queryByText('Email là bắt buộc')).toBeTruthy()
//       expect(screen.queryByText('Password là bắt buộc')).toBeTruthy()
//     })
//   })
//   it('Hiển thị lỗi khi nhập value input sai', async () => {
//     fireEvent.change(emailInput, {
//       target: {
//         value: 'test@mail'
//       }
//     })
//     fireEvent.change(passwordInput, {
//       target: {
//         value: '123'
//       }
//     })
//     fireEvent.submit(submitButton)
//     await waitFor(() => {
//       expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
//       expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
//     })
//   })

//   it('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
//     fireEvent.change(emailInput, {
//       target: {
//         value: 'd3@gmail.com'
//       }
//     })
//     fireEvent.change(passwordInput, {
//       target: {
//         value: 'useruser'
//       }
//     })
//     // Những trường hợp chứng minh rằng tìm không ra text hay là element
//     // Thì nên dùng query hơn là find hay get
//     await waitFor(() => {
//       expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
//       expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy()
//     })
//     fireEvent.submit(submitButton)
//     await waitFor(() => {
//       expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
//     })
//     // console.log(await screen.findByText('Email không đúng định dạng'))
//   })
// })
