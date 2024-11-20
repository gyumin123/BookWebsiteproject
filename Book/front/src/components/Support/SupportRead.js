import React, { useState ,useEffect} from "react"
import './SupportRead.css';
import { useNavigate, useParams } from "react-router-dom";

const SupportRead = () => {

    const {id} = useParams();
    const post_id = parseInt(id);
    const [comment,setComment] = useState('');
    const [inputComment,setInputComment] = useState('');
    const [name,setName] = useState(null);

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
         fetch('/api/user/name', { method: 'GET' })

             .then((response) => {
             if (response.ok)
                return response.text();
             else
                throw new Error(response.status);
             })
             .then((name)=>{setName(name)})
             //없다면 아이콘 저장
             .catch(error => console.log(error));

        //게시판 댓글 가져오기
        fetch(`/api/user/comment/${post_id}`, {
            method: 'GET',
        })
        .then((response)=>{
        if (!response.ok)
            throw new Error(response.status);
        else
            return response.json();
        })
        .then(data=>setComment(data))
        .catch(error=>console.log(error));
    },[post_id])

    function PostDelete(){
        fetch(`/api/user/support/${post_id}`, {
            method: 'Delete'
        })
        .then(navigate(`/support/read/${post_id}`))
        .catch(error=>console.log(error));
    }
    function deleteComment(id,comment_author){
        fetch(`/api/user/support/comment/${id}`, {method: 'Delete'})
        .then()
        .catch(error=>console.log(error));
    }
    function commentWrite(){
        fetch(`/api/user/comment/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //num 페이지 count 개씩 가져오기
        body: JSON.stringify({author:name,comment,post_id})
        })
        .then(navigate(`/support/read/${post_id}`))
        .catch(error=>console.log(error));
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
                        (Comment.length > 0) &&
                        Comment.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.author}</td>
                                <td>{comment.content}</td>
                                {
                                    name === comment.author &&
                                    <button class="deleteComment" onClick={()=>deleteComment(comment.id,comment.author)}>댓글 삭제</button>
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
    