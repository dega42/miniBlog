import React from 'react'
import PublicFooter from '../PublicFooter'
import PublicHeader from '../PublicHeader'
import Tags from '../Tags'

type Props = {
    children?: React.ReactNode
}

const PublicLayout: React.FC<Props> = ({ children = null }) => {
    return (
        <>
            <PublicHeader />
            <div className="container container-wrapper">
                <main>{children}</main>
                <aside>
                    <Tags />
                </aside>
            </div>
            <PublicFooter />
        </>
    )
}

export default PublicLayout;