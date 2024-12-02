import React , {useState,useEffect,useContext} from "react"
import {Link,useNavigate} from "react-router-dom";
import {Popup,calPrice} from '../Data/function';
import './BookDetail.css'
import {UserContext} from '../../UserContext';


function BookDetail({id,price}){
    const [purchaseType, setPurchaseType] = useState('대여'); // 'buy' 또는 'rent' 상태 관리
    const [period,setPeriod] = useState('');
    const navigate = useNavigate();
    const [popupOpen,SetOpen] = useState(false);
    const [message,SetMessage] = useState("");
    const {userid} = useContext(UserContext);
    const [totalPrice,setTotalPrice] = useState(0);
    const handlePurchaseTypeChange = (event) => {
    setPurchaseType(event.target.value);
    setPeriod('');
    };
    const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    setTotalPrice(calPrice(purchaseType,price,event.target.value));
    }

    function onSubmitPurchase()
    {
        const purchaseData = [{userid,id,period,price:totalPrice,purchaseType}]
    //구매 옵션 보내기
        fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseData)
        })
        .catch(error=>console.log(error))
        navigate('/purchase');

    }
    function onSubmitCart()
    {
        //장바구니 옵션 보내기
        fetch('/api/user/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id,userid,purchaseType,period,price:totalPrice})
        })
        .catch(error=>console.log(error))
        SetOpen(true);
        SetMessage("장바구니로 이동하시겠습니까?");
    }

return (
    <div className="container">
    {
        popupOpen &&
        <Popup
            message={message}
            onClickFunction={[()=>navigate('/cart'),()=>window.location.reload()]}
            buttonMessage={["이동","취소"]}
        />
    }

        <div className="purchase-type">
            <label for="purchase-option">구매 분류</label>
            <select id="purchase-option" name="purchase-option"
            value = {purchaseType} onChange={handlePurchaseTypeChange}>
                <option value='대여' selected>대여</option>
                <option value='소장'>소장</option>
            </select>
        </div>

        {
            purchaseType == '대여' &&(
            <div className="period" id="rental-period">
                <label for="rental-days">대여 일수</label>
                <select id="rental-days" name="rental-days"
                value = {period} onChange={handlePeriodChange} >
                    <option value="" selected disabled>옵션을 선택하세요</option>
                    <option value="7">7일</option>
                    <option value="14">14일</option>
                    <option value="30">30일</option>
                </select>
            </div>)
        }
        {
            purchaseType == '소장' &&(
            <div className="period" id="rental-period">
                <label for="buy-days">구매</label>
                <select id = "buy-days" name="buy-days"
                value = {period} onChange={handlePeriodChange}>
                    <option value="" selected disabled>옵션을 선택하세요</option>
                    <option value="0" >-</option>
                </select>
            </div>
            )
        }
        {
            period != '' && purchaseType!='' &&
            <div className="total">
                <label for="total-type">{purchaseType}</label>
                <label for="total-period">{period}</label>
                <label for="total-price">{totalPrice}</label>
                <button className="init-data"
                onClick = {()=>{setPeriod('');setPurchaseType('대여')}}>
                삭제하기
                </button>
                <button className="wish-button" onClick = {()=>{onSubmitCart()}}>장바구니</button>
                <button className="buy-button" onClick = {()=>{onSubmitPurchase()}}>구매하기</button>
            </div>
        }
    </div>
)
}
export default BookDetail;