import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

export default function UserLayout() {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}
