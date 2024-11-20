import React,{useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './FindID_PWD.css';

const FindPWD = () => {
    const [userid,SetUserid] = useState('');
    const [success,setSuccess] = useState(null);
    const navigate = useNavigate();

    function isValidId(event){
        event.preventDefault();
        fetch(`/api/validID/${userid}`, {
            method: 'GET'
        })
        .then((response)=>{
        if (response.ok)
            throw new Error('없는 아이디');
        else
            setSuccess(true);
        })
        .catch(()=>{setSuccess(false);})
    }
    //임시 비밀번호 보내기
    function sendPwd(){
        fetch(`/api/user/find/pwd/${userid}`, {
            method: 'POST',
        })
    }

    return(
        <div>
            <main>
                <h1>비밀번호 찾기</h1>
                <form onSubmit={isValidId}>
                    <div className="form-group">
                        <label htmlFor="userid">아이디</label>
                        <input type="text" id="userid" name="userid" 
                        value={userid} onChange={(e) =>{setSuccess(null);SetUserid(e.target.value)}}
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