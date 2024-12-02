import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import GroupToggle from "./GroupToggle";
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
      const response = await fetch(`/api/group/list/${state}${userid!=null?`/${userid}`:''}`,{method:'GET'});
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
  <div className="menu-toggle">
      <button class="menu-bar" onClick={()=>setIsOpen(!isOpen)}>
        <div class="title-bar">
            <button id="toggle-button">{!isOpen?"▶":"▼"}</button>
            <span class="state" id={state}>{state === 0?"시작 전":state==1?"진행 중":"완료"}</span>
            <div id="count">{groups.length}</div>
        </div>
        <div class="attribute-bar">
            <span id="leader">리더</span>
            <span id="authority">권한</span>
            <span id="date">기간</span>
        </div>
    </button>

    {
        isOpen && groups.length > 0 &&
        <div className="groups">
            {
            groups.map((group)=>(
            <GroupToggle
                groupId={group.groupId}
                group_name={group.groupName}
                book_name={group.bookId != null ? BookData[group.bookId - 1].title : "비어 있음"}
                authority={group.authority === "false"?"신청":"자유"}
                leader={group.leaderId}
                start_date={group.startDate}
                end_date={group.endDate}
                userid={userid}
            />
            ))
            }
        </div>
            }

        </div>
        )
    }
export default MenuToggle;
