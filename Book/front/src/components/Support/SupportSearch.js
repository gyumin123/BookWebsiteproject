import React,{useRef, useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import './SupportSearch.css';
const SupportSearch = () =>{
    const [SupportPosts,SetSupportPosts] = useState([]);
    const [inputPasswords,setInputPasswords] = useState({});
    const [Supporttotalpage,SetSupporttotalpage] = useState(null);
    const [supportCurrentPage,setsupportPage] = useState(1);
    const [search,SetSearch] = useState("");
    
    //한 페이지당 5개씩 보여주기
    const perpage = 10;

    const navigate = useNavigate();


    const inputRefs = useRef([]);

    {
        useEffect(() => {
            // 검색어에 따른 총 페이지 가져오기
            fetch(`/api/user/support/totalSupportpage/${search}`, {
                method: 'GET',
            })
            .then(response => response.text())
            .then(pages => {
                SetSupporttotalpage(parseInt(pages, 10)); // 문자열을 숫자로 변환하여 상태에 저장
            })
            .catch(error => console.error('Error fetching total pages:', error));
    
            // 현재 페이지 가져오기 (해당 번호 부터 (개수) 개 가져오기)
            const start = (supportCurrentPage-1)*perpage;
            fetch(`/api/user/support/${start}/${perpage}`, {
                method: 'GET',
            })
            .then(response => response.json()) // JSON으로 변환
            .then(data => {
                console.log(data);
                SetSupportPosts(data);
            })
            .catch(error => console.error(error));
        }, [supportCurrentPage]); // logincurrentPageNumber가 변경될 때마다 실행
    }

    
    const handleDelete = (event) =>{
    //게시판 글 삭제하기
    fetch(`/api/user/support/${event.target.id}`, {
        method: 'DELETE',
    })
    }
    const handleRead = (post) => {
        console.log(post.password,inputPasswords[post.id])
        if (post.state==true || checkPassword(post))
            navigate(`/mypage/support/${post.id}`)
        else
            alert('잘못된 암호')
    }
    const handleInputChange = (postId,event) => {
        inputPasswords[postId] = event.target.value;
    }
    const checkPassword = (post) => {
        if (post.password === inputPasswords[post.id])
            return true;
        else
            return false;
    }


return(

    <div>
    <main>
        {/* <!-- 글 검색 섹션 --> */}
        <section id="searchSection">
            <h2>글 검색</h2>
            <input type="text" placeholder="검색어 입력"
            value={search} onChange={(e)=>SetSearch(e.target.value)}></input>
            <button>검색</button>
        </section>

        {/* <!-- 등록된 글 목록을 보여주는 섹션 --> */}
        <section id="postList">
            <h2>FAQ</h2>
            <table>
                <thead>
                    <tr>
                        <th>글 제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>상태</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        SupportPosts.map((post) => (
                            <tr key={post.id}>
                                <td id = {post.id} onClick={()=>handleRead(post)} style={{cursor:"pointer"}}>{post.title}</td>
                                <td>{post.user}</td>
                                <td>{post.date}</td>
                                <td>{post.state==true?"공개":"비공개"}
                                    {
                                        post.state===false &&
                                        <input
                                        onChange={(e)=>handleInputChange(post.id,e)}
                                        placeholder="암호"
                                        >
                                        </input>
                                    }
                                </td>
                                <td id={post.id} onClick={handleDelete}style={{cursor:"pointer"}}>삭제하기</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
        {Array.from({ length: Supporttotalpage }, (_, index) => (
                    <span
                        key={index + 1}
                        onClick={() => setsupportPage(index + 1)}
                        style={{
                            fontWeight: supportCurrentPage === index + 1 ? 'bold' : 'normal',
                            margin: '0 5px',
                            cursor:"pointer"
                        }}
                    >
                        {index + 1}
                    </span>
                ))}

        {/* <!-- 글 등록 및 내 글 목록 열람 버튼 --> */}
        <section id="postRegistration">
            <h2>글 등록</h2>
                <Link to="/mypage/support/write">
                <button>글 작성하기</button>
                </Link>
        </section>
    </main>
</div>
);
}
export default SupportSearch;