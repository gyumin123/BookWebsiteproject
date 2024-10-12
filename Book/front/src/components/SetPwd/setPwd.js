import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import './setPwd.css';

const SetPwd = () => {
    const [currentPwd, SetcurrentPwd] = useState('');
    const [newPwd, SetnewPwd] = useState('');
    const [ConfirmPwd, SetcofirmPwd] = useState('');
    const [msg, SetMsg] = useState('');
    const [originPwd, SetOriginPwd] = useState('');
    const [searchParams] = useSearchParams();
    const userid = searchParams.get('userid');

    // 비밀번호 가져오기
    useEffect(() => {
        fetch(`/api/user/get/pwd/${userid}`, {
            method: 'GET',
        })
        .then(response => response.text())
        .then(password => { SetOriginPwd(password) })
        .catch(error => console.error(error));
    }, [userid]); // userid가 변경될 때만 실행

    const handleSubmit = (event) => {
        event.preventDefault();
        if (originPwd !== currentPwd) {
            SetMsg("현재 비밀번호가 맞지 않습니다.");
        } else if (newPwd !== ConfirmPwd) {
            SetMsg("변경할 비밀번호가 동일하지 않습니다.");
        } else {
            // 비밀번호 변경을 눌렀을 때
            fetch('/api/user/revise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPwd })
            })
            .then(response => {
                if (response.ok) {
                    SetMsg("비밀번호가 성공적으로 변경되었습니다.");
                } else {
                    SetMsg("비밀번호 변경에 실패했습니다.");
                }
            })
            .catch(error => console.error(error));
        }
    };

    return (
        <div>
            <main>
                <h1>BookWeb</h1>
                <form id="resetPassword" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="currentPassword">현재 비밀번호</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={currentPwd}
                            onChange={(e) => { SetcurrentPwd(e.target.value) }}
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
                            onChange={(e) => { SetnewPwd(e.target.value) }}
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
                            onChange={(e) => SetcofirmPwd(e.target.value)}
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
