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
                    <button className="menu-close-button" onClick={() => setMenuOpen(false)}>✖</button>
                    {/* 메뉴 옵션 추가 */}
                </div>
            )}
        </div>
    );
};

export default FileViewer;
