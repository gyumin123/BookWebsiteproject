import React , {useState,useEffect} from "react"
import {Link,useParams,useNavigate} from "react-router-dom";
import BookData from '../Data/book.json';
import BookImg from '../Data/book.jpg';
import {generateStars,calPrice,Popup,totalPrice} from '../Data/function';
import BookDetail from '../BookDetail/BookDetail'
import Data from '../Data/cart.json';
import './Purchase.css'

const Purchase = () => {
    const [PurchaseData,setPurchaseData] = useState([]);
    const [isPopupOpen,setPopupOpen] = useState(false);
    const navigate = useNavigate();
    function GetPurChase()
    //구매목록 가져오기
    {
        useEffect(()=>
        {
           //서버에서 할일 : 세션에 저장된 유저 아이디를 가져와 장바구니 정보를 가져오기
            fetch(`/api/cart`, {
                method: 'GET',
            })
            .then(response=>response.text())
            .then(data => setPurchaseData(data))
            .catch(error=>console.log(error))
        },[])
    }
    function Payment()
    {
           //서버에서 할일 : 세션에 저장된 유저 아이디를 가져와 장바구니 정보를 가져오기
            fetch(`/api/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Data)
            })
            .catch(error=>console.log(error))
            setPopupOpen(true);
    }

return (
<div class="container">
        <h1>구매 페이지</h1>
        {
            isPopupOpen &&
            <Popup
                message={"결제가 완료되었습니다."}
                buttonMessage = {["홈으로 이동","결제 내역으로 이동"]}
                onConfirm={()=>{navigate('/');}}
                onCancel={()=>{navigate('/mypage')}}
            />
        }
        <div class="content-section">
            <div class="section-title">결제내용
                <table class="payment-table">
                    <thead class="payment-info">
                        <tr>
                            <th>책 제목</th>
                            <th>구분</th>
                            <th>수량</th>
                            <th>상품금액</th>
                        </tr>
                    </thead>
                    <tbody class = "payment-item">
                    {
                        Data.map((item,index)=>(
                            <tr class="selectedItem">
                                <td>{item.title}</td>
                                <td>{item.purchaseType}</td>
                                <td>{item.period}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td >결제 예정 금액</td>
                            <td></td><td></td>
                            <td>{totalPrice(Data)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
            <div class="section-title">결제수단 선택</div>
            <div class="payment-method">
                <input type="radio" id="card" name="payment-method" checked></input>
                <label for="card">카드결제</label>
                <div class="card-box">
                    <span class="card-register">카드 등록</span>
                </div>
            </div>


            <div class="other-payment">
                <input type="radio" id="other" name="payment-method"></input>
                <label for="other">다른 결제수단</label>

                <div class="checkbox-group">
                    <label>
                        <input type="checkbox"></input>
                        약관에 동의합니다.
                    </label>
                </div>
            </div>


            <div class="buttons">
                <button class="cancel-button" onClick={()=>navigate('/')}>취소</button>
                <button class="next-button" onClick={Payment}>결제</button>
            </div>
        </div>
)
}
export default Purchase;
