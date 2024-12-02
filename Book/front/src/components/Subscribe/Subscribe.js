import {useNavigate} from "react-router-dom";
import {useContext} from 'react'
import React from 'react'
import './Subscribe.css'
import {UserContext} from '../../UserContext';

const Subscribe = () => {
    const navigate = useNavigate();
    const {userid} = useContext(UserContext);
    const purchaseData = [{id:100000,userid,purchaseType:"구독",period:"30",price:"10000"}];
    function subscribe()
    {

        fetch(`/api/purchase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseData)
        })
        .catch(error=>console.log(error))

        navigate('/purchase');
    }
return (
<div class="container">

        <div class="logo">
            <h1>SUbSCRIBE</h1>
        </div>


        <div class="main-text">
            <h1>Book & Y의 모든 것을 자유롭게 사용해보세요.</h1>
            <p>오프라인 다운로드, 대여, 소장을 자유롭게 사용 보장</p>
            <p>월 10000원, 언제든지 취소 가능</p>
        </div>


        <div class="button">
            <button class="subscribe" onClick={subscribe}>정기권 구독</button>
            <p>정기 결제이며 취소 시까지 자동 청구됩니다.</p>
        </div>


        <div class="features">
            <div class="feature-item">
                <h2>자유로운 이용</h2>
                <p>대여와 소장시 별도의 결제없이 자유롭게 이용 가능합니다.</p>
            </div>
            <div class="feature-item">
                <h2>오프라인 이용</h2>
                <p>책을 오프라인 저장하여 인터넷 연결이 없어도 마음껏 감상하세요.</p>
            </div>
            <div class="feature-item">
                <h2>체계적인 플랜 관리</h2>
                <p>플랜을 설정하여 책 읽기를 체계적으로 관리하세요.</p>
            </div>
        </div>
    </div>
)
}
export default Subscribe;
