import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import './ContentWrite.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {Popup} from "../Data/function";

const  ContentWrite = ()=>{
    const {userid} = useContext(UserContext);
    const [Params] = useSearchParams();
    const groupId = Params.get('groupid');
    const bookid = Params.get('bookid');
    const planId = Params.get('planid');
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate=useNavigate();
    const [options,setOptions] = useState([]);
    const [content,setContent] = useState("")

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);


    useEffect(()=>{
        const getOption = async(page) => {
            try {
                const response = await fetch(`/api/read/comment/user`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({bookid,userid,page})
                })
                if (!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                data.map(newOption=>{
                    setOptions(prevItems => {
                        // id가 중복되지 않으면 새 항목 추가
                        if (!prevItems.some(item => item.page === newOption.page)) {
                            return [...prevItems, newOption];
                        }
                        // 중복되면 기존 상태 그대로 반환
                        return prevItems;
                    });
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (userid!=null) {
            for (let i = 1; i <= 6; i++)
                getOption(i);
        }

    },[userid])
    function onSubmitContent(){
        if (content === "")
        {
            setPopupOpen(true);
            setMessage("내용을 입력해주세요");
            setButtonMessage(["확인"]);
            setOnclickFunction([()=>setPopupOpen(false)]);
            return;
        }
        fetch(`/api/group/plan/write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId:userid,groupId,planId, content})
        })
            .then(()=>navigate(-1))
            .catch((error)=>console.log(error));
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked)
            setContent(content + `${options[name].page}페이지에서 ${options[name].comment}"라고 생각하였습니다.`)
    };

    return (
    <div class="write-container">
        {
            popupOpen &&
            <Popup
                message={message} buttonMessage = {buttonMessage} onClickFunction = {onClickFunction}
            />
        }
        <h1>글쓰기</h1>
        <div class="write-body">
            <div class="content-data">
            {
                options.map((option,idx)=>(
                    <label>
                    <input
                        type="checkbox"
                        name={idx}
                        checked={selectedOptions[idx]}
                        onChange={handleCheckboxChange}
                    />
                    {option.page}에서 "{option.comment}"라고 생각하였습니다.
                </label>
                ))
            }
            </div>
            <div class="content-write">
                <textarea
                    value={content}
                    onChange={(e)=>setContent(e.target.value)} // 선택된 텍스트를 textarea에 표시
                ></textarea>
            </div>
        </div>
        <div class="action-bar">
            <button class="action" onClick={()=>onSubmitContent()}>제출</button>
            <button class="action" onClick={()=>navigate(-1)}>취소</button>
        </div>
    </div>
    );
}

export default ContentWrite;
