import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import {UserContext} from '../../UserContext';
import Plan from '../Plan/Plan'

const GroupToggle = ({userId,groupId,group_name,book_name,leader,authority,start_date,end_date}) => {
  const [isOpen,setIsOpen] = useState(false);
  const [plans,setPlans] = useState([]);
  const navigate=useNavigate();

  const example = [{plan_id:0,plan_name:"오늘 밥 먹기"}]

  useEffect(()=>async function(){
    try {
      const response = await fetch(`/api/group/plan/${groupId}`,{method:'GET'});
      if(!response.ok)
        throw new Error(response.status);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      setPlans(example);
      console.log(plans);
    }
  },[])
  function toggle(event)
  {
    event.preventDefault();
    setIsOpen(!isOpen);
  }
return (
  <div className="group-toggle">
      <button class="group-bar" onClick={()=>{navigate(`/group/info/${groupId}`)}}>
        <div class="title-bar">
            <button id="toggle-button" onClick={(event)=>{event.stopPropagation();setIsOpen(!isOpen)}}>{!isOpen?"▶":"▼"}</button>
            <span id="group_name">{group_name}</span>
            <span id="book_name">{book_name}</span>
        </div>
        <div class="attribute-bar">
            <span id="leader">{leader}</span>
            <span id="authority">{authority}</span>
            <span id="date">{start_date}~{end_date}</span>
        </div>
    </button>
    {
      isOpen && (
        isOpen && plans.length > 0 &&
            <div className="plans">
                {
                    plans.map((plan)=>(
                        <Plan
                            plan_id={plan.planId}
                            plan_name={plan.title}
                        />
                    ))
                }
            </div>
      )
    }
</div>
)
}
export default GroupToggle;
