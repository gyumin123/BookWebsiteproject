import React ,{useState }from "react"
import { useSearchParams } from "react-router-dom";
import './purchaseHistory.css';

const PurchaseHistory = () => {
    const [searchParams] = useSearchParams();
    const userid = searchParams.get('userid');

    //한 페이지당 5개씩 보여주기
    const perpage = 5;
    const totalPage = 10;

    const [purchasecurrentpageNumber,setcurrentpageNumber] = useState(1);
    const [PurchaseHistory,SetPurchaseHistory] = useState([]);
    

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
                {Array.from({ length: totalPage }, (_, index) => (
                            <span
                                key={index + 1}
                                onClick={() => setcurrentpageNumber(index + 1)}
                                style={{
                                    fontWeight: purchasecurrentpageNumber === index + 1 ? 'bold' : 'normal',
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