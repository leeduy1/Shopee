import { describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg3ZGYyNmQ3YzYyMDM0MDg1NzJkMyIsImVtYWlsIjoiZHV5M0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTA2VDA0OjE4OjQ5LjMyNloiLCJpYXQiOjE2ODA3NTQ3MjksImV4cCI6MTY4MDc1NDczNH0.cnsXmNqwKg9H617ggx08PeKIFjXVzr1-V2k3048k4FE'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg3ZGYyNmQ3YzYyMDM0MDg1NzJkMyIsImVtYWlsIjoiZHV5M0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTA2VDA0OjE4OjQ5LjMyNloiLCJpYXQiOjE2ODA3NTQ3MjksImV4cCI6MTY4MDc1ODMyOX0.AcejBjsmQrKdI4ZOcygvpDHlPqlgIZq8Rk-ArI8xF-g'

const profile =
  '{"_id":"64287df26d7c6203408572d3","roles":["User"],"email":"duy3@gmail.com","createdAt":"2023-04-01T18:54:42.430Z","updatedAt":"2023-04-04T08:58:38.675Z","__v":0,"avatar":"7708e481-ef11-47d8-b1a6-379672b22bb1.png","date_of_birth":"1989-12-31T17:00:00.000Z","name":"Lê Văn Duy "}'

describe('setAccessTokenToLS', () => {
  it('access_token được xét vào localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('refresh_token được xét vào localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
  })
})

describe('getAccessTokenFromLS', () => {
  it('Lấy access_token trong localStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('getRefreshTokenFromLS', () => {
  it('Lấy refresh_token trong localStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('clearLS', () => {
  it('xóa hết access_token, refresh_token, profile', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    // setProfile tại đây
    // ...
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
    expect(getAccessTokenFromLS()).toBe('')
  })
})
