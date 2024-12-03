import React , {useState,useEffect,useContext} from "react"
import {Link, Route, useNavigate} from "react-router-dom";
import './mainbanner.css';
import HomeImg from './image/icon_home.png';
import SearchImg from './image/icon_search.png';
import NoneUserImg from './image/icon_user.png';
import BasicImg from './image/profile-basic.png';
import {UserContext} from '../../UserContext';
import BookData from '../Data/book.json';


const Header = () => {
    const [UserImg,setUserImg] = useState('');
    const navigate = useNavigate();
    const [isUserTapHovered,setUserTapHovered] = useState(false);
    const { userid,setUserid } = useContext(UserContext);
    const [searchView,setSearchView] = useState(false);
    const [pageMove,setPageMove] = useState("/");
    const basicOption = {
        "홈":{authority:null,url:"/"},
        "로그인": {authority:false,url:"/login"},
        "회원가입":{authority:false,url:"/membership"},
        "아이디 찾기":{authority:false,url:"/findId"},
        "비밀번호 찾기":{authority:false,url:"/findPwd"},
        "마이페이지":{authority:true,url:"/mypage"},
        "비밀번호 변경":{authority:true,url:"/mypage"},
        "로그인 기록 보기":{authority:true,url:"/mypage/myhistory"},
        "구매 기록 보기":{authority:true,url:"/mypage/purchasehistory"},
        "장바구니":{authority:true,url:"/cart"},
        "이용권":{authority:true,url:"/subscribe"},
        "고객센터":{authority:null,url:"/support"},
        "분야별 책 보기":{authority:null,url:"/classification?category=1&sep=1"},
        "테마별 책 보기":{authority:null,url:"/classification?category=2&sep=1"},
        "인기 책 보기":{authority:null,url:"/classification?category=3&sep=1"},
        "그룹":{authority:null,url:"/group"},
    }
    const bookOption = BookData.reduce((acc, book,id) => {
        const key = `책 : ${book.title}`;
        acc[key] = {authority:null,url:`/book/${id+1}`};
        return acc;
    }, {});
    const [viewMenuOption,setViewMenuOption] = useState({});

    const [selectedmenuOption,setSelectedMenuOption] = useState("");
    const [menuState,setMenuState] = useState(false);

    //로그인 되었는지 안되었는지 체크
//사용자의 이미지가 없으면 시스템 기본 이미지 저장
    function getImg(){
        if (userid == null)
            setUserImg(NoneUserImg);
        else
        {
             fetch(`/api/user/image/${userid}`, { method: 'GET' })
                 .then((response) => {
                 if (!response.ok)
                    throw new Error(response.status)
                 return response.blob()
                 })
                 .then((blob)=>{setUserImg(URL.createObjectURL(blob))})
                 .catch((error)=>{setUserImg(BasicImg)});
        }
    }
    function getOption(){
        let option = {...basicOption,...bookOption};
        const filteredMenu = Object.fromEntries(
            Object.entries(option).filter(([key, value]) => {
                if (userid == null && value.authority === true)
                    return false;
                if (userid != null && value.authority === false)
                    return false;
                return key.includes(selectedmenuOption);
            })
        );
        setViewMenuOption(filteredMenu);
    }
    useEffect(()=>{
        getImg();
    },[userid]);
    useEffect(() => {
        getOption();
    }, [menuState]);

    function Logout(){
            fetch(`/api/user/logout`, {method: 'POST' })
            .then(()=> {
                navigate("/");
                setUserid(null);
            })
            .catch((error)=>console.error(error));
    }
    function handleSearchSection(value){
        setSelectedMenuOption(value);
        setMenuState(!menuState);
        let options = {...basicOption,...bookOption};
        if (options[value] != null)
            setPageMove(options[value].url);
    }
    // hover 되었을 때
    function HoverEnter(){
        setUserTapHovered(true);
    }
    function HoverLeave(){
        setUserTapHovered(false);
    }
    function onPageMove(){
        let options = {...basicOption,...bookOption}
        if (selectedmenuOption === "")
            navigate("/")
        else
            navigate(options[selectedmenuOption].url)
    }
    return (
        <div className = "mainbannerbody">
            <header className = "mainbannerheader">
                <div className="header-left">
                    <section id="searchSection" onMouseLeave={()=> {
                        setSearchView(false)
                    }}>
                        <h2 style={{cursor:"pointer"}} onClick={()=>navigate("/")}>Book & Y</h2>
                        <div className="search-container">
                            <div className="search-header">
                                <input
                                    type="text"
                                    placeholder="빠른 검색"
                                    value={selectedmenuOption}
                                    onChange={(e)=>handleSearchSection(e.target.value)}
                                    onClick={()=> {
                                        setSearchView(true)
                                        setMenuState(!menuState);
                                    }}
                                >
                                </input>
                                <a href={pageMove}>
                                    <img src={SearchImg} alt="Search Icon" style={{height: 20}}></img>
                                </a>
                                {
                                    searchView &&
                                    <div className="search-menu">
                                        {
                                            Object.keys(viewMenuOption).map((menu) => (
                                                <span onClick={(e) => {
                                                    setSelectedMenuOption(menu)
                                                    handleSearchSection(menu)
                                                }}>{menu}</span>
                                            ))
                                        }
                                    </div>

                                }

                            </div>
                        </div>
                    </section>
                </div>
                <div className="header-icons">
                    <Link to="/" className="icon">
                        <img src={HomeImg} alt="Home Icon" style={{height: 20}}></img>
                    </Link>
                    <div className="icon" onMouseEnter={HoverEnter} onMouseLeave={HoverLeave}>
                        <button className="icon">
                            <img src={UserImg} alt="User Icon" id="userimg"></img>
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
                    <a href="/group">클럽</a>
                </div>
            </header>
        </div>
    );
}
export default Header;
