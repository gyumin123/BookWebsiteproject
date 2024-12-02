import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import {UserContext} from '../../UserContext';
import './GroupList.css'
import MenuToggle from "./MenuToggle";
import GroupCreation from "./GroupCreation";

const GroupList = () => {
    const {userid} = useContext(UserContext);
    const [create,setCreate] = useState(false)
    const [groupOption,setGroupOption] = useState("total");
      return (
        <div class="group-container">
            <div class="group-header">
                <div class="group-option">
                    <span className={`tab ${groupOption === "total" ? "active" : ""}`}
                          onClick={() => setGroupOption("total")}>전체</span>
                    {userid != null &&
                        <span className={`tab ${groupOption === "user" ? "active" : ""}`}
                              onClick={() => setGroupOption("user")}>내 그룹</span>
                    }
                    {
                        userid != null &&
                        <span className="action" onClick={() => setCreate(true)}>+ 그룹 추가하기</span>
                    }
                    {
                        create &&
                        <GroupCreation/>
                    }
                </div>
            </div>
            {
                groupOption == "total" &&
            (
              <div className="group-content">
                <MenuToggle userid={null} state={0}></MenuToggle>
                <MenuToggle userid={null} state={1}></MenuToggle>
                <MenuToggle userid={null} state={2}></MenuToggle>
              </div>
            )
          }
          {
            groupOption == "user" &&
            (
              <div className="group-content">
                <MenuToggle userid={userid} state={0}></MenuToggle>
                <MenuToggle userid={userid} state={1}></MenuToggle>
                <MenuToggle userid={userid} state={2}></MenuToggle>
              </div>
            )
          }
        </div>
      );
}
export default GroupList;
