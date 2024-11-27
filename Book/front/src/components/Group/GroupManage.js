import {React,useEffect,useState,useContext} from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Plan from '../Plan/Plan'

const GroupManage = () => {
    const {groupid} = useParams();
    const navigate = useNavigate();
    const {userid} = useContext(UserContext);


    const [SelectedPlan,setSelectPlan] = useState([]);
    const [CheckedPlanState,setCheckedPlanState] = useState([]);

    const [SelectedJoin,setSelectJoin] = useState([]);
    const [CheckedJoinState,setCheckedJoinState] = useState([]);
    
    const [plans,setPlans] = useState([]);
    const [input,setInput] = useState(false);
    const [plan_new_name,setPlanName] = useState('');
    const [request_join,setRequestJoin] = useState([]);


    const plan_example = [
        {plan_id:1,plan_name:"1페이지 읽기"},
        {plan_id:2,plan_name:"2페이지 읽기"}
    ]
    const request_example = [
        {userid:"root"},
        {userid:"홍길동"}
    ]

    useEffect(() => async function(){
            try {
                const response = await fetch(`/api/user/group/${groupid}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(response.status);
                }
                const data = await response.json();
                setPlans(data);
                setCheckedPlanState(new Array(data.length + 1).fill(false));
            } catch (error) {
                setPlans(plan_example);
                setCheckedPlanState(new Array(plan_example.length + 1).fill(false));
            }

            try {
                const response = await fetch(`/api/group/join/request/${groupid}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(response.status);
                }
                const data = await response.json();
                setRequestJoin(data);
                setCheckedJoinState(new Array(data.length + 1).fill(false));
            } catch (error) {
                setRequestJoin(request_example);
                setCheckedJoinState(new Array(request_example.length + 1).fill(false));
            }

}, [groupid]);
    
    
        function handlePlanChecked(plan,index)
        {
            const newChecked = [...CheckedPlanState];
            newChecked[index] = !newChecked[index];
    
    
            if (newChecked[index])
            {
                setSelectPlan(prevItems=> [...prevItems,plan]);
            }
            else
            {
                setSelectPlan(
                prevItems=>prevItems.filter((item) => item !== plan))
            }
            setCheckedPlanState(newChecked);
        }
        function isJoinChecked(index)
         {return CheckedJoinState[index];}
    
         function JoinDelete(user)
         {
            const userid = user.userid;
            fetch(`/api/group/join/reject`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid,groupid})
            })
            .catch(error=>console.log(error))
    
         }
         function CheckedJoinDelete()
         {
            for (let index=0;index< plans.length;index++)
                if (CheckedPlanState[index])
                    JoinDelete(plans[index]);
            window.location.reload();
         }
         function AllJoinDelete()
         {
            for(const user of SelectedJoin)
                JoinDelete(user);
           window.location.reload();
         }
         function JoinConfirm(user)
         {
            const userid = user.userid;
            fetch(`/api/group/join/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid,groupid})
            })
            .then(()=>JoinDelete(user))
            .catch(error=>console.log(error))
    
         }
         function CheckedJoinConfirm()
         {
            for (let index=0;index< plans.length;index++)
                if (CheckedPlanState[index])
                    JoinConfirm(plans[index]);
            window.location.reload();
         }
         function AllJoinConfirm()
         {
            for(const user of SelectedJoin)
                JoinConfirm(user);
           window.location.reload();
         }
         function handleJoinChecked(user,index)
         {
             const newChecked = [...CheckedJoinState];
             newChecked[index] = !newChecked[index];
     
     
             if (newChecked[index])
             {
                setSelectJoin(prevItems=> [...prevItems,user]);
             }
             else
             {
                 setSelectJoin(
                 prevItems=>prevItems.filter((item) => item !== user))
             }
             setCheckedJoinState(newChecked);
         }
         function isPlanChecked(index)
          {return CheckedPlanState[index];}
     
          function PlanDelete(plan)
          {
             const planid = plan.plan_id;
             fetch(`/api/group/plan/delete`, {
                 method: 'DELETE',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({groupid,planid})
             })
             .catch(error=>console.log(error))
     
          }
          function CheckedPlanDelete()
          {
             for (let index=0;index< plans.length;index++)
                 if (CheckedPlanState[index])
                     PlanDelete(plans[index]);
             window.location.reload();
          }
          function AllPlanDelete()
          {
             for(const item of SelectedPlan)
                 PlanDelete(item);
            window.location.reload();
          }
         async function onPlanCreate(){
            try{
                const response = await fetch(`/api/group/plan/create`,{method:'POST',        
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({groupid,planid:plans.length,plan_name:plan_new_name})});
                if(!response.ok)
                    throw new Error(response.status);
            }
            catch(error)
            {
                console.error(error);
            }
          }
    return (
        <div class="container">
            <div class="plan-manage">
                <h2>플랜</h2>
                {
                    plans.map((plan,index) => (
                    <label key={plan.plan_id}>
                        <input type="checkbox" class="cart-checkbox"
                        name={plan.plan_id}
                        checked={isPlanChecked(index)}
                        onChange={()=>handlePlanChecked(plan,index)}></input>
                    {<Plan plan_id={plan.plan_id} plan_name={plan.plan_name}></Plan>}
                    </label>
                    ))
                }
                <div class="plan-create">
                {
                    input &&
                    <div class="plan-input">
                        <input type="text" value={plan_new_name} onChange={(e)=>setPlanName(e.target.value)}></input>
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
                <div class="action-bar">
                <button type="button" class="checked-delete" onClick={CheckedPlanDelete}>선택한 플랜 삭제하기</button>
                <button type="button" class = "all-delete" onClick={AllPlanDelete}>모두 삭제하기</button>
                </div>
            </div>
            <div class="join-manage">
                <h2>그룹 참여 신청 목록</h2>
                {
                    request_join.map((user,index) => (
                    <label key={index}>
                        <input type="checkbox" class="cart-checkbox"
                        name={index}
                        checked={isJoinChecked(index)}
                        onChange={()=>handleJoinChecked(user,index)}></input>
                        {user.userid}
                    </label>
                    ))
                }
                <div class="action-bar">
                <button type="button" class="checked-delete" onClick={CheckedJoinConfirm}>선택한 유저 받아주기</button>
                <button type="button" class = "all-delete" onClick={AllJoinConfirm}>모든 유저 받아주기</button>
                <button type="button" class="checked-delete" onClick={CheckedJoinDelete}>선택한 유저 거절하기</button>
                <button type="button" class = "all-delete" onClick={AllJoinDelete}>모두 거절하기</button>
                </div>
            </div>


        </div>
    )}
export default GroupManage;