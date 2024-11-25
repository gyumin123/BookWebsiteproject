import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import './ContentWrite.css'
import { useNavigate } from "react-router-dom";

const  ContentWrite = ()=>{
    const {userid} = useContext(UserContext);
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate=useNavigate();
    const [options,SetOptions] = useState([])
    const [content,setContent] = useState("")
    const example_option = [
        "Cu vel feugiat utroque. Sed an tation iriure appareat, sea ut graeci erroribus, ea voluptua maiestatis reprehendunt mei. Quo an mentitum honestatis. Vel in adhuc alterum repudiare, tritani debitis an eam, sed nostrud oportere persecuti ad.",
        "Cu vel feugiat utroque. Sed an tation iriure appareat, sea ut graeci erroribus, ea voluptua maiestatis reprehendunt mei. Quo an mentitum honestatis. Vel in adhuc alterum repudiare, tritani debitis an eam, sed nostrud oportere persecuti ad."
    ]

    useEffect(()=>{
        try {
            const response = fetch(`/api/read/${0}/${userid}`,{method:"GET"});
            if (!response.ok)
                throw new Error(response.status);
            const data = response.json();
            SetOptions(data);
        } catch (error) {
            SetOptions(example_option)
        }
    },[])

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked)
            setContent(content + options[name])
    };

    return (
    <div class="write-container">
        <h1>글쓰기</h1>
        <div class="write-body">
            <div class="content-data">
            {
                options.map((option,idx)=>(
                    <label>
                    <input
                        type="checkbox"
                        name={idx}
                        checked={selectedOptions[idx]}
                        onChange={handleCheckboxChange}
                    />
                    {option}
                </label>
                ))
            }
            </div>
            <div class="content-write">
                <textarea
                    value={content}
                    onChange={(e)=>setContent(e.target.value)} // 선택된 텍스트를 textarea에 표시
                ></textarea>
            </div>
        </div>
        <div class="action-bar">
            <button id="submit">제출</button>
            <button id="back" onClick={()=>navigate(-1)}>취소</button>
        </div>
    </div>
    );
}

export default ContentWrite;
