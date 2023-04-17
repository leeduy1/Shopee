import { describe, expect, it, beforeEach } from 'vitest'
import { Http } from '../http'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg3ZGYyNmQ3YzYyMDM0MDg1NzJkMyIsImVtYWlsIjoiZHV5M0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTA2VDA4OjMwOjExLjAxMVoiLCJpYXQiOjE2ODA3Njk4MTEsImV4cCI6MTY4MDc2OTgxMn0.AIcHbBFxcfCPAIQMTDCMzoc5D6doMRoQwSGKUzX4KZw'
  const refresh_token_1000day =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg3ZGYyNmQ3YzYyMDM0MDg1NzJkMyIsImVtYWlsIjoiZHV5M0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTA2VDA4OjM0OjQxLjI3NVoiLCJpYXQiOjE2ODA3NzAwODEsImV4cCI6MTc2NzE3MDA4MX0.8RJpXKB1wgRmFahlWV-xWwOXEHppNPLy9trinoEsQq0'
  it('Gọi API', async () => {
    // Không nên đụng đến thư mục apis
    // Vì chúng ta test riêng file http thì chỉ nên dùng http thôi
    // vì lỡ như thư mục apis thay đổi gì đó
    // thì cũng ko ảnh hưởng gì đến file test này
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    // Nên có 1 account test
    // và
    await http.post('login', {
      email: 'duy3@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000day)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
