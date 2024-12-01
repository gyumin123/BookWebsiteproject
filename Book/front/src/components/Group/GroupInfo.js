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
import {Popup} from "../Data/function";

const GroupInfo = () => {
    const {userid} = useContext(UserContext);
    const {groupId} = useParams();
    const [group,setGroup] = useState({});
    const [plans,setPlans] = useState([]);
    const [planPage,setPlanPage] = useState(null);
    const [plan_name,setPlanName] = useState("");
    const [input,setInput] = useState(false);
    const [effectPlanState,setEffectPlanState] = useState(false);
    const navigate = useNavigate();
    const [effectGroupState,setEffectGroupState] = useState(false);
    const [groupMember,setGroupMember] = useState(false);

    const [pages,setPage] = useState([]);


    const [request,setRequest] = useState(false);

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);

    useEffect(()=>{
        const getGroup = async()=>  {
            // 그룹 정보 가져오기 (완료)
            try {
                const response = await fetch(`/api/group/${groupId}`,{method:'GET'});
                if(!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                await setGroup(data);
                isGroupMember(data);
            } catch (error) {
                console.log(error);
            }
        }
        getGroup();
        getPage();
      },[effectGroupState])
    const getPage = async()=>{
        try{
            const response = await fetch("/api/read/page/group",{method:"post",headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({bookid:group.bookId,groupid:groupId})})
            const data = await response.json();
            setPage(data);
        }catch (e) {
            console.log(e);
        }
    }


    useEffect(()=>{
        if (userid!=null) {
            setEffectGroupState(!effectGroupState);
            setEffectPlanState(!effectPlanState);
            isPrevRequest();
        }
        },[userid])
    useEffect(()=>{
        if (group!=null)
            getPage();
    },[group])


    function isGroupMember(group){
        if (group.participants == null)
            return;
        for (let participant of group.participants) {
            if (userid === participant.id) {
                setGroupMember(true);
                return;
            }
        }
    }

    useEffect(()=>{
        const getPlan = async() =>{
            try {
                const response = await fetch(`/api/group/plan/${groupId}`,{method:'GET'});
                if(!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                setPlans(data);

            } catch (error) {
                console.log(error);
            }
        }
        getPlan();
    },[effectPlanState])

      async function onGroupJoin(){
        //그룹 상태가 자유면 바로 가입 (완료)
        try{
            const response = await fetch(`/api/group/join/confirm`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:userid,groupId})});
            if(!response.ok)
                throw new Error(response.status);
            setEffectGroupState(!effectGroupState);
        }
        catch(error)
        {
            console.error(error);
        }
      }
      async function isPrevRequest(){
        let Request = [];
        const fetchData = async() =>{
            try {
                const response = await fetch(`/api/group/join/request/${groupId}`, {
                    method: 'GET',
                });
                Request = await response.json();
            } catch (error) {
                console.log(error);
            }
        }
        await fetchData();
        for(let req of Request){
            if (userid === req.id)
            {
                setRequest(true)
                return;
            }
        }
      }
      async function onGroupJoinRequest(){
        //그룹 신청 (완료)
          // 이미 보낸적이 있으면 에러
          if (request)
          {
              setPopupOpen(true);
              setMessage("이미 신청하였습니다.");
              setButtonMessage(["닫기"]);
              setOnclickFunction([()=>{setPopupOpen(false)}])
              return;
          }
        try{
            const response = await fetch(`/api/group/join/request`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userId:userid,groupId})});
            if(!response.ok)
                throw new Error(response.status);
            setRequest(true);
        }
        catch(error)
        {
            console.error(error);
        }
      }
      async function onPlanCreate(){
        // 플랜 생성 (완료)
        try{
            const response = await fetch(`/api/group/plan/create`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({groupId,title:plan_name})});
            if(!response.ok)
                throw new Error(response.status);
            setEffectPlanState(!effectPlanState)
            setPlanName("")
        }
        catch(error)
        {
            console.error(error);
        }
      }

return (
    <span class="group-container">
        <div class="header">
            {
                popupOpen &&
                <Popup
                    message={message} buttonMessage = {buttonMessage} onClickFunction = {onClickFunction}
                />
            }
            <div class="group-title">
                <span id="back" onClick={()=>navigate(-1)}>←</span>
                <h3>{group.groupName}</h3>
            </div>
                <div className="action-bar">
                    {userid === group.leaderId &&
                    <span onClick={() => navigate(`/group/manage/${groupId}`)}>관리하기</span>
                    }
                    {
                        !groupMember &&
                        <span onClick={() => {
                            group.authority === false ? onGroupJoinRequest() : onGroupJoin()
                        }}>참여하기</span>
                    }
                </div>
        </div>
        <div class="group-summary">
            <div class="column">
                <span>책</span>
                <span>리더</span>
                <span>참여자</span>
                <span>가입</span>
                <span>상태</span>
                <span>기간</span>
            </div>
            <div class="summary">
                <a href={`/book/${group.bookId}`}>{group.bookId != null ?BookData[group.bookId].title:"비어 있음"}</a>
                <span>{group.leaderId != null ?group.leaderId:"비어 있음"}</span>
                <span>{group.participants != null ? group.participants.length:"0"}</span>
                <span>{group.authority===0?"신청":"자유"}</span>
                <span>{group.state===0?"시작 전":group.state===1?"진행 중":"완료"}</span>
                <span>{group.startDate}~{group.endDate}</span>
            </div>
            
        </div>
        <div className="plans">
            <div className="plan">
                {
                    plans.map((plan)=>(
                        <span id="plan" onClick={()=>setPlanPage(plan.planId)}>
                            <Plan plan_id={plan.planId} plan_name={plan.title}></Plan>
                        </span>
                    ))
                }
            </div>
            {
                input &&
                <div className="plan-input">
                    <input type="text" value={plan_name} onChange={(e)=>setPlanName(e.target.value)}></input>
                </div>
            }
            {
                plans.length <= 5 && userid!=null &&
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
            plans.map((plan)=> (
                planPage === plan.planId &&
                <div className="content">
                    <PlanContent group_id={groupId} plan_id={planPage} book_id={group.bookId} GroupMember={groupMember}/>
                </div>
            ))
        }
        <div>
            <h2 style={{textAlign:"center"}}>그룹원 책 열람 내역</h2>
            <div style={
                {
                    display:"flex",
                    flexDirection:"column",
                    gap:"10px"
                }
            }>
                <table border="1">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>사용자</th>
                        <th>페이지</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pages.map((page,idx)=>(
                            <tr>
                                <th>{idx}</th>
                                <th>{page.userid}</th>
                                <th>{page.page}</th>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
        </div>
        </div>
    </span>
)
}
export default GroupInfo;
