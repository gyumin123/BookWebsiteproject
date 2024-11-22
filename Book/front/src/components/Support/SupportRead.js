import React, { useState ,useEffect,useContext} from "react"
import './SupportRead.css';
import { useNavigate, useParams } from "react-router-dom";
import {UserContext} from '../../UserContext'

const SupportRead = () => {
    const {id} = useParams();
    const {userid} = useContext(UserContext);
    const post_id = parseInt(id);
    const [comment,setComment] = useState(null);
    const [inputComment,setInputComment] = useState('');
    const [name,setName] = useState(null);
    const [effectstate,setEffectState] = useState(false);

    const navigate = useNavigate();
    const[Post,setPost] = useState(null);

    useEffect(()=>{
        fetch(`/api/user/support/${post_id}`, {
            method: 'Get'
        })
        .then((response)=>{
        if (!response.ok)
            throw new Error(response.status);
        else
            return response.json();
        })
        .then(data=>setPost(data));
         fetch(`/api/user/name/${userid}`, { method: 'GET' })

             .then((response) => {
             if (response.ok)
                return response.text();
             else
                throw new Error(response.status);
             })
             .then((name)=>{setName(name);console.log(name)})
             //없다면 아이콘 저장
             .catch(error => console.log(error));

        //게시판 댓글 가져오기
        fetch(`/api/user/comment/${post_id}`, {
            method: 'GET',
        })
        .then((response)=>{
        console.log("실행");
        if (!response.ok)
            throw new Error(response.status);
        else
            return response.json();
        })
        .then(data=>setComment(data))
        .catch(error=>console.log(error));
    },[userid,effectstate])

    function PostDelete(){
        fetch(`/api/user/support/${post_id}`, {
            method: 'Delete'
        })
        .then(navigate(`/support/read/${post_id}`))
        .catch(error=>console.log(error));
    }
    async function deleteComment(id){
        try{
            const response = await fetch(`/api/user/comment/${id}`, {method: 'Delete'})
            if (response.ok)
                setEffectState(!effectstate);
            else
                throw new Error(response.status);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    async function commentWrite(){
        const commentData = {
                              userid,
                              author: name,
                              content: inputComment,
                              post: {
                                "id": post_id
                              }
                            };
                            console.log(name);
        try{
            const response = await fetch(`/api/user/comment/write`, {
                                           method: 'POST',
                                           headers: { 'Content-Type': 'application/json' },
                                           body: JSON.stringify(commentData)
                                           });
            if (response.ok)
                setEffectState(!effectstate);
            else
                throw new Error(response.status);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    return(
    <div>{
    (Post!=null) && (
    <main>
        <table id="post" border="1">
            <tr>
                <th colspan="10">{Post.title}</th>
            </tr>
            <tr>
                <th>작성자</th>
                <th>{Post.author}</th>
                <th>공개 여부</th>
                <th>{Post.state===true?"공개":"비공개"}</th>
            </tr>
            <tr>
                <th colspan = "10">{Post.content}</th>
            </tr>
        </table>
        {
            name === Post.author &&
            <button id="deletePost" onClink={()=>PostDelete()}>게시물 삭제</button>
        }

        {
            name != null &&
            (
                <div id="addComment">
                <h3>댓글 작성하기</h3>
                <textarea id="commentContent" rows="3" placeholder="댓글 내용을 입력하세요."
                value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}
                required></textarea>
                <button id="submitComment" onClick={()=>commentWrite()}>댓글 등록</button>
                </div>
            )
        }
        <section id="comments">
            <h2>댓글</h2>
            <table>
            <thead>
                    <tr>
                        <th>작성자</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbldy>
            <div id="commentList">
                <div class="comment">                  
                    {
                        (comment!=null) &&
                        comment.map((c) => (
                            <tr key={c.id}>
                                <td>{c.author}</td>
                                <td>{c.content}</td>
                                {
                                    userid === c.userid &&
                                    <button class="deleteComment" onClick={()=>deleteComment(c.id)}>댓글 삭제</button>
                                }

                            </tr>
                        ))
                    }
                </div>
            </div>
            </tbldy>
            </table>
        </section>
    </main>)}
    <button onClick = {() => navigate(-1)}>이전</button>
</div>)
}
export default SupportRead;
    