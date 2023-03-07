import React from 'react'
import { Link } from 'react-router-dom'

function SideNavbar() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to={'/admin/articles'}>Articles</Link></li>
          <li><Link to={'/admin/new-article'}>New article</Link></li>
          <li><Link to={'/admin/categories'}>Categories</Link></li>
          <li><Link to={'/admin/images'}>Images</Link></li>
          <li><Link to={'/admin/links'}>Links</Link></li>
          <li><Link to={'/admin/settings'}>Settings</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNavbar