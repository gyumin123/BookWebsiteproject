import React , {useState,useEffect} from "react"
import {Link,useParams,useNavigate} from "react-router-dom";
import BookData from '../Data/book.json';
import BookImg from '../Data/book.jpg';
import {generateStars,Popup} from '../Data/function';
import BookDetail from '../BookDetail/BookDetail'
import './BookInfo.css'
const BookInfo = () => {

    const { id } = useParams();
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
            //로그인 된 상태가 아니라면 먼저 로그인 할 수 있게 함
             fetch('/api/user/state', { method: 'GET' })
                 .then((response) => response.text())
                 .then((id)=>{
                 if (id == '')
                 //아이디가 없을 경우
                 {
                    setMessage("로그인 먼저 해주세요!");
                    setPopupOpen(true);
                 }
                 else
                 {
                 GetSubscribe(id);
                 if (isSubscribed)
                    //아직 구현 안함
                    navigate('/read');
                 }
                  });
            setButtonText("닫기");
            setClicked(true);
         }
         else
         {
            setButtonText("구매하기");
            setClicked(false);
         }
    }
    function GetBookDetail()
    {
        useEffect(()=>
        {
        // 가져 와야 될 것 : 제목,평점,짧은 설명,줄거리,구매 수,찜한 횟수,장바구니에 담긴 횟수
            setBook(BookData[id]);
//            fetch('/api/book/${id}', {
//                method: 'GET',
//            })
//            .then(response=>response.text())
//            .then(data => SetBook(data))
//            .catch(error=>console.log(error))
        },[])

    }
    GetBookDetail();
    function GetSubscribe(id)
    {
        fetch(`/api/subscribe/${id}`, {
            method: 'GET',
        })
        .then(response=>response.text())
        .then(data => data=='true'?setSubscribe(true):setSubscribe(false))
        .catch(error=>console.log(error))
    }

    return (
        <div class="container">
        {
            popupOpen &&
            <Popup
                message={message}
                buttonMessage={["이동","취소"]}
                onConfirm={()=>{navigate('/login');}}
                onCancel={()=>{window.location.reload();}}
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