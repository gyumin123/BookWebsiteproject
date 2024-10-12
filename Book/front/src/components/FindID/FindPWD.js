import React,{useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './FindID_PWD.css';

const FindPWD = () => {
    const [userid,SetUserid] = useState('');
    const [success,SetSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/user/validID/${userid}`, {
            method: 'GET'
        })
        .then(()=>{SendPwd();SetSuccess(true)})
        .catch(()=>{SetSuccess(false);})
        SetSuccess(true);
    }
    //임시 비밀번호 보내기
    const SendPwd = () => {
        fetch(`/api/user/find/pwd/${userid}`, {
            method: 'POST',
        })
        .then(()=>{})
        .catch(()=>{})
    }

    return(
        <div>
            <main>
                <h1>비밀번호 찾기</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userid">아이디</label>
                        <input type="text" id="userid" name="userid" 
                        value={userid} onChange={(e) =>SetUserid(e.target.value)}
                        required></input>
                    </div>
                    <button type="submit">조회</button>
                </form>
                <h3>조회 결과</h3>
                <div id="resultContainer">
                    {
                        success === true &&
                        <div>유효한 아이디<br></br>이메일로 임시 비밀번호가 전송되었습니다.</div>
                    }
                    {
                        success === false &&
                        <div>존재하지 않는 아이디입니다.</div>
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
export default FindPWD;