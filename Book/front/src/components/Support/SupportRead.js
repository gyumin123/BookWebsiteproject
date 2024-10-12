import React, { useState } from "react"
import './SupportRead.css';
import { useNavigate, useSearchParams } from "react-router-dom";

const SupportRead = () => {
    const [searchParams] = useSearchParams();
    const postid = searchParams.get('postid');
    const [comment,SetComment] = useState('');
    console.log(postid);
    const navigate = useNavigate();
    const[Post,SetPost] = useState([]);
        //글 가져오기
        fetch(`/api/user/support/${postid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response)=>response.JSON())
        .then(data=>SetPost(data));
        //게시판 댓글 가져오기
        fetch(`/api/user/support/comment`, {
            method: 'POST',
        })
        .then((response)=>response.JSON())
        .then(data=>SetComment(data));
    const PostDelete = () =>{
        fetch(`/api/user/support/${postid}`, {
            method: 'Delete'
        })
        .then(navigate('mypage/support'))
    }
    const deleteComment = (event) => {
        fetch(`/api/user/support/comment/${event.target.id}`, {
    method: 'Delete',
    })
    .catch(err=>console.log(err));
    }
    const commentWrite = () => {
                fetch(`/api/user/support/write/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //num 페이지 count 개씩 가져오기
    body: JSON.stringify({postid,comment})
})
    .then(navigate(`/support/read/${postid}`))
    }
    return(
    <div>
    <main>
        <section id="post">
            <h2>{Post[0].title}</h2>
            <p>{Post[0].content}</p>
            <button id="deletePost" onClink={()=>PostDelete()}>게시물 삭제</button> 
        </section>
        <div id="addComment">
            <h3>댓글 작성하기</h3>
            <textarea id="commentContent" rows="3" placeholder="댓글 내용을 입력하세요."
            value={comment} onChange={(e)=>{SetComment(e.target.value)}}
            required></textarea>
            <button id="submitComment">댓글 등록</button>
        </div>
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
                        Comment.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.author}</td>
                                <td>{comment.content}</td>
                                <button id={comment.id} class="deleteComment" onClick={deleteComment}>댓글 삭제</button>
                            </tr>
                        ))
                    }
                </div>
            </div>
            </tbldy>
            </table>
        </section>
    </main>
</div>)
}
export default SupportRead;
    