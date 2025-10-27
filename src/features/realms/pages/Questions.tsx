import React from 'react'
import AdminLayout from '../../../components/AdminLayout'
import QuestionsPage from './QuestionsPage'

const Questions: React.FC = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6">
        <QuestionsPage />
      </div>
    </AdminLayout>
  )
}

export default Questions
