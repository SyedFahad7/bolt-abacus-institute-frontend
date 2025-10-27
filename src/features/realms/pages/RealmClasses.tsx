import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import RealmClassesPage from './RealmClassesPage'

const RealmClasses: React.FC = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6">
        <RealmClassesPage />
      </div>
    </AdminLayout>
  )
}

export default RealmClasses
