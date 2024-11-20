import React , {useState,useEffect,useContext} from "react"
import {Link,useParams,useNavigate,useLocation} from "react-router-dom";
import {generateStars,Popup} from '../Data/function';
import BookData from '../Data/book.json';
import BookDetail from '../BookDetail/BookDetail'
import './BookInfo.css'
import {UserContext} from '../../UserContext'
import BookImg from '../Data/book.jpg'

const BookInfo = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = parseInt(searchParams.get("id"));
    const {userid} = useContext(UserContext);

    const [Book,setBook] = useState({});
    const navigate = useNavigate();

    const [Clicked, setClicked] = useState(false);
    const [buttonText,setButtonText] = useState("구매하기");
    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [isSubscribed,setSubscribe] = useState(false);


    function onHandleAction()
    {
         if (buttonText == "구매하기")
         {
                 if (userid == null)
                 //아이디가 없을 경우
                 {
                    setMessage("로그인 먼저 해주세요!");
                    setPopupOpen(true);
                 }
                 else
                 {
                 GetSubscribe(userid);
                 if (isSubscribed)
                    //아직 구현 안함
                    navigate('/read');
                 }
            setButtonText("닫기");
            setClicked(true);
         }
         else
         {
            setButtonText("구매하기");
            setClicked(false);
         }
    }
    useEffect(()=>
    {
    // 가져 와야 될 것 : 제목,평점,짧은 설명,줄거리,구매 수,찜한 횟수,책 이미지,장바구니에 담긴 횟수

        fetch(`/api/book/${id}`, {
            method: 'GET',
        })
        .then(response=>{
        if (!response.ok)
            throw new Error(response.status)
        else
            return response.json();
        })
        .then(data => setBook(BookData[id]))
        .catch(error=>setBook(BookData[id]))
    },[])
    function GetSubscribe(userid)
    {
        fetch(`/api/subscribe/${userid}`, {
            method: 'GET',
        })
        .then(response=>response.text())
        .then(data => data=='true'?setSubscribe(true):setSubscribe(false))
        .catch(error=>console.log(error))
    }
    return (
        <div class="container_2">
        {
            popupOpen &&
            <Popup
                message={"로그인 먼저 해주세요"}
                buttonMessage={["이동,취소"]}
                onClickFunction={[()=>{navigate('/login');},()=>{window.location.reload();}]}
            />
        }
            <div class="book-header">
                <div class="book-image">
                    <img src={BookImg} alt="책 제목"></img>
                </div>
                <div class="book-info">
                    <h2 class="book-title">{Book.title}</h2>
                    <h4 class="book-author">{Book.author}</h4>
                    <div class="book-rating">
                        <span class="rating-value">{Book.rating}</span>
                        <span class="rating-stars">{generateStars(Book.rating)}</span>
                    </div>
                    <div class="book-meta">
                        <span>구매수: {Book.buys}회</span> · <span>장바구니 : {Book.hearts}</span> · <span>리뷰 : {Book.reviews}개</span>
                    </div>

                    <div class="book-description">
                        {Book.description}
                    </div>
                    <div class="book-price">
                        <h3><strong>가격:{Book.rating*10000}</strong></h3>
                    </div>
                    <div class="book-actions">
                        {
                            Clicked == true &&
                            <BookDetail
                            id = {id}
                            price = {Book.rating*10000}
                            />
                        }
                        <button class="open-button" onClick = {()=>{onHandleAction()}}>{buttonText}</button>
                    </div>
                </div>
            </div>

            <div class="book-details">
                <div class="book-summary">
                    요약 들어갈 자리
                    {Book.summary}
                </div>
            </div>

        </div>
    )
}
export default BookInfo;
