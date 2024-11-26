import React, { useState, useEffect } from "react";
import './FileViewer.css';

const FileViewer = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // 사용자 메뉴 초기 비활성화
  const [activeMenu, setActiveMenu] = useState(""); // 현재 활성화된 메뉴
  const [fontSize, setFontSize] = useState(16); // 텍스트 크기
  const [darkMode, setDarkMode] = useState(false); // 다크모드 상태
  const [searchTerm, setSearchTerm] = useState(""); // 키워드 검색
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // 현재 블록 처리된 키워드 인덱스
  const [keywordPositions, setKeywordPositions] = useState([]); // 키워드 위치 리스트
  const [pageInput, setPageInput] = useState(""); // 페이지 이동 입력값
  const [userComment, setUserComment] = useState(""); // 감상평 입력
  const [pageComment, setPageComment] = useState(""); // 댓글 입력

  const lineHeight = 32; // 줄 높이 (픽셀 단위)
  const linesPerPage = 20; // 페이지당 줄 수

  useEffect(() => {
    fetch("/book.txt")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        const paginatedContent = [];

        for (let i = 0; i < lines.length; i += linesPerPage * 2) {
          const leftPage = lines.slice(i, i + linesPerPage); // 왼쪽 페이지
          const rightPage = lines.slice(i + linesPerPage, i + linesPerPage * 2); // 오른쪽 페이지
          paginatedContent.push({ left: leftPage, right: rightPage });
        }

        setPages(paginatedContent);
      });
  }, []);

  const goToPage = () => {
    const pageNum = Number(pageInput);
    if (pageNum >= 1 && pageNum <= pages.length) {
      setCurrentPage(pageNum - 1);
      setActiveMenu(""); // 메뉴 닫기
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
        <span key={index} style={{ backgroundColor: "yellow" }}>
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
    <div
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      {/* 텍스트 출력 영역 */}
      <div
        style={{
          margin: "0 auto",
          width: "90%",
          height: "85%",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flex: 1, overflow: "hidden", padding: "10px" }}>
          <div
            style={{
              flex: 1,
              padding: "20px",
              fontSize: `${fontSize}px`,
              lineHeight: `${lineHeight}px`,
              textAlign: "justify",
            }}
          >
            {currentPage === 0 && (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "28px",
                    margin: "10px 0",
                  }}
                >
                  메밀꽃 필 무렵
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontStyle: "italic",
                    fontSize: "18px",
                    marginRight: "20px",
                  }}
                >
                  이효석
                </div>
              </>
            )}
            {pages[currentPage]?.left
              ? renderHighlightedText(pages[currentPage].left.join("\n"), searchTerm)
              : "로딩 중..."}
          </div>

          <div style={{ width: "2px", backgroundColor: "#ddd" }}></div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              fontSize: `${fontSize}px`,
              lineHeight: `${lineHeight}px`,
              textAlign: "justify",
            }}
          >
            {pages[currentPage]?.right
              ? renderHighlightedText(pages[currentPage].right.join("\n"), searchTerm)
              : ""}
          </div>
        </div>
      </div>

      {/* 페이지 네비게이션 */}
      <div style={{ textAlign: "center", margin: "10px 0" }}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
          이전
        </button>
        <span style={{ margin: "0 20px" }}>
          {currentPage + 1} / {pages.length}
        </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))}>
          다음
        </button>
      </div>

      {/* 사용자 메뉴 버튼 */}
      {!menuOpen && (
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "15px 25px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen(true)}
        >
          사용자 메뉴
        </button>
      )}

      {/* 사용자 설정 메뉴 */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "300px",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#f00",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={closeMenu}
          >
            ✖
          </button>

          {!activeMenu && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <button onClick={() => setActiveMenu("pageMove")}>페이지 이동</button>
              <button onClick={() => setActiveMenu("search")}>키워드 검색</button>
              <button onClick={() => setActiveMenu("comment")}>감상평 작성</button>
              <button onClick={() => setActiveMenu("pageComment")}>댓글 작성</button>
              <button onClick={toggleDarkMode}>다크모드</button>
              <button onClick={() => setFontSize((prev) => prev + 2)}>화면 확대</button>
              <button onClick={() => setFontSize((prev) => Math.max(prev - 2, 10))}>
                화면 축소
              </button>
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
              <button onClick={handleSearch} style={{ marginTop: "10px" }}>
                검색
              </button>
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveMenu("")}
              >
                ←
              </button>
            </div>
          )}

          {activeMenu === "comment" && (
            <div>
              <h2>감상평 작성</h2>
              <textarea
                placeholder="감상평 입력"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
              <button style={{ marginTop: "10px" }}>저장</button>
              <button style={{ marginTop: "10px" }}>그룹 저장</button>
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveMenu("")}
              >
                ←
              </button>
            </div>
          )}

          {activeMenu === "pageComment" && (
            <div>
              <h2>댓글 작성</h2>
              <textarea
                placeholder="댓글 입력"
                value={pageComment}
                onChange={(e) => setPageComment(e.target.value)}
              ></textarea>
              <button style={{ marginTop: "10px" }}>저장</button>
              <button style={{ marginTop: "10px" }}>그룹 저장</button>
              <button
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setActiveMenu("")}
              >
                ←
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
