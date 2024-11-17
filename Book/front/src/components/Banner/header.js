import React , {useState,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom";
import './mainbanner.css';


const Header = () => {
    const [inputValue,setInputValue] = useState('');
    const [userid,setUserid] = useState(null);
    const [UserImg,setUserImg] = useState('');
    const navigate = useNavigate();
    const [isUserTapHovered,setUserTapHovered] = useState(false);

    IsLoggedIn();
    //로그인 되었는지 안되었는지 체크
    function IsLoggedIn()  {
        useEffect(() => {
             fetch('/api/user/states', { method: 'GET' })
                 .then((response) => {
                 if (response.ok)
                    return response.text();
                 else
                    throw new Error(response.status);
                 })
                 .then((userid)=>{setUserid(userid);getUserImage(userid)})
                 //없다면 아이콘 저장
                 .catch(error => setUserImg('/image/icon_user.png'));
        },[])
};
//사용자의 이미지가 없으면 시스템 기본 이미지 저장
    const getUserImage = (userid) => {
        fetch(`/api/user/image/${userid}`, {
            method: 'GET',
        })
        .then(response=>{
            if(response.ok)
                return response.text();
            else
                throw new Error(response.status);
        })
        .then(text=>setUserImg(text))
        .catch(error=>setUserImg('/image/background.png'));
    }
    function Logout(){
            fetch(`/api/user/logout`, {method: 'POST' })
            .then(navigate('/'))
    }

    function handleSearchSection(e){
        setInputValue(e.target.value);
    };
    // hover 되었을 때
    function HoverEnter(){
        setUserTapHovered(true);
    }
    function HoverLeave(){
        setUserTapHovered(false);
    }
    //함수 실행

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
                                onChange={handleSearchSection}
                            >
                            </input>
                            <button className="search-icon">
                                <img src='image/icon_search.png' alt="Search Icon" style={{height:20}}></img>
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
                        isUserTapHovered &&
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
                                    <li><a href='/mypage'>마이페이지</a></li>
                                    <li><a href='/cart'>장바구니</a></li>
                                    <li><a href='/subscribe'>이용권</a></li>
                                    <li><span type="text" style={{cursor:"pointer"}} onClick={Logout}>로그아웃</span></li>
                                </ul>
                            </div>
                            )}
                        </div>
                    }
                    </div>
                </div>
                    <div className="nav-bar">
                    <a href="/classification?category=1&sep=1">분야별</a>
                    <a href="/classification?category=2&sep=1">테마별</a>
                    <a href="/classification?category=3&sep=1">인기</a>
                    <a href="#">클럽</a>
                </div>
            </header>
        </div>
    );
}
export default Header;