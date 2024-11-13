import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import BookListing from './pages/BookListing';
import AddBookForm from './components/AddBookForm';
import SearchBooks from './pages/SearchBooks';
import AllBooksList from './components/AllBooksList';
import ExchangeRequests from './pages/ExchangeRequests';
import CreateExchangeRequest from './components/CreateExchangeRequest';
import AcceptExchangeRequest from './components/AcceptExchangeRequest';
const App = () => {
    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<BookListing />} />
                <Route path="/books/add" element={<AddBookForm/>}/>
                <Route path="/books/search" element={<SearchBooks />} />
                <Route path="/all-books" element={<AllBooksList />} />
                <Route path="/create-exchange" element={<CreateExchangeRequest />} />
                <Route path="/exchange-requests" element={<ExchangeRequests />} />
                <Route path="/accept-exchange" element={<AcceptExchangeRequest />} />
            </Routes>
        </Router>
    );
};

export default App;


