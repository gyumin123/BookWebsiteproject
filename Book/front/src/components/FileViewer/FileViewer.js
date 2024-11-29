import React, { useState, useEffect } from "react";
import './FileViewer.css';

const FileViewer = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");
    const [fontSize, setFontSize] = useState(16);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [keywordPositions, setKeywordPositions] = useState([]);
    const [pageInput, setPageInput] = useState("");
    const [userComment, setUserComment] = useState("");
    const [pageComment, setPageComment] = useState("");

    const lineHeight = 32;
    const linesPerPage = 20;

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
        document.documentElement.style.setProperty('--line-height', `${lineHeight}px`);
        document.documentElement.style.setProperty('--bg-color', darkMode ? '#333' : '#fff');
        document.documentElement.style.setProperty('--text-color', darkMode ? '#fff' : '#000');
    }, [fontSize, darkMode]);

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

    const goToPage = () => {
        const pageNum = Number(pageInput);
        if (pageNum >= 1 && pageNum <= pages.length) {
            setCurrentPage(pageNum - 1);
            setActiveMenu("");
        } else {
            alert("해당되지 않는 페이지 입니다");
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
            alert(`"${keyword}"이(가) ${indices.length}번 발견되었습니다.`);
        } else {
            alert("해당 키워드가 텍스트에서 발견되지 않았습니다.");
        }
    };

    const highlightKeyword = () => {
        if (highlightedIndex < keywordPositions.length) {
            const position = keywordPositions[highlightedIndex];
            const pageIndex = Math.floor(position / (linesPerPage * 2));
            setCurrentPage(pageIndex);
            setHighlightedIndex((prevIndex) => prevIndex + 1);
        } else {
            alert("해당 키워드를 처음부터 끝까지 모두 탐색하였습니다.");
            setHighlightedIndex(-1);
            setKeywordPositions([]);
        }
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
    const closeMenu = () => {
        setActiveMenu("");
        setMenuOpen(false);
    };

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
            {!menuOpen && <button className="menu-button" onClick={() => setMenuOpen(true)}>사용자 메뉴</button>}
            {menuOpen && (
                <div className="user-menu">
                    <button className="menu-close-button" onClick={closeMenu}>✖</button>
                    {!activeMenu && (
                        <div>
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
                            <button onClick={goToPage}>이동</button>
                            <button onClick={() => setActiveMenu("")}>←</button>
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
                            <button onClick={handleSearch}>검색</button>
                            <button onClick={() => setActiveMenu("")}>←</button>
                        </div>
                    )}
                    {activeMenu === "comment" && (
                        <div>
                            <h2>감상평 작성</h2>
                            <textarea
                                placeholder="감상평 입력"
                                value={userComment}
                                onChange={(e) => setUserComment(e.target.value)}
                                style={{ width: "100%", height: "100px", marginBottom: "20px" }}
                            ></textarea>
                            <button>저장</button>
                            <button onClick={() => setActiveMenu("")}>←</button>

                            <h3 style={{ marginTop: "20px" }}>(감상평 목록 불러올 부분)</h3>
                            <div className="comment-section">
                                <div className="user-names">
                                    사용자명
                                </div>
                                <div className="user-comments">
                                    감상평
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileViewer;
