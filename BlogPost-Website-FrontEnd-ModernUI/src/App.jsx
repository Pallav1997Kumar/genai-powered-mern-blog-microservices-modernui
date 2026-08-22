import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop.js";
import NavBar from "./components/fixed component/NavBar.jsx";
import Footer from "./components/fixed component/Footer.jsx";

import ContactUsPage from './pages/ContactUsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DeletedAccountPage from './pages/DeletedAccountPage.jsx';
import AllBlogsPage from './pages/AllBlogsPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import UpdateBlogPostPage from './pages/UpdateBlogPostPage.jsx';
import SingleBlogPostPage from './pages/SingleBlogPostPage.jsx';
import WriteBlogPostPage from './pages/WriteBlogPostPage.jsx';
import EditProfilePage from './pages/EditProfilePage.jsx';
import AllBlogsHomePage from './pages/AllBlogsHomePage.jsx';
import WhatIsBlogPage from './pages/WhatIsBlogPage.jsx';
import BlogSearchPage from './pages/BlogSearchPage.jsx';


/*const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/blogs",
    element: <AllBlogs />,
  }
]);*/

function App() {
  return (
    <div>
       <BrowserRouter>
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/accountDeleted" element={<DeletedAccountPage />} />
            <Route path="/blogs" element={<AllBlogsPage />} />
            <Route path="/blogsHome" element={<AllBlogsHomePage />} />
            <Route path="/blogs/updatePost/postId/:postID" element={<UpdateBlogPostPage />} />
            <Route path="/blogs/postId/:postID" element={<SingleBlogPostPage />} />
            <Route path="/blogs/category/:categoryName" element={<AllBlogsPage />} />
            <Route path="/blogs/username/:username" element={<AllBlogsPage />} />
            <Route path="/write" element={<WriteBlogPostPage />} />
            <Route path="/blogSearch" element={<BlogSearchPage />} />
            <Route path="/edit_profile/:username" element={<EditProfilePage />} />
            <Route path ="/what_is_blog" element={<WhatIsBlogPage />} />
          </Routes>
          <Footer />
       </BrowserRouter>
    </div>
  );
}

export default App;
