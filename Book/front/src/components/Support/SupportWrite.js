import React, { useState,useEffect} from "react"
import './SupportWrite.css';
import { useNavigate } from "react-router-dom";
import {Popup} from "../Data/function.js"
const SupportWrite=()=>{
    const [author,setAuthor] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [IsPublic,setPublic] = useState(true);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();
    const [popupOpen,setPopupOpen] = useState(false);
    const [userid,setUserid] = useState(null);

    function GetUser(){
    //작성자 조회
    useEffect(()=>{
         fetch('/api/user/states', { method: 'GET' })
             .then((response) => {
             if (response.ok)
                return response.text();
             else
                throw new Error(response.status);
             })
             .then((userid)=>{setUserid(userid)})
             //없다면 아이콘 저장
             .catch(error => console.log(error));
         setUserid("root");
         setAuthor(userid);
    })
    }
    GetUser();

    function handlePublic(event){
        setPublic((event.target.value==="public")?true:false);
    }
    function onSubmitSupportWrite(event)
    {
    fetch('/api/user/support/write/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({author,title,content,state:IsPublic,password})
    })
    .then(navigate('/support'))
    }
    return(

        <div>
        {
            popupOpen &&
            <Popup
                message={"작성중인 글이 삭제됩니다. 취소하겠습니까?"}
                buttonMessage={["계속 작성하기","취소하기"]}
                onConfirm={()=>{setPopupOpen(false)}}
                onCancel={()=>{navigate(-1)}}
            />
        }
            <main>
        <section id="writePost" onSubmit={onSubmitSupportWrite}>
            <h2>글쓰기</h2>
            <form>
                {/* <!-- 작성자 입력 --> */}
                <div id="authorSection">
                    <label htmlFor="author">작성자:</label>
                    <input type="text" id="author" disabled={userid!=null?true:false}
                    value={author} onChange={(e)=>setAuthor(e.target.value)} required/>
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
            <button onClick = {()=>setPopupOpen(true)}>취소</button>
        </section>
    </main>

        </div>
    )
}
export default SupportWrite;