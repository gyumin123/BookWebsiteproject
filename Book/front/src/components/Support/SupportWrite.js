import React, { useState,useEffect} from "react"
import './SupportWrite.css';
import {UserContext} from '../../UserContext';
import {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {Popup} from "../Data/function.js"
const SupportWrite=()=>{

    const [author,setAuthor] = useState(null);
    const [title,setTitle] = useState(null);
    const [content,setContent] = useState(null);
    const [IsPublic,setPublic] = useState(true);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);
    const {userid} = useContext(UserContext);

useEffect(() => {
  const fetchAuthor = async () => {
    try {
      // 비동기 호출로 사용자 이름 가져오기
      const response = await fetch(`/api/user/name/${userid}`, { method: 'GET' });
      if (response.ok) {
        const name = await response.text();
        setAuthor(name);
        if (!name)
            throw new Error();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
          setPopupOpen(true);
          setMessage("글쓰기 권한이 없습니다.");
          setButtonMessage(["확인"]);
          setOnclickFunction([() => navigate(-1)]);
    }
  };
  fetchAuthor();
  console.log(author);
}, [userid]);


    function handlePublic(event){
        setPublic((event.target.value==="public")?true:false);
    }
    function onSubmitSupportWrite(event)
    {
    fetch('/api/user/support/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({author,title,content,state:IsPublic,password})
    })
    .then(navigate('/support'))
    .catch(error=>console.log(error));
    }
    function Back()
    {
        setPopupOpen(true);
        setMessage("작성중인 글이 삭제됩니다. 이동하시겠습니까?")
        setButtonMessage(["계속 작성하기","취소하기"]);
        setOnclickFunction([()=>{setPopupOpen(false)},()=>{navigate(-1)}])
    }
    return(

        <div>
        {
            popupOpen &&
            <Popup
                message={message} buttonMessage = {buttonMessage} onClickFunction = {onClickFunction}
            />
        }
            <main>
        <section id="writePost" onSubmit={onSubmitSupportWrite}>
            <h2>글쓰기</h2>
            <form>
                {/* <!-- 작성자 입력 --> */}
                <div id="authorSection">
                    <label htmlFor="author">작성자:</label>
                    <input type="text" id="author"
                    value={author}/>
                </div>

                {/* <!-- 글 제목 입력 --> */}
                <div>
                    <label htmlFor="title">제목:</label>
                    <input type="text" id="title" placeholder="제목 입력" required 
                    value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                {/* <!-- 글 내용 입력 --> */}
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea id="content" rows="5" placeholder="내용 입력" required
                    value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>

                {/* <!-- 공개/비공개 선택 --> */}
                <div>
                    <label htmlFor="visibility">공개 여부:</label>
                    <select id="visibility" onChange={handlePublic}>
                        <option value="public">공개</option>
                        <option value="private">비공개</option>
                    </select>
                </div>
                {
                    IsPublic===false&&
                    (
                        <div id="passwordSection">
                        <label for="password">비밀번호:</label>
                        <input type="password" value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        id="password" placeholder="비밀번호 입력" />
                    </div>
                    )
                }


                {/* <!-- 제출 버튼 --> */}
                <button type="submit">등록하기</button>
            </form>
            <button type="submit" onClick = {Back}>취소</button>
        </section>
    </main>

        </div>
    )
}
export default SupportWrite;
