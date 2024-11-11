import React, { useState ,useEffect} from "react"
import './SupportRead.css';
import { useNavigate, useParams } from "react-router-dom";

const SupportRead = () => {
    const {id} = useParams();
    const postid = parseInt(id);
    const [comment,setComment] = useState('');
    const [inputComment,setInputComment] = useState('');
    console.log(postid);
    const navigate = useNavigate();
    const[Post,SetPost] = useState(null);
        //글 가져오기
    GetPostData();
    function GetPostData(){
        useEffect(()=>{
            console.log(postid);
            fetch(`/api/user/support/${postid}`, {
                method: 'Get'
            })
            .then((response)=>response.json())
            .then(data=>{console.log(data);SetPost(data)});
            //게시판 댓글 가져오기
            fetch(`/api/user/comment/${postid}`, {
                method: 'POST',
            })
            .then((response)=>response.json())
            .then(data=>setComment(data));
        },[postid])
    }

    function PostDelete(){
        fetch(`/api/user/support/${postid}`, {
            method: 'Delete'
        })
        .then(navigate('/support'))
    }
    const deleteComment = (event) => {
        const id = event.target.id;
        fetch(`/api/user/support/comment/${id}`, {
    method: 'Delete',
    })
    .catch(err=>console.log(err));
    }
    const commentWrite = () => {
                fetch(`/api/user/comment/write`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //num 페이지 count 개씩 가져오기
    body: JSON.stringify({comment,post_id:Post.id})
})
    .then(navigate(`/support/read/${postid}`))
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
                <th>{Post.state==true?"공개":"비공개"}</th>
            </tr>
            <tr>
                <th colspan = "10">{Post.content}</th>
            </tr>
        </table>
        <button id="deletePost" onClink={()=>PostDelete()}>게시물 삭제</button>

        <div id="addComment">
            <h3>댓글 작성하기</h3>
            <textarea id="commentContent" rows="3" placeholder="댓글 내용을 입력하세요."
            value={inputComment} onChange={(e)=>{setInputComment(e.target.value)}}
            required></textarea>
            <button id="submitComment" onClick={()=>commentWrite()}>댓글 등록</button>
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
                        (Comment.length > 0) &&
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
    </main>)}
    <button onClick = {() => navigate(-1)}>이전</button>
</div>)
}
export default SupportRead;
    