import React , {useState,useEffect,useContext} from "react"
import {useNavigate} from "react-router-dom";
import {Popup,totalPrice} from '../Data/function';
import './Purchase.css'
import {UserContext} from '../../UserContext';
import BookData from '../Data/book.json'

const Purchase = () => {
    const [PurchaseData,setPurchaseData] = useState([]);
    const [isPopupOpen,setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const {userid} = useContext(UserContext);

    useEffect(()=>
    {
        fetch(`/api/purchase/${userid}`, {
            method: 'GET',
        })
        .then(response=>{
        if (!response.ok)
            throw new Error(response.status)
        else
            return response.json()
        })
        .then(data => setPurchaseData(data))
        .catch(error=>console.log(error))
    },[userid])
    function Payment(item)
    {
        fetch(`/api/user/purchase/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
        .catch(error=>console.log(error))
        setPopupOpen(true);
    }
    function onPaymentSubmit(){
        for (const item of PurchaseData)
            Payment(item);
    }

return (
<div class="container">
        <h1>구매 페이지</h1>
        {
            isPopupOpen &&
            <Popup
                message={"결제가 완료되었습니다."}
                buttonMessage = {["홈으로 이동","결제 내역으로 이동"]}
                onClickFunction={[()=>{navigate('/');},()=>navigate('/mypage')]}
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
                        PurchaseData.map((item,index)=>(
                            <tr class="selectedItem">
                                <td>{item.id === 100000? "이용권":item.id != null?BookData[item.id-1].title:"비어 있음"}</td>
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
                            <td>{totalPrice(PurchaseData)}</td>
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
                <button class="next-button" onClick={onPaymentSubmit}>결제</button>
            </div>
        </div>
)
}
export default Purchase;
