import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import InstitutesList from './components/InstitutesList'

const InstitutesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6">
        <InstitutesList />
      </div>
    </AdminLayout>
  )
}

export default InstitutesPage
