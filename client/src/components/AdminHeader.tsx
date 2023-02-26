import { Link } from "react-router-dom"

function Adminheader() {
    return (
        <header>
            <div className="container">
                <nav>
                    <ul role='menu'>
                        <li><Link to='/admin'>Dashboard</Link></li>
                        <li><Link to='/'>Public page</Link></li>
                        <li><Link to='/logout'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Adminheader