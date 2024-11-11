import React,{useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './FindID_PWD.css';

const FindID = () => {
    const [username,SetUsername] = useState('');
    const [email,SetEmail] = useState('');
    const [userid,SetUserid] = useState(null);
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
        .then(userid=>SetUserid(userid))
        .catch(error=>console.log("아이디 없음"));
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
                    {
                        userid!=null&&userid!=''&&
                        <div>아이디 : {userid}</div>
                    }
                    {
                        userid!=null&&userid==''&&
                        <div>존재하지 않는 정보입니다.</div>
                    }
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