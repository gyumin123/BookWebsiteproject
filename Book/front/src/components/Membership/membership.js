import React , {useState,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
import './membership.css';

const Membership = () => {
    const [userid, SetUserid] = useState('');
    const [password, SetPassword] = useState('');
    const [checkpwd, SetCheckPwd] = useState('');
    const [phoneNumber, SetPhoneNumber] = useState('');
    const [name,SetUsername] = useState('');
    const [email,SetEmail] = useState('');

    //0->초기, 1->중복 에러, 2-> 통과
    const [idError,SetIDError] = useState(0);
    const [pwdError,SetPwdError] = useState(0);
    const [idErrorMsg,SetErrorMsg] = useState('');
    

    const navigate = useNavigate();
    
    function onSubmitMembership(event){
        event.preventDefault();
        if ((idError === 0)){
            SetIDError(1);
            SetErrorMsg('아이디 중복 검사를 완료해주세요!');
        }
        fetch('/api/user/membership', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid,password,phoneNumber,email,name,
            profile_img:"image/profile/profile-basic.png"})
        })
        .then(navigate('/'))
        .catch(error=>console.error(error))
    }
    function isValidID(event){
        event.preventDefault();
        fetch(`/api/validID/${userid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        //있는 유저라면?
        .then((response)=>{
        if (response.ok)
            SetIDError(2);
        else
            {SetIDError(1);
            SetErrorMsg('이미 존재하는 아이디입니다.')
            }})
    }
    return (
        <div className="main">
            <div className="form-container">
                    <form id="idfrom" onSubmit={isValidID}>
                        <div className="form-group">
                            <label htmlFor="username">아이디</label>
                            <input type="text" id="userid" name="username" 
                            value={userid} onChange={(e)=>{SetIDError(0);SetUserid(e.target.value)}} 
                            required></input>
                            <button type="submit" className="check-btn">중복 확인</button>
                            {
                                idError === 1 &&
                                <div>{idErrorMsg}</div>
                            }
                        </div>
                    </form>
                    <form onSubmit={onSubmitMembership}>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" name="password" 
                        value={password} onChange={(e)=>{SetPwdError(false);SetPassword(e.target.value)}}
                        required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">비밀번호 확인</label>
                        <input type="password" id="confirm_password" name="confirm_password"
                        value={checkpwd} onChange={(e)=>{SetPwdError(false);SetCheckPwd(e.target.value)}}
                        onMouseLeave={()=>{
                            if (password !== checkpwd)
                                SetPwdError(1);
                            else
                                SetPwdError(2);
                        }}
                        required></input>
                        {
                                pwdError === 1&&
                                <div>비밀번호가 동일하지 않습니다.</div>
                        }
                    </div>
                        <div className="form-group">
                            <label htmlFor="phone">전화번호</label>
                            <input type="tel" id="phone" name="phone" 
                            value={phoneNumber} onChange={(e)=>SetPhoneNumber(e.target.value)}
                            required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">닉네임</label>
                            <input type="text" id="username" name="username" 
                            value={name} onChange={(e)=>SetUsername(e.target.value)}
                            required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input type="email" id="email" name="email" 
                            value={email} onChange={(e)=>SetEmail(e.target.value)}
                            required></input>
                        </div>
                        <button type="submit" className="submit-btn">가입 완료</button>
                    </form>
            </div>
        </div>
    );
}
export default Membership;