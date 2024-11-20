import React,{useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './FindID_PWD.css';

const FindID = () => {
    const [username,SetUsername] = useState('');
    const [email,SetEmail] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

    function onSubmitFindId (event) {
        event.preventDefault();

        fetch(`/api/user/find/iD/${username}/${email}`, {
            method: 'GET',})
        .then(response=>{
        if (response.ok)
            return response.text()
        else
            throw new Error(response.status);
        })
        .then(userid=>setMessage("아이디 : " + userid))
        .catch(error=>setMessage("사용자가 없습니다."));
    }

    return(
        <div>
            <main>
                <h1>아이디 찾기</h1>
                <form onSubmit={onSubmitFindId}>
                    <div className="form-group">
                        <label htmlFor="username">닉네임</label>
                        <input type="text" id="username" name="nickname" 
                        value={username} onChange={(e) =>SetUsername(e.target.value)}
                        required></input>
                        <label htmlFor="email">이메일</label>
                        <input type="email" id="email" name="email" 
                        value={email} onChange={(e)=>SetEmail(e.target.value)}
                        required></input>
                    </div>
                    <button type="submit">조회</button>
                </form>
                <h3>조회 결과</h3>
                <div id="resultContainer">
                    {message}
                </div>
                <div className='navigate-options'>

                    <Link to="/findpwd">비밀번호 찾기</Link>
                    <Link to="/login">로그인</Link>
                    
                </div>

            </main>
        </div>
    );
}
export default FindID;