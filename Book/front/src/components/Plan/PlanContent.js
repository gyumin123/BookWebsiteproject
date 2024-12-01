import {React, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Content.css'
import BasicImg from "../Banner/image/profile-basic.png";
import {UserContext} from "../../UserContext";

const PlanContent = ({group_id,plan_id,book_id,GroupMember}) => {
    const [contents,setContent] = useState([]);
    const {userid} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const getContent = async()=>{
            try {
                const response = await fetch(`/api/group/plan/content/${group_id}/${plan_id}`,{method:'GET'});
                if(!response.ok)
                    throw new Error(response.status);
                const data = await response.json();
                setContent(data);
            } catch (error) {
            }
        }
        getContent();

    },[])


    return(
        <div class="content-container">
            <div class="contents">
        {
            contents.map((content)=>(
            <div class="content">
                <span id="author">{content.user.id}</span>
                <span id="writes">{content.content}</span>
            </div>
            ))
        }
        </div>
            {
                GroupMember &&
                <div id="content-create"
                     onClick={() => navigate(`/group/plan/content/write?bookid=${book_id}&groupid=${group_id}&planid=${plan_id}`)}>
                    +글쓰기
                </div>

            }
        </div>
)
}
export default PlanContent;