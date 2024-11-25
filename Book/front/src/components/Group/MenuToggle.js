import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import {UserContext} from '../../UserContext';
import GroupToggle from "./GroupToggle";
import './Toggle_bar.css'
import BookData from '../Data/book.json'

const MenuToggle = ({userid,state}) => {
  const [isOpen,setIsOpen] = useState(false);
  const [groups,setGroups] = useState({});
  const navigate = useNavigate();
  const example = [
    {id:0,group_name:"그룹1",
    book_id:"1",start_date:"2024.11.30",end_date:"2024.12.01",participants:["root","temp"],leader:"root"}
  ,    {id:1,group_name:"그룹2",
    book_id:"4",start_date:"2024.11.30",end_date:"2024.12.01",participants:["root","홍길동"],leader:"홍길동"}]

  useEffect(()=>async function(){
    try {
      const response = await fetch(`/api/group/list/${state}/${userid!=null?userid:''}`,{method:'GET'});
      if(!response.ok)
        throw new Error(response.status);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      setGroups(example);
      console.log(groups);
    }
  },[])
  function toggle(event)
  {
    event.preventDefault();
    setIsOpen(!isOpen);
  }
return (
  <div>
      <button class="menu-bar" onClick={()=>setIsOpen(!isOpen)}>
        <div class="title-bar">
            <button id="toggle-button">{!isOpen?"▶":"▼"}</button>
            <span class="state">{state == 0?"시작 전":state==1?"진행 중":"완료"}</span>
            <div id="count">{groups.length}</div>
        </div>
        <div class="attribute-bar">
            <span id="leader">리더</span>
            <span id="participants">참여자</span>
            <span id="date">기간</span>
        </div>
    </button>
    {
      isOpen && groups.length > 0 && 
      groups.map((group)=>(
        <GroupToggle
          group_id={group.id}
          group_name={group.group_name}
          book_name={BookData[group.book_id].title}
          leader={group.leader}
          participants={group.participants}
          start_date={group.start_date}
          end_date={group.end_date}
          userid={userid}
        />
      ))
    }
</div>
)
}
export default MenuToggle;
