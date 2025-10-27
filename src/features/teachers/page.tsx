import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import TeachersList from './components/TeachersList'

const TeachersPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6">
        <TeachersList />
      </div>
    </AdminLayout>
  )
}

export default TeachersPage
