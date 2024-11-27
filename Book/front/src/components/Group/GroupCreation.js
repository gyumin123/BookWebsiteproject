import {React,useState} from 'react'
import './GroupCreation.css'
import BookData from '../Data/book.json'

const GroupCreation = (userid) =>{
    const [group_name,setGroupName] = useState('');
    const [book_id,setBookId] = useState('');
    const [state,setState] = useState(0);
    const [start_date,setStartDate] = useState('');
    const [end_date,setEndDate] = useState('')
    async function onGroupCreate(){
        try{
            const response = await fetch(`/api/group/create`,{method:'POST',        
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({group_name,book_id,leader:userid,state,start_date,end_date})});
            if(!response.ok)
                throw new Error(response.status);
            window.location.reload();
        }
        catch(error)
        {
            console.error(error);
        }
    }
    return(
        <div class="create-container">
            <div class="create">
                <div class="column">
                    <span>그룹 이름</span>
                    <span>책 이름</span>
                    <span>리더</span>
                    <span>가입</span>
                    <span>기간</span>
                    <span>설명</span>
                </div>
                <div class="body">
                    <input id="group_name"type="text" value={group_name} onChange={(e)=>setGroupName(e.target.value)}></input>
                    <select id="book_name" type="text" value={book_id} onChange={(e)=>setBookId(e.target.value)}>
                    {
                        BookData.map((book)=>(
                            <option value={book.id}>{book.title}</option>
                        ))
                    }
                    </select>
                    <input id="leader"type="text" placeholder={userid} disabled></input>
                    <select id="state"type="text">
                        <option value={0}>신청</option>
                        <option value={1}>자유</option>
                    </select>
                    <div id="date"><input type="date" value={start_date} onChange={(e)=>setStartDate(e.target.value)}>
                    </input> ~ <input type="date" value={end_date} onChange={(e)=>setEndDate(e.target.value)}></input></div>
                    <textarea id="summary"></textarea>
                </div>
            </div>
            <div class="action-bar">
                <button onClick={()=>onGroupCreate()}>생성</button>
                <button onClick={()=>window.location.reload()}>취소</button>
            </div>
        </div>
    )
}
export default GroupCreation;