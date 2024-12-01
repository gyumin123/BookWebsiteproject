import {React,useEffect,useState,useContext} from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Plan from '../Plan/Plan'
import {Popup} from "../Data/function";

const GroupManage = () => {
    const {groupId} = useParams();
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

    const [effectPlanState,setEffectPlanState] = useState(false);
    const [effectJoinState,setEffectJoinState] = useState(false);

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);


    const plan_example = [
        {planId:1,title:"1페이지 읽기"},
        {planId:2,title:"2페이지 읽기"}
    ]
    const request_example = [
        {userid:"root"},
        {userid:"홍길동"}
    ]
    useEffect(() => {
        setEffectPlanState(!effectPlanState);
        setEffectJoinState(!effectJoinState);
    }, []);

    useEffect(() =>{
        const getPlan = async() => {
            // 플랜 가져오기 (완료)
            try {
                const response = await fetch(`/api/group/plan/${groupId}`, {
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
        }
        getPlan();
        }, [effectPlanState]);
    useEffect(() => {
        const getRequest = async() => {
            try {
                const response = await fetch(`/api/group/join/request/${groupId}`, {
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
        }
        getRequest();
    }, [effectJoinState]);
    
    
        function handlePlanChecked(plan,index)
        {
            const newChecked = [...CheckedPlanState];
            newChecked[index] = !newChecked[index];
            setCheckedPlanState(newChecked);
        }
        function isJoinChecked(index)
         {return CheckedJoinState[index];}


         // 그룹 참여 신청 거절하기 (완료)
         function JoinDelete(user)
         {
            const userid = user.id;
            fetch(`/api/group/join/reject`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:userid,groupId})
            })
                .then((response)=> {
                    if (!response.ok)
                        throw new Error(response.status);
                    setEffectJoinState(!effectJoinState)
                })
                .catch(error=>console.log(error))
    
         }
         function CheckedJoinDelete()
         {
            for (let index=0;index< request_join.length;index++)
                if (CheckedJoinState[index])
                    JoinDelete(request_join[index]);
         }
         function AllJoinDelete()
         {
             for (let index=0;index< request_join.length;index++)
                 JoinDelete(request_join[index]);
         }
         // 그룹 가입하기 (완료)
         function JoinConfirm(user)
         {
            const userid = user.id;
            fetch(`/api/group/join/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:userid,groupId})
            })
            .then((response)=> {
                if (!response.ok)
                    throw new Error(response.status);
                JoinDelete(user)
            })
            .catch(error=>console.log(error))
    
         }
         function CheckedJoinConfirm()
         {
            for (let index=0;index< request_join.length;index++)
                if (CheckedJoinState[index])
                    JoinConfirm(request_join[index]);
         }
         function AllJoinConfirm()
         {
             for (let index=0;index< request_join.length;index++)
                 JoinConfirm(request_join[index]);
         }
         function handleJoinChecked(user,index)
         {
             const newChecked = [...CheckedJoinState];
             newChecked[index] = !newChecked[index];
             setCheckedJoinState(newChecked);
         }
         function isPlanChecked(index)
          {return CheckedPlanState[index];}

          // 플랜 삭제하기
          function PlanDelete(plan)
          {
             const planId = plan.planId;
             fetch(`/api/group/plan/delete`, {
                 method: 'DELETE',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({groupId,planId})
             })
                 .then((response)=> {
                     if (!response.ok)
                         throw new Error();
                     setEffectPlanState(!effectPlanState)
                 })
                 .catch(error=>{
                     setPopupOpen(true);
                     setMessage("😡 이미 사용중인 플랜 입니다.");
                     setButtonMessage(["닫기"]);
                     setOnclickFunction([()=>{setPopupOpen(false)}]);
                 })
     
          }
          function CheckedPlanDelete()
          {
             for (let index=0;index< plans.length;index++)
                 if (CheckedPlanState[index])
                     PlanDelete(plans[index]);
          }
          function AllPlanDelete()
          {
              for (let index=0;index< plans.length;index++)
                  PlanDelete(plans[index]);
          }
         async function onPlanCreate(){
            try{
                const response = await fetch(`/api/group/plan/create`,{method:'POST',        
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({groupId,title:plan_new_name})});
                if(!response.ok)
                    throw new Error(response.status);
                setEffectPlanState(!effectJoinState);
            }
            catch(error)
            {
                console.error(error);
            }
          }
    return (
        <div class="container">
            {
                popupOpen &&
                <Popup
                    message={message} buttonMessage = {buttonMessage} onClickFunction = {onClickFunction}
                />
            }
            <div class="plan-manage">
                <h2>플랜</h2>
                {
                    plans.map((plan,index) => (
                    <label key={plan.planId}>
                        <input type="checkbox" class="cart-checkbox"
                        name={plan.planId}
                        checked={isPlanChecked(index)}
                        onChange={()=>handlePlanChecked(plan,index)}></input>
                        {plan.planId} {plan.title}
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
                        {user.id}
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