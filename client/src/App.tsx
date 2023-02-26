import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import About from './components/Pages/Public/About';
import Article from './components/Pages/Public/Article';
import ArticleList from './components/Pages/Admin/ArticleList';
import Articles from './components/Pages/Public/Articles';
import Contact from './components/Pages/Public/Contact';
import Home from './components/Pages/Public/Home';
import NewArticle from './components/Pages/Admin/NewArticle';
import NoPage from './components/NoPage';

import Admin from './components/Pages/Admin/Dashboard'
import EditArticle from './components/Pages/Admin/EditArticle';
import Categories from './components/Pages/Admin/Categories';
import Settings from './components/Pages/Admin/Settings';
import Images from './components/Pages/Admin/Images';
import Links from './components/Pages/Admin/Links';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/category/:categorySlug" element={<Articles />} />
          <Route path="/blog/tag/:tagSlug" element={<Articles />} />
          <Route path="/search/:searchTerm" element={<Articles />} />
          <Route path="/blog/:categorySlug/:articleSlug" element={<Article />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/articles" element={<ArticleList />} />
          <Route path="/admin/new-article" element={<NewArticle />} />
          <Route path="/admin/edit/:articleSlug" element={<EditArticle />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/images" element={<Images />} />
          <Route path="/admin/links" element={<Links />} />
          <Route path="/admin/settings" element={<Settings />} />

          <Route path="/*" element={<NoPage />} />
          {/* <Route path="/" element={<PublicLayout children={undefined} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog">
              <Route path=":category" element={<Articles />} />
              <Route path=":category/:articleSlug" element={<Article />} />

            </Route>
            <Route path="*" element={<NoPage />} />
          </Route> */}
          {/* <Route path='/admin' element={<AdminLayout children={undefined} />}>
            <Route index element={<Dashboard />} />
            <Route path="new-article" element={<NewArticle />} />
            <Route path="articles" element={<ArticleList />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
