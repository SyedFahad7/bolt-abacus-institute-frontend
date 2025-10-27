import React from 'react'
import AdminLayout from '../../components/AdminLayout'
// import MainContent from '../../components/layout/MainContent'
import BatchesList from './components/BatchesList'

const BatchesPage: React.FC = () => {
    return (
        <AdminLayout>
            <div className="w-full p-6">

                <BatchesList />

            </div>
        </AdminLayout>
    )
}

export default BatchesPage
