import React, { useState } from "react";
import './setPwd.css';

const SetPwd = () => {
    const [originPwd, setOriginPwd] = useState('');
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [ConfirmPwd, setConfirmPwd] = useState('');
    const [msg, SetMsg] = useState('');


    function GetPassword(){
        // 비밀번호 가져오기
            fetch(`/api/user/get/pwd/`, {
                method: 'GET',
            })
            .then(response =>{
            if (!response.ok)
                throw new Error(response.status);
            else
                return response.text();
            })
            .then(password => setOriginPwd(password))
            .catch(error => console.error(error));
    }
    function onSubmitSetPwd (event){
        GetPassword();
        event.preventDefault();
        if (originPwd !== currentPwd) {
            SetMsg("현재 비밀번호가 맞지 않습니다.");
        } else if (newPwd !== ConfirmPwd) {
            SetMsg("변경할 비밀번호가 동일하지 않습니다.");
        } else {
            // 비밀번호 변경을 눌렀을 때
            fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPwd })
            })
            .then(response => {
                if (response.ok) {
                    SetMsg("비밀번호가 성공적으로 변경되었습니다.");
                } else {
                    throw new Error(response.status)
                }
            })
            .catch(error => SetMsg(error + " 비밀번호 변경에 실패했습니다."));
        }
    };

    return (
        <div>
            <main>
                <h1>BookWeb</h1>
                <form id="resetPassword" onSubmit={onSubmitSetPwd}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">현재 비밀번호</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={currentPwd}
                            onChange={(e) => { setCurrentPwd(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="NewPassword">변경할 비밀번호</label>
                        <input
                            type="password"
                            id="NewPassword"
                            name="NewPassword"
                            value={newPwd}
                            onChange={(e) => { setNewPwd(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">변경할 비밀번호 재입력</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={ConfirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            required
                        />
                    </div>
                    <div>{msg}</div> {/* 여기서 msg를 출력 */}
                    <button type="submit">비밀번호 변경</button>
                </form>
            </main>
        </div>
    );
};

export default SetPwd;
