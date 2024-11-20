import React,{useState,useEffect} from "react"
import { Link, useNavigate,useSearchParams} from "react-router-dom";
import './SupportSearch.css';
const SupportSearch = () =>{

    //포스트 데이터
    const [SupportPosts,SetSupportPosts] = useState([]);

    //input 암호 저장
    const [inputPasswords,setInputPasswords] = useState({});

    //페이지 수 저장
    const [SupportTotalPage,setSupportTotalPage] = useState(null);

    //현재 페이지 수
    const [supportCurrentPage,setSupportPage] = useState(1);

    //검색할 단어

    const [searchParams] = useSearchParams();
    const [search,setSearch] = useState(searchParams.get('search'));

    //한 페이지당 5개씩 보여주기
    const perpage = 10;

    const navigate = useNavigate();

    function GetSupportData()
    {
        useEffect(() => {
            // 검색어에 따른 총 페이지 가져오기
            fetch(`/api/user/support/totalSupportpage/${search}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status)
            else
                return response.text();
            })
            .then(pages => {
                setSupportTotalPage(parseInt(pages, 10)); // 문자열을 숫자로 변환하여 상태에 저장
                console.log(SupportTotalPage);
            })
            .catch(error => console.error(error));
    
            // 현재 페이지 가져오기 (해당 번호 부터 (개수) 개 가져오기)
            const start = (supportCurrentPage-1)*perpage;

            fetch(`/api/user/support/${search}/${start}`, {
                method: 'GET',
            })
            .then(response => {
            if (!response.ok)
                throw new Error(response.status)
            else
                return response.json()
            })
            .then(data => {
                SetSupportPosts(data);
            })
            .catch(error => console.error(error));

        }, []);
    }
    GetSupportData();

    function handleRead (post) {
        if (post.state===true || checkPassword(parseInt(post)))
            navigate(`/support/read/${post.id}`)
        else
            alert('잘못된 암호')
    }
    function handleInputPassword(postId,event){
        inputPasswords[postId] = event.target.value;
    }
    function checkPassword(post){
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
            value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            <button onClick = {()=>navigate(`/support?search=${search}`)}>검색</button>
        </section>

        {/* <!-- 등록된 글 목록을 보여주는 섹션 --> */}
        <section id="postList">
            <h2>FAQ</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>글 제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (SupportPosts.length > 0) && SupportPosts.map((post,index) => (
                            <tr key={post.id}>
                                <td>{index+1}</td>
                                <td id = {post.id} onClick={()=>handleRead(post)} style={{cursor:"pointer"}}>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>{post.state===true?"공개":"비공개"}
                                    {
                                        post.state===false &&
                                        <input
                                        onChange={(e)=>handleInputPassword(post.id,e)}
                                        placeholder="암호"
                                        >
                                        </input>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
        {Array.from({ length: SupportTotalPage }, (_, index) => (
                    <span
                        key={index + 1}
                        onClick={() => setSupportPage(index + 1)}
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
                <Link to="/support/write">
                <button>글 작성하기</button>
                </Link>
        </section>
    </main>
</div>
);
}
export default SupportSearch;