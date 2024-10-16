import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindID from './components/FindID/FindID';
import HOME from './components/Home/home';
import Login from './components/Login/login';
import MainBanner from './components/MainBanner/mainbanner';
import Membership from './components/Membership/membership';
import Mypage from './components/Mypage/mypage';
import FindPWD from './components/FindID/FindPWD';

const App = () => {
    return (
        <Router>
            <MainBanner />
            <Routes>
                <Route path="/findID" element={<FindID />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HOME/>} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/mypage/*" element={<Mypage />} />
                <Route path="/findpwd" element={<FindPWD />} />
            </Routes>
        </Router>
    );
};

export default App;
