import React, { useState,useEffect,useContext} from "react"
import {Route,Routes,useNavigate} from "react-router-dom";
import SetPwd from "../SetPwd/setPwd";
import MyHistory from "../Myhistory/myHistory";
import PurchaseHistory from "../PurchaseHistory/purchaseHistory";
import './mypage.css'
import {UserContext} from '../../UserContext';
import BasicImg from '../Banner/image/profile-basic.png'

const Mypage = () => {
    const { userid ,setUserid} = useContext(UserContext);
    const [nickname,setNickname] = useState('');
    const [newNickname,setNewNickname] = useState('');
    const [nameEdit,setNameEdit] = useState(false);
    const [userImg,setUserImg] = useState(null);
    const navigate = useNavigate();

    const [file,setFile] = useState(null);
    function GetImg()
    {
         fetch(`/api/user/image/${userid}`, { method: 'GET' })
             .then((response) => {
             if (!response.ok)
                throw new Error(response.status)
             return response.blob()
             })
             .then((blob)=>{console.log(blob);setUserImg(URL.createObjectURL(blob))})
             .catch((error)=>{setUserImg(BasicImg)});
    }
    useEffect(()=>{
    GetName();GetImg();
    },[userid])

    function GetName(){
         fetch(`/api/user/name/${userid}`, {method: 'GET',})
         .then(response => {
         if (response.ok)
            return response.text();
         else
            throw new Error(response.status);
         })
         .then((text)=>{setNickname(text);console.log(text)})
         .catch((error)=>console.log(error));
    }

    async function UploadImage(file){
        const formData= new FormData();

        formData.append('userid',userid)
        formData.append('file',file);
        console.log(file);

          try {
            const response = await fetch('/api/user/uploadImage', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUserid(null);
            GetImg();
          } catch (error) {
            console.error('Error:', error); // 오류 처리
          }
    }

    async function UploadName(){
          try {
            const response = await fetch('/api/user/name', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userid,newNickname})
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            GetName();
          } catch (error) {
            console.error('Error:', error); // 오류 처리
          }
    }
      function FileUpload(event){
             const selectedFile = event.target.files[0];
             UploadImage(selectedFile);
        }

    return (
            <div className="container">
                <div className="profile-section">
                    <div className="profile-pic">
                        <img src= {userImg} alt="프로필 사진"></img>
                        <input id="fileInput" type="file"
                        style={{display:"none"}} onChange={FileUpload}/>
                        <label htmlFor="fileInput" className="edit-icon">선택하기</label>

                    </div>
                    <div className="profile-info">
                        <div className="nick-name">
                            닉네임 :
                            <input type="text" value = {nameEdit === false ?nickname:newNickname} onChange = {(e)=>{setNewNickname(e.target.value)}} disabled = {nameEdit===false}></input>
                            <button className="edit-icon pen-icon" 
                            onClick={()=>{UploadName();setNewNickname(nickname);setNameEdit(!nameEdit)}}
                            >
                                {nameEdit === false && <div>✏️</div>}
                                {nameEdit === true && <div>완료</div>}
                            </button>
                        </div>
                        <div className="group">
                            내 그룹 :
                            <input type="text" disabled></input>
                            <button className="house-icon" onClick={()=>navigate("/group")}>🏠</button>
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
