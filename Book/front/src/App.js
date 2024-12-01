import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindID from './components/FindID/FindID';
import HOME from './components/Home/home';
import Login from './components/Login/login';
import Header from './components/Banner/header';
import Footer from './components/Banner/footer';
import Membership from './components/Membership/membership';
import Mypage from './components/Mypage/mypage';
import FindPWD from './components/FindID/FindPWD';
import BookDetail from './components/BookDetail/BookDetail';
import Classification from './components/Classification/Classification';
import BookInfo from './components/BookInfo/BookInfo';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Purchase from './components/Purchase/Purchase';
import Subscribe from './components/Subscribe/Subscribe';
import Support from './components/Support/Support';
import {UserProvider} from './UserContext';
import GroupMain from './components/Group/GroupMain';
import FileViewer from './components/FileViewer/FileViewer'

const App = () => {
return(
    <UserProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/findID" element={<FindID />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HOME/>} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/mypage/*" element={<Mypage />} />
                <Route path="/findpwd" element={<FindPWD />} />
                <Route path="/detail" element={<BookDetail />} />
                <Route path="/classification" element={<Classification />} />
2024.                <Route path="/book/:id" element={<BookInfo />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/support/*" element={<Support />} />
                <Route path="/group/*" element={<GroupMain />} />
                <Route path="/view/:bookid" element={<FileViewer/>}/>
            </Routes>
            <Footer />
        </Router>
    </UserProvider>
    );
};

export default App;
