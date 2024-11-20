import React ,{useState,useEffect,useContext}from "react"
import './purchaseHistory.css';
import {UserContext} from '../../UserContext'

const PurchaseHistory = () => {

    //한 페이지당 5개씩 보여주기
    const perpage = 5;

    const [purchaseTotalPage,setPurchaseTotalPage] = useState(0);
    const [purchaseCurrentPageNumber,setCurrentPageNumber] = useState(1);
    const [PurchaseHistory,setPurchaseHistory] = useState([]);
    const {userid} = useContext(UserContext)
        useEffect(() => {
            // 총 페이지 수 가져오기
            fetch(`/api/user/history/purchase/totalPage/${userid}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status);
            else
                return response.text();
            })
            .then(pages => {
                setPurchaseTotalPage(parseInt(pages)); // 문자열을 숫자로 변환하여 상태에 저장
            })
            .catch(error => console.error('Error fetching total pages:', error));

            const start = (purchaseCurrentPageNumber-1)*perpage;

            fetch(`/api/user/history/purchase/${userid}/${start}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status)
            else
                return response.json()
            })
            .then(data => {
                setPurchaseHistory(data.slice(0,perpage));
            })
            .catch(error => console.error(error));
        }, [purchaseCurrentPageNumber]);
    

    return(
        <div>
            <main><h1>구매/대여 내역</h1>
        <section id="purchaseHistory">
            <h2>구매 내역</h2>
            <table>
                <thead>
                    <tr>
                        <th>도서명</th>
                        <th>구매 날짜</th>
                        <th>가격</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {
                        PurchaseHistory.length>0 &&
                        PurchaseHistory.map((post) => (
                            <tr key={post.bookname}>
                                <td>{post.date}</td>
                                <td>{post.price}</td>
                                <td>{post.state}</td>
                            </tr>
                        ))
                    }
                    </tr>
                    <tr>

                    </tr>
                </tbody>
            </table>
                {Array.from({ length: purchaseTotalPage }, (_, index) => (
                            <span
                                key={index + 1}
                                onClick={() => setCurrentPageNumber(index + 1)}
                                style={{
                                    fontWeight: setCurrentPageNumber === index + 1 ? 'bold' : 'normal',
                                    margin: '0 5px',
                                    cursor:"pointer"
                                }}>
                            {index + 1}
                        </span>
                    ))}
        </section>

        <section id="rentalHistory">
            <h2>대여 내역</h2>
            <table>
                <thead>
                    <tr>
                        <th>도서명</th>
                        <th>대여 시작일</th>
                        <th>대여 종료일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                    <tr>

                    </tr>
                </tbody>
            </table>
        </section>
    </main>
        </div>
    )
}
export default PurchaseHistory;