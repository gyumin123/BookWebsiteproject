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
    const {id} = useParams();
    const {userid} = useContext(UserContext);

    const [Book,setBook] = useState({});
    const navigate = useNavigate();

    const [Clicked, setClicked] = useState(false);
    const [buttonText,setButtonText] = useState("구매하기");
    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [SubscribeState,setSubscribe] = useState(false);

    function onHandleAction()
    {
         if (buttonText === "구매하기")
         {
                 if (userid == null)
                 //아이디가 없을 경우
                 {
                    setMessage("로그인 먼저 해주세요!");
                    setPopupOpen(true);
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
        setBook(BookData[id-1]);
    },[])

    useEffect(()=>{
        isSubscribe();
    },[userid])

    function isSubscribe(){
        fetch(`/api/user/history/purchase/${userid}/${0}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok)
                    throw new Error(response.status)
                else
                    return response.json()
            })
            .then(data => {
                for(const item of data)
                {
                    if (item.purchaseType === "구독") {
                        setSubscribe(true);
                        return;
                    }
                    if (item.id == id)
                    {
                        setSubscribe(true);
                        return;
                    }
                }
            })
            .catch(error => console.error(error));
    }
    return (
        <div className="container_2">
        {
            popupOpen &&
            <Popup
                message={"로그인 먼저 해주세요"}
                buttonMessage={["이동,취소"]}
                onClickFunction={[()=>{navigate('/login');},()=>{window.location.reload();}]}
            />
        }
            <div className="book-header">
                <div className="book-image">
                    <img src={BookImg} alt="책 제목"></img>
                </div>
                <div className="book-info">
                    <h2 className="book-title">{Book.title}</h2>
                    <h4 className="book-author">{Book.author}</h4>
                    <div className="book-rating">
                        <span className="rating-value">{Book.rating}</span>
                        <span className="rating-stars">{generateStars(Book.rating)}</span>
                    </div>

                    <div className="book-description">
                        {Book.description}
                    </div>
                    <div className="book-price">
                        <h3><strong>가격:{Book.rating*10000}</strong></h3>
                    </div>
                    <div className="book-actions">
                        {
                            Clicked === true &&
                            <BookDetail
                            id = {id}
                            price = {Book.rating*10000}
                            />
                        }
                        {
                            SubscribeState &&
                            <button className="open-button" onClick={() => navigate(`/view/${id}`)}>책 읽기</button>
                        }
                        {
                            !SubscribeState &&
                            <button className="open-button" onClick = {()=>{onHandleAction()}}>{buttonText}</button>
                        }
                    </div>
                </div>
            </div>

            <div className="book-details">
                <div className="book-summary">
                    요약 들어갈 자리
                    {Book.summary}
                </div>
            </div>

        </div>
    )
}
export default BookInfo;
