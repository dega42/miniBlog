import React from 'react'
import AdminHeader from '../AdminHeader'
import AdminFooter from '../AdminFooter'
import SideNavbar from '../SideNavbar'

type Props = {
    children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <div className="container container-wrapper" style={{gridTemplateColumns: '1fr 2fr'}}>
                <aside><SideNavbar /></aside>
                <main>{children}</main>
            </div>
            <AdminFooter />
        </>
    )
}

export default AdminLayout;