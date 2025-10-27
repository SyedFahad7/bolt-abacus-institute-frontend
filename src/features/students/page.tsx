import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import StudentsPage from './components/page'

const StudentsIndex: React.FC = () => {
  return (
    <AdminLayout>
      <StudentsPage />
    </AdminLayout>
  )
}

export default StudentsIndex
