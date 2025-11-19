import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuBar from '../components/MenuBar.jsx'
import TeacherHeader from '../components/TeacherHeader.jsx'

export default function TeacherLayout(){
  return (
    <div className="d-flex">
      <MenuBar />
      <div className="flex-grow-1">
        <TeacherHeader />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
