import React, { useState } from "react"
import './SupportWrite.css';
import { useNavigate } from "react-router-dom";
const SupportWrite=()=>{
    const [author,Setauthor] = useState('');
    const [title,SetTitle] = useState('');
    const [content,SetContent] = useState('');
    const [IsPublic,Setpublic] = useState(true);
    const [password,Setpassword] = useState(null);
    const navigate = useNavigate();
    const handlePublic = (event)=>{
        Setpublic((event.target.value==="public")?true:false);
    }
    const handleSubmit = (event) =>
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
            <main>
        <section id="writePost" onSubmit={handleSubmit}>
            <h2>글쓰기</h2>
            <form>
                {/* <!-- 작성자 입력 --> */}
                <div id="authorSection">
                    <label htmlFor="author">작성자:</label>
                    <input type="text" id="author" placeholder="작성자 입력" 
                    value={author} onChange={(e)=>Setauthor(e.target.value)} required/>
                </div>

                {/* <!-- 글 제목 입력 --> */}
                <div>
                    <label htmlFor="title">제목:</label>
                    <input type="text" id="title" placeholder="제목 입력" required 
                    value={title} onChange={(e)=>SetTitle(e.target.value)}/>
                </div>

                {/* <!-- 글 내용 입력 --> */}
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea id="content" rows="5" placeholder="내용 입력" required
                    value={content} onChange={(e)=>SetContent(e.target.value)}></textarea>
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
                        onChange={Setpassword}id="password" placeholder="비밀번호 입력" />
                    </div>
                    )
                }


                {/* <!-- 제출 버튼 --> */}
                <button type="submit">등록하기</button>
            </form>
        </section>
    </main>
        </div>
    )
}
export default SupportWrite;