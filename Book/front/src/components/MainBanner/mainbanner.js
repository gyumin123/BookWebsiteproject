import React , {useState,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
// import './mainbanner.css';


const MainBanner = () => {
    const [inputValue,setInputValue] = useState('');
    const [userid,setUserid] = useState(1234);
    const [UserImg,setUserImg] = useState('');
    const navigate = useNavigate();
    const [isUsertapHoverd,setUsertapHovered] = useState(false);

    //로그인 되었는지 안되었는지 체크
    const IsLogged = () => {
        useEffect(() => {
            // fetch('/api/user/state', { method: 'GET' })  // 명시적으로 GET 요청
            //     .then(response => response.text())   // 서버에서 이미지 경로를 텍스트로 받음
            //     .then(userid=>{setUserid(userid);})    // 이미지 경로를 상태에 저장
            //     .catch(setUserImg('image/icon_user.png'));
            setUserImg('image/icon_user.png');
        })
    
};
//사용자 이미지 가져오기
//사용자의 이미지가 없으면 시스템 기본 이미지 저장
    const GetImg = (userid) => {
        fetch('/api/user/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid})
        })
        .then(response => response.blob())
        .then(data => {setUserImg(URL.createObjectURL(data))})
        .catch(setUserImg('img/background.'))
    }
    const Logout = (userid) => {
            fetch(`/api/user/logout`, {method: 'POST' })
            .then(navigate('/'))

        //현재 페이지 리다이렉트
        navigate('/');
        console.log("logout");
    }

    const handleChange = (e)=>{
        setInputValue(e.target.value);
    };
    // hover 되었을 때
    const HoverEnter = () => {
        setUsertapHovered(true);
    }
    const HoverLeave = () => {
        setUsertapHovered(false);
    }
    //함수 실행
    IsLogged();
    return (
        <div className = "mainbannerbody">
            <header className = "mainbannerheader">
                <div className="header-left">
                    <section id="searchSection">
                        <h2>BookWeb</h2> 
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="검색어 입력"
                                value={inputValue}
                                onChange={handleChange}
                            >
                            </input>
                            <button className="search-icon">
                                <img src='image/icon_search.png' salt="Search Icon" style={{height:20}}></img>
                            </button>
                        </div>
                    </section>
                </div>
                <div className="header-icons">
                    <Link to="/" className="icon">
                        <img src='image/icon_home.png'alt="Home Icon"style={{height:20}}></img>
                    </Link>
                    <div className="icon" onMouseEnter={HoverEnter} onMouseLeave={HoverLeave}>
                    <button className="icon">
                        <img src={UserImg} alt="User Icon"style={{height:20}}></img>
                    </button>
                    {
                        isUsertapHoverd && 
                        <div className = "usertap">
                            {userid==null?(
                                <div>
                                    <ul>
                                        <li><Link to="/login">로그인</Link></li>
                                        <li><Link to="/membership">회원가입</Link></li>
                                    </ul>
                                </div>
                            ):
                            //로그인 된 상태일 때
                            (
                            <div>
                                <ul>
                                    <li><Link to={`/mypage?userid=${userid}`}>마이페이지</Link></li>
                                    {/* 아직 구현 안함 */}
                                    <li><span type="text">이용권</span></li>
                                    <li><span type="text" style={{cursor:"pointer"}} onClick={Logout}>로그아웃</span></li>
                                </ul>
                            </div>
                            )}
                        </div>
                    }
                    </div>
                </div>
                    <div className="nav-bar">
                    {/* 아직 구현 안한 부분 */}
                    <a href="#">분야별</a>
                    <a href="#">테마별</a>
                    <a href="#">인기</a>
                    <a href="#">클럽</a>
                </div>
            </header>
        </div>
    );
}
export default MainBanner;