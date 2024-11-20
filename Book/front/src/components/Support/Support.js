import React from "react";
import { Link,Route,Routes } from "react-router-dom";
import SupportRead from "./SupportRead";
import SupportWrite from "./SupportWrite";
import SupportSearch from "./SupportSearch";

const Support = () =>{
    return(
    <div>
        <h1>고객센터</h1>
            <Routes>
                <Route path = "/" element = {<SupportSearch/>}></Route>
                <Route path = "/write" element = {<SupportWrite/>}></Route>
                <Route path = "/read/:id" element = {<SupportRead/>}></Route>
            </Routes>
    </div>
)}
export default Support;