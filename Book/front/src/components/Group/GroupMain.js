import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import {UserContext} from '../../UserContext';
import GroupList from "./GroupList";
import GroupInfo from "./GroupInfo";
import ContentWrite from "../Plan/ContentWrite";
import GroupManage from "./GroupManage";

const GroupMain = () => {

    return (
            <div className="group-container">
                <Routes>
                    <Route path="/" element={<GroupList/>}/>
                    <Route path="/info/:groupId" element={<GroupInfo/>}/>
                    <Route path="/plan/content/write/*"element={<ContentWrite/>}/>
                    <Route path="/manage/:groupId"element={<GroupManage/>}/>
                </Routes>
            </div>
    )
}
export default GroupMain;
