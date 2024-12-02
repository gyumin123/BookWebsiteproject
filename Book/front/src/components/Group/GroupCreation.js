import {React, useContext, useState} from 'react'
import './GroupCreation.css'
import BookData from '../Data/book.json'
import {UserContext} from "../../UserContext";
import {Popup} from "../Data/function";

const GroupCreation = () =>{
    const [groupName,setGroupName] = useState('');
    const [bookId,setBookId] = useState(1);
    const [authority,setAuthority] = useState(0);
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('')
    const {userid} = useContext(UserContext);

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);
    async function onGroupCreate(){
        // 그룹 추가 완료
        try{
            const response = await fetch(`/api/group/create`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({groupName,bookId,leaderId:userid,state:0, startDate, endDate, authority})});
            setPopupOpen(true);
            if(!response.ok)
                throw new Error(response.status);
            setMessage("그룹 생성을 완료하였습니다.");
            setButtonMessage(["닫기"]);
            setOnclickFunction([()=>window.location.reload()]);
        }
        catch(error)
        {
            setMessage("모두 입력해주세요");
            setButtonMessage(["확인"]);
            setOnclickFunction([()=>setPopupOpen(false)]);
        }
    }
    return(
        <div className="create-container">
            {
                popupOpen &&
                <Popup
                    message={message} buttonMessage = {buttonMessage} onClickFunction = {onClickFunction}
                />
            }
            <div className="create">
                <div className="column">
                    <span>그룹 이름</span>
                    <span>책 이름</span>
                    <span>리더</span>
                    <span>가입</span>
                    <span>기간</span>
                </div>
                <div className="body">
                    <input id="group_name" type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)}></input>
                    <select id="book_name" value={bookId} onChange={(e)=>setBookId(e.target.value)}>
                    {
                        BookData.map((book,idx)=>(
                            <option value={idx+1}>{book.title}</option>
                        ))
                    }
                    </select>
                    <input id="leader"type="text" placeholder={userid} disabled></input>
                    <select id="state"type="text" value = {authority} onChange={(e)=>setAuthority(e.target.value)}>
                        <option value="true">자유</option>
                        <option value="false">신청</option>
                    </select>
                    <div id="date"><input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}>
                    </input> ~ <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}></input></div>
                </div>
            </div>
            <div className="action-bar">
                <button onClick={()=>onGroupCreate()}>생성</button>
                <button onClick={()=>window.location.reload()}>취소</button>
            </div>
        </div>
    )
}
export default GroupCreation;