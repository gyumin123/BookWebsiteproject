import React, { useState,useEffect } from "react"
import {Route,Routes} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import './mypage.css'

const Mypage = () => {
    const [username,setUserName] = useState('');
    const [nameEdit,setNameEdit] = useState(false);

    const [profile_img,setUserImg] = useState(null);

    useEffect(() => {
         fetch('/api/user/image', { method: 'GET' })
             .then((response) => {
             if (!response.ok)
                throw new Error(response.status)
             return response.json()
             })
             .then((data)=>{setUserImg(data.image)})
             .catch((error)=>{setUserImg('image/profile-basic.png')});

         fetch('/api/user/name', {method: 'GET',})
         .then(response => {
         if (response.ok)
            return response.text();
         else
            throw new Error(response.status);
         })
         .then((text)=>{setUserName(text)})
         .catch((error)=>console.log(error));
    },[])

    function UploadImage(){
        fetch('/api/user/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({profile_img})
        })
        .then((response)=>{
        if (!response.ok)
            throw new Error(response)})
        .catch(error=>console.log(error));
    }

    function UploadName(){
      fetch('/api/user/name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name:username})
      })
      .catch(error=>console.log(error));
    }
      function FileUpload(event){
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // 파일을 Base64로 인코딩하여 상태에 저장
            setUserImg(reader.result);
          };
          reader.readAsDataURL(file);
        }
        UploadImage();
      };

    return (
            <div className="container">
                <div className="profile-section">
                    <div className="profile-pic">
                        <img src= {profile_img} alt="프로필 사진"></img>
                        <input id="fileInput" type="file"
                        style={{display:"none"}} onChange={FileUpload}/>
                        <label htmlFor="fileInput" className="edit-icon">선택하기</label>

                    </div>
                    <div className="profile-info">
                        <div className="nick-name">
                            닉네임 :
                            <input type="text" value = {username} onChange = {(e)=>setUserName(e.target.value)} disabled = {nameEdit===false}></input>
                            <button className="edit-icon pen-icon" 
                            onClick={()=>{UploadName();setNameEdit(!nameEdit)}}
                            >
                                {nameEdit === false && <div>✏️</div>}
                                {nameEdit === true && <div>완료</div>}
                            </button>
                        </div>
                        <div className="group">
                            내 그룹 :
                            <input type="text" disabled></input>
                            <button className="house-icon">🏠</button>
                        </div>
                    </div>
                </div>

                <div className="sidebar">
                    <ul>
                        <li><a href='/mypage/'>비밀번호 변경</a></li>
                        <li><a href='/mypage/myhistory'>나의 활동</a></li>
                        <li><a href='/mypage/purchasehistory'>구매/ 대여 내역</a></li>
                        <li><a href='/support'>고객센터</a></li>
                    </ul>
                </div>
                <div className="box-panel">
                    <Routes>
                        <Route path="/" element={<SetPwd/>}/>
                        <Route path="/myhistory" element={<MyHistory/>}/>
                        <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
                    </Routes>
                </div>
            </div>
    )
}
export default Mypage;
