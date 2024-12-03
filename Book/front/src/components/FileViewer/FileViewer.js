import React, {useState, useEffect, useContext} from "react";
import './FileViewer.css';
import {Popup} from "../Data/function";
import {useParams} from "react-router-dom";
import {UserContext} from "../../UserContext";

const FileViewer = () => {
    const {bookid} = useParams();
    const {userid} = useContext(UserContext);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [activeMenu, setActiveMenu] = useState("");
    const [fontSize, setFontSize] = useState(16);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [keywordPositions, setKeywordPositions] = useState([]);
    const [pageInput, setPageInput] = useState("");
    const [commentInput,setCommentInput] = useState("")

    const [popupOpen,setPopupOpen] = useState(false);
    const [message,setMessage] = useState(null);
    const [buttonMessage,setButtonMessage] = useState([]);
    const [onClickFunction,setOnclickFunction] = useState([]);
    const [comments,setComments] = useState([]);

    const [viewOption,setViewOption] = useState("user");
    const [commentState,setCommentState] = useState(false);
    const [Groups,setGroups] = useState([]);
    const [menuOpen,setMenuToggle] = useState(false);

    const lineHeight = 32;
    const linesPerPage = 20;

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
        document.documentElement.style.setProperty('--line-height', `${lineHeight}px`);
        document.documentElement.style.setProperty('--bg-color', darkMode ? '#333' : '#fff');
        document.documentElement.style.setProperty('--text-color', darkMode ? '#fff' : '#000');
    }, [fontSize, darkMode]);

    useEffect(() => {
        if (currentPage != null) {
            fetch("/api/read/save",
                {
                    method: "post", headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({bookid, userid, page: currentPage+1})
                })
                .catch((error) => console.log(error));
        }
    }, [currentPage]);
    useEffect(() => {
        fetch("/book.txt")
            .then((response) => response.text())
            .then((text) => {
                const lines = text.split("\n").filter((line) => line.trim() !== "");
                const paginatedContent = [];
                for (let i = 0; i < lines.length; i += linesPerPage * 2) {
                    const leftPage = lines.slice(i, i + linesPerPage);
                    const rightPage = lines.slice(i + linesPerPage, i + linesPerPage * 2);
                    paginatedContent.push({ left: leftPage, right: rightPage });
                }
                setPages(paginatedContent);
            });
    }, []);
    useEffect(() => {
        const getGroups = async(state) =>{
            try {
                const response = await fetch(`/api/group/list/${state}/${userid}`,{method:'GET'});
                if(!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                data.map(newGroup=>{
                    setGroups(prevItems => {
                        // id가 중복되지 않으면 새 항목 추가
                        if (!prevItems.some(item => item.groupId === newGroup.groupId)) {
                            return [...prevItems, newGroup];
                        }
                        // 중복되면 기존 상태 그대로 반환
                        return prevItems;
                    });
                })

            } catch (error) {
            }
        }
        const getPage = async()=>{
            try{
                const response = await fetch("/api/read/page",{method:"post",headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({bookid,userid})})
                if (!response.ok)
                    throw new Error(response.ok);
                const data = await response.text();
                setCurrentPage(parseInt(data)-1);
            }catch (e) {
                console.log(e);
            }
        }
        if (userid!=null) {
            getGroups(0);
            getGroups(1);
            getGroups(2);
            getPage();
        }
        setCommentState(!commentState);
    }, [userid]);

    useEffect(() => {
        // 유저 아이디 감상평만 가져오기
        const getUserComment = async() => {
            try{
                const response = await fetch("/api/read/comment/user",{method:"post",headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({bookid,userid,page:currentPage+1})})
                if (!response.ok)
                    throw new Error();
                const data = await response.json();
                setComments(data);
            }catch (e) {
                console.log(e);
            }
        }
        //그룹 단위로 가져오기
        const getGroupComment = async(groupid) => {
            try{
                const response = await fetch("/api/read/comment/group",{method:"post",headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({bookid,groupid,page:currentPage+1})})
                if (!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                setComments(data);
            }catch (e) {
                console.log(e);
            }
        }
        if (viewOption === "user")
            getUserComment();
        else
            getGroupComment(viewOption);
    }, [currentPage,viewOption,commentState]);

    const onSubmitComment = async()=>{
        try{
            const response = await fetch("/api/read/comment/write",{method:"post",headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({bookid,userid,page:currentPage+1,comment:commentInput})})
            if (!response.ok)
                throw new Error(response.status);
            setCommentState(!commentState);
        }catch (e) {
            console.log(e);
        }
    }

    const goToPage = () => {
        const pageNum = Number(pageInput);
        if (pageNum >= 1 && pageNum <= pages.length) {
            setCurrentPage(pageNum - 1);
            setActiveMenu("");
        } else {
            setPopupOpen(true);
            setMessage("해당되지 않는 페이지 입니다");
            setButtonMessage(["닫기"]);
            setOnclickFunction([()=>setPopupOpen(false)]);
        }
    };


    const handleSearch = () => {
        const keyword = searchTerm.trim();
        if (!keyword) {
            alert("키워드를 입력해주세요.");
            return;
        }

        const content = pages.flatMap((page) => page.left.concat(page.right)).join("\n");
        const indices = [];
        let startIndex = content.indexOf(keyword);

        while (startIndex !== -1) {
            indices.push(startIndex);
            startIndex = content.indexOf(keyword, startIndex + 1);
        }

        if (indices.length > 0) {
            setKeywordPositions(indices);
            setHighlightedIndex(0);
            setMessage(`"${keyword}"이(가) ${indices.length}번 발견되었습니다.`);
        } else {
            setMessage("해당 키워드가 텍스트에서 발견되지 않았습니다.");
        }
        setPopupOpen(true);
        setButtonMessage(["닫기"])
        setOnclickFunction([()=>setPopupOpen(false)]);
    };

    const renderHighlightedText = (text, keyword) => {
        if (!keyword) return text;

        const parts = text.split(new RegExp(`(${keyword})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={index} className="highlighted">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };


    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <div className="container">
            <div className="text-viewer">
                <div className="page-content">
                    <div className="page-column">
                        {currentPage === 0 && (
                            <>
                                <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "28px", margin: "10px 0" }}>
                                    메밀꽃 필 무렵
                                </div>
                                <div style={{ textAlign: "right", fontStyle: "italic", fontSize: "18px", marginRight: "20px" }}>
                                    이효석
                                </div>
                            </>
                        )}
                        {pages[currentPage]?.left
                            ? renderHighlightedText(pages[currentPage].left.join("\n"), searchTerm)
                            : "로딩 중..."}
                    </div>
                    <div className="divider"></div>
                    <div className="page-column">
                        {pages[currentPage]?.right
                            ? renderHighlightedText(pages[currentPage].right.join("\n"), searchTerm)
                            : ""}
                    </div>
                </div>
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>이전</button>
                <span>{currentPage + 1} / {pages.length}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))}>다음</button>
            </div>
            <div className={`view-action-bar ${menuOpen?"open":""}`}>
                <button className="menu-button" onClick={() => {
                    setActiveMenu("");
                    setMenuToggle(!menuOpen)
                }}>{menuOpen?"닫기":"사용자 메뉴"}</button>
                {menuOpen && (
                    <div className="user-menu">
                        {!activeMenu && (
                            <div className="select-menu">
                                <button onClick={() => setActiveMenu("pageMove")}>페이지 이동</button>
                                <button onClick={() => setActiveMenu("search")}>키워드 검색</button>
                                <button onClick={() => setActiveMenu("comment")}>감상평 작성</button>
                                <button onClick={toggleDarkMode}>다크모드</button>
                                <button onClick={() => setFontSize((prev) => prev + 2)}>화면 확대</button>
                                <button onClick={() => setFontSize((prev) => Math.max(prev - 2, 10))}>화면 축소</button>
                            </div>
                        )}
                        {activeMenu === "pageMove" && (
                            <div>
                                <h2>페이지 이동</h2>
                                <input
                                    type="number"
                                    placeholder="페이지 번호"
                                    value={pageInput}
                                    onChange={(e) => setPageInput(e.target.value)}
                                />
                                <div className="menu-active-option-button">
                                    <button onClick={goToPage}>이동</button>
                                    <button onClick={() => {
                                        setPageInput("")
                                        setActiveMenu("")
                                    }}>←</button>
                                </div>
                            </div>
                        )}
                        {activeMenu === "search" && (
                            <div>
                                <h2>키워드 작성</h2>
                                <input
                                    type="text"
                                    placeholder="키워드 입력"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="menu-active-option-button">
                                    <button onClick={handleSearch}>검색</button>
                                    <button onClick={() => {
                                        setSearchTerm("")
                                        setActiveMenu("")
                                    }}>←</button>
                                </div>

                            </div>
                        )}
                        {activeMenu === "comment" && (
                            <div>
                                <h2>감상평 작성</h2>
                                <textarea
                                    placeholder="감상평 입력"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    style={{width: "100%", height: "100px", marginBottom: "20px"}}
                                ></textarea>
                                <div className="menu-active-option-button">
                                    <button onClick={()=>{
                                        onSubmitComment();
                                        setCommentInput("");
                                    }}>저장</button>
                                    <button onClick={() => {
                                        setCommentInput("")
                                        setActiveMenu("")
                                    }}>←</button>
                                </div>
                                <select className="comment-view" value={viewOption}
                                        onChange={(e) => setViewOption(e.target.value)}>
                                    <option value="user">사용자</option>
                                    {
                                        Groups.map(group => (
                                            <option value={group.groupId}>{group.groupName}</option>
                                        ))
                                    }
                                </select>
                                <div className="comment-section">
                                    {
                                        comments.length <= 0 &&
                                        "비어 있음"
                                    }
                                    {
                                        comments.map(comment => (
                                            <div className="comment-view-section">
                                                <span>{comment.userid}</span>
                                                <span>{comment.comment}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {
                popupOpen &&
                <Popup
                    message={message} buttonMessage={buttonMessage} onClickFunction={onClickFunction}
                />
            }
        </div>
    );
};

export default FileViewer;
