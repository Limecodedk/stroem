import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <>
      <div className="AdminlayoutContainer">
        <AdminSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout