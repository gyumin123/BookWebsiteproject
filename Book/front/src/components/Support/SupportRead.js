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
    },[userid,effectstate])

    function PostDelete(){
        fetch(`/api/user/support/${post_id}`, {
            method: 'delete'
        })
        .then(navigate(`/support`))
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
            <button id="deletePost" onClick={()=>PostDelete()}>게시물 삭제</button>
        }
    </main>)}
    <button onClick= {() => navigate(-1)}>이전</button>
</div>)
}
export default SupportRead;
    