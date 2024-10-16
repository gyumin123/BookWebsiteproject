import React,{useState,useEffect} from "react"
import { Link,useNavigate } from "react-router-dom";
import './login.css';
const Login = () => 
{
    const [userid, SetUserid] = useState('');
    const [password, SetPassword] = useState('');
    const [error,SetError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid,password})
        })
        .then(navigate('/'))
        //로그인 정보가 올바르지 않으면 에러창 띄우기
        .catch(SetError(true));
    }

    return(
        <div className="login-container">
            <h2>BookWeb</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {
                    error?(
                        <div>
                        아이디나 패스워드가 올바르지 않습니다.
                        <button type="text" onClick={()=>SetError(!error)}>로그인 다시하기</button>
                        </div>
                    ):
                    (
                        <div>
                            <label htmlFor="username">id</label>
                            <input type="text" id="username" name="username" placeholder="아이디를 입력하세요" required
                            value={userid} onChange={(e)=>SetUserid(e.target.value)}></input>

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required
                            value={password} onChange={(e)=>SetPassword(e.target.value)}></input>
                            <button type="submit">로그인</button>
                        </div>
                    )
                }
            </form>
            <div className="login-options">
                <Link to="/membership">회원가입</Link>
                <Link to="/findID">아이디/비밀번호 찾기</Link>
            </div>
        </div>
    );
}
export default Login;
