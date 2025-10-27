import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import ClassTopicsPage from './ClassTopicsPage'

const ClassTopics: React.FC = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6">
        <ClassTopicsPage />
      </div>
    </AdminLayout>
  )
}

export default ClassTopics
