import React, { createContext, useState,useEffect } from 'react';

// Context 생성
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userid, setUserid] = useState(null); // userid 상태 관리
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('/api/user/states', { method: 'GET' });
              if (response.ok) {
                const userid = await response.text();
                setUserid('testuser'); // userid 대신 testuser로 설정
              } else {
                throw new Error(response.status);
              }
            } catch (error) {
              console.log(error);
            }
          };

          fetchData(); // 비동기 함수 호출
        });


  return (
    <UserContext.Provider value={{ userid, setUserid }}>
      {children}
    </UserContext.Provider>
  );
}
