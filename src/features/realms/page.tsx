import React from 'react'
import AdminLayout from '../../components/AdminLayout'
// import MainContent from '../../components/layout/MainContent'
import RealmsPage from './pages/RealmsPage'

const Realms: React.FC = () => {
    return (
        <AdminLayout>
            <div className="w-full p-6">

                <RealmsPage />
            </div>

        </AdminLayout>
    )
}

export default Realms

