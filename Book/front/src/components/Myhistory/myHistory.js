import React, { useEffect, useState,useContext } from "react"
import './myHistory.css'
import { useSearchParams } from "react-router-dom";
import {UserContext} from "../../UserContext"

const MyHistory = () => {
    const {userid} = useContext(UserContext);

    //한 페이지당 5개씩 보여주기
    const perpage = 5;

    //초기 페이지 -> 1
    const [loginCurrentPageNumber,setLoginPageNumber] = useState(1);
    const [loginTotalPage,setLoginTotalPage] = useState(null);
    const [loginHistory,SetLoginHistory] = useState([]);

        useEffect(() => {
            // 총 페이지 수 가져오기
            fetch(`/api/user/history/login/totalpage/${userid}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status);
            else
                return response.text();
            })
            .then(pages => {
                setLoginTotalPage(parseInt(pages)); // 문자열을 숫자로 변환하여 상태에 저장
            })
            .catch(error => console.error('Error fetching total pages:', error));

            const start = (loginCurrentPageNumber-1)*perpage;

            fetch(`/api/user/histroy/login/${userid}/${start}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status)
            else
                return response.json()
            })
            .then(data => {
                SetLoginHistory(data.slice(0,perpage));
            })
            .catch(error => console.error(error));
        }, [userid,loginCurrentPageNumber]);
    return (
        <div>
            <main>
        {/* <!-- 로그인 기록 --> */}
        <section id="loginHistory">
            <h2>로그인 기록</h2>
            <table>
                <thead>
                    <tr>
                        <th>로그인 날짜</th>
                        <th>IP 주소</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        //로그인 내역 하나씩 가져오기
                        loginHistory.length > 0 &&
                        loginHistory.map((post) => (
                            <tr>
                                <td>{post.date}</td>
                                <td>{post.ip}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                {Array.from({ length: loginTotalPage }, (_, index) => (
                    <span
                        key={index + 1}
                        onClick={() => setLoginPageNumber(index + 1)}
                        style={{
                            fontWeight: loginCurrentPageNumber === index + 1 ? 'bold' : 'normal',
                            margin: '0 5px',
                            cursor:"pointer"
                        }}>
                        {index + 1}
                    </span>
                ))}
            </div>
        </section>
    </main>
        </div>
    )
}
export default MyHistory;