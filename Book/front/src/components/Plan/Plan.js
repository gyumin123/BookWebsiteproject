import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import './Plan.css'

const Plan = ({userid,plan_id,plan_name}) => {
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate();

return (
  <div>
      <span class="plan-bar">
        <div class="title-bar">
          <span id="plan-state"></span>
        </div>
        <div class="attribute-bar">
          <span id="plan_name">{plan_name}</span>
        </div>
    </span>
</div>
)
}
export default Plan;
