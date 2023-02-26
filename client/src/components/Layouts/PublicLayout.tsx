import React from 'react'
import PublicFooter from '../PublicFooter'
import PublicHeader from '../PublicHeader'

type Props = {
    children?: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children = null }) => {
    return (
        <>
            <PublicHeader />
            <main className='container'>{children}</main>
            <PublicFooter />
        </>
    )
}

export default PublicLayout;