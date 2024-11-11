import React, { useState,useEffect } from "react"
import {Link,Route,Routes,useSearchParams} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import './mypage.css'

const Mypage = () => {
    const [username,SetUsername] = useState('');
    const [nameEdit,SetnameEdit] = useState(true);
    const [userid,setUserid] = useState(null);
    
    // 아직 구현 안함
    const [group,Setgroup] = useState('');

    const [ProfileImg,setUserImg] = useState('');

    function GetUserData(){
        useEffect(() => {
             fetch('/api/user/state', { method: 'GET' })
                 .then((response) => response.text())
                 .then((userid)=>{
                 if (userid != ''){
                      setUserid(null)
                 }
                 else
                    setUserImg('image/icon_user.png')
                 })
                 //없다면 아이콘 저장
                 .catch(error=>{console.log(error.message);});
            setUserImg('image/icon_user.png');
        },[])
    };
    GetUserData();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImg(reader.result);
            };
            reader.readAsDataURL(file);
          }
      };
    
      // 버튼 클릭 시 파일 탐색기 열기
      const openFileDialog = () => {
        document.getElementById('fileInput').click();
      };
      const SetData = () => {
        fetch('/api/user/revise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ProfileImg,username})
        })
        .then(response => response.blob())
        .then(data => {setUserImg(URL.createObjectURL(data))})
        .catch(setUserImg('img/background.png'))
      }
        //사용자 이미지 가져오기
        //사용자의 이미지가 없으면 시스템 기본 이미지 저장
        const GetImg = () => {
            fetch('/api/user/img', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid})
            })
            .then(response => response.blob())
            .then(data => {setUserImg(URL.createObjectURL(data))})
            .catch(setUserImg('img/background.png'))
        }
    //GetUser();

    return (
            <div className="container">
                <div className="profile-section">
                    <div className="profile-pic">
                        <img src={ProfileImg} alt="프로필 사진"></img>
                        <input id="fileInput"type="file" style={{display:"none"}} onClick={handleFileChange} accept="image/*"></input>
                        <button className="edit-icon"
                        onClick={()=>openFileDialog()}>수정하기</button>
                    </div>
                    <div className="profile-info">
                        <div className="nick-name">
                            닉네임 :
                            <input type="text" disabled = {nameEdit===false}></input>
                            <button className="edit-icon pen-icon" 
                            onClick={()=>{SetData();SetnameEdit(!nameEdit)}}
                            >
                                {nameEdit === false && <div>✏️</div>}
                                {nameEdit === true && <div>완료</div>}
                            </button>
                        </div>
                        <div className="group">
                            내 그룹 :
                            <input type="text" disabled></input>
                            {/* 아직 구현 안함 */}
                            <button className="house-icon">🏠</button>
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    <ul>
                    <li><Link to={`/mypage?userid=${userid}`}>비밀번호 변경</Link></li>
                        <li><Link to={`/mypage/myhistory?userid=${userid}`}>나의 활동</Link></li>
                        <li><Link to={`/mypage/purchasehistory?userid=${userid}`}>구매/ 대여 내역</Link></li>
                        <li><Link to={`/support?userid=${userid}`}>고객센터</Link></li>
                    </ul>
                </div>
                <div className="box-panel">
                    {/* 박스 패널 안에 페이지를 띄움 */}
                    <Routes>
                        <Route path="/" element={<SetPwd/>}/>
                        <Route path="myhistory" element={<MyHistory/>}/>
                        <Route path="purchasehistory" element={<PurchaseHistory/>}/>
                    </Routes>
                </div>
            </div>
    )
}
export default Mypage;
