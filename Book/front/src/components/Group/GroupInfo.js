import React, { useState,useEffect,useContext} from "react"
import {useParams,Route,Routes,useNavigate} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import {UserContext} from '../../UserContext';
import './GroupInfo.css'
import BookData from '../Data/book.json'
import PlanContent from "../Plan/PlanContent";
import Plan from '../Plan/Plan'

const GroupInfo = () => {
    const {userid} = useContext(UserContext);
    const {groupid} = useParams();
    const [group,setGroup] = useState({});
    const [plans,setPlans] = useState([]);
    const [planPage,setPlanPage] = useState(1);
    const [plan_name,setPlanName] = useState("");
    const [input,setInput] = useState(false);
    const navigate = useNavigate();
    const example = 
        {id:0,group_name:"그룹1",
        book_id:0,group_summary:"안녕하세요, 잘부탁드립니다.",start_date:"2024.11.30",end_date:"2024.12.01",state:1,
        participants:["root","temp"],leader:"root"}
    const plan_example = [
        {plan_id:1,plan_name:"1페이지 읽기"},
        {plan_id:2,plan_name:"2페이지 읽기"}
    ]


    useEffect(()=>async function(){
        try {
          const response = await fetch(`/api/group/${groupid}`,{method:'GET'});
          if(!response.ok)
            throw new Error(response.status);
          const data = await response.json();
          setGroup(data);
        } catch (error) {
          setGroup(example);
          console.log(group);
        }
        try {
            const response = await fetch(`/api/group/plan/${groupid}`,{method:'GET'});
            if(!response.ok)
              throw new Error(response.status);
            const data = await response.json();
            setPlans(data);
          } catch (error) {
            setPlans(plan_example);
          }
      },[])

      async function onGroupJoin(){
        //그룹 상태가 자유면 바로 가입
        try{
            const response = await fetch(`/api/group/join/confirm`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid,groupid})});
            if(!response.ok)
                throw new Error(response.status);
        }
        catch(error)
        {
            console.error(error);
        }
      }
      async function onGroupJoinRequest(){
        //그룹 상태가 자유가 아니면 신청 -> 대기 
        try{
            const response = await fetch(`/api/group/join/request`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid,groupid})});
            if(!response.ok)
                throw new Error(response.status);
        }
        catch(error)
        {
            console.error(error);
        }
      }
      async function onPlanCreate(){
        try{
            const response = await fetch(`/api/group/plan/create`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({groupid,planid:plans.length,plan_name})});
            if(!response.ok)
                throw new Error(response.status);
        }
        catch(error)
        {
            console.error(error);
        }
      }

return (
    <div class="group-container">
        <div class="header">
            <div class="group-title">
                <span id="back" onClick={()=>navigate(-1)}>←</span>
                <h3>{group.group_name}</h3> 
            </div>
            <div class="action-bar">
                <span onClick={()=>navigate(`/group/manage/${groupid}`)}>관리하기</span>
                <span onClick={()=>{group.state==1?onGroupJoin():onGroupJoinRequest()}}>참여하기</span>
            </div>
        </div>
        <div class="group-summary">
            <div class="column">
                <span>책</span>
                <span>리더</span>
                <span>참여자</span>
                <span>설명</span>
                <span>가입</span>
                <span>기간</span>
            </div>
            <div class="summary">
                <span>{group.book_id!=null?BookData[group.book_id].title:""}</span>
                <span>{group.leader}</span>
                <span>{group.participants}</span>
                <span>{group.group_summary}</span>
                <span>{group.state==0?"신청":"자유"}</span>
                <span>{group.start_date}~{group.end_date}</span>

            </div>
            
        </div>
        <div class="plans">
            <div class="plan">
                {
                    plans.map((plan)=>(
                        <span onClick={()=>setPlanPage(plan.plan_id)}>
                            <Plan plan_id={plan.plan_id} plan_name={plan.plan_name}></Plan>
                        </span>
                    ))
                }
            </div>
            {
                input &&
                <div class="plan-input">
                    <input type="text" value={plan_name} onChange={(e)=>setPlanName(e.target.value)}></input>
                </div>
            }
            {
                plans.length <= 5 &&
                <span id="plan-create" onClick={()=>{
                    if (input)
                        onPlanCreate();
                    setInput(!input)
                }}>
                {input?"+ 제출하기":"+ 플랜 추가하기"}
                </span>
            }

        </div>
        <hr></hr>
        
        {
            plans.length > 0 && planPage!=null && planPage-1 <= plans.length &&
            (
                    <div class="content">
                        <PlanContent group_id={groupid} plan_id={planPage}/>
                    </div>
            )
        }
    </div>
)
}
export default GroupInfo;
