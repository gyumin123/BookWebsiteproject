import {React,useEffect,useState} from "react";
import { Route, useNavigate } from "react-router-dom";
import './Content.css'

const PlanContent = ({group_id,plan_id}) => {
    const [contents,setContent] = useState([]);
    const navigate = useNavigate();
    const content_example = [
        {userid:"홍길동",content:"Lorem ipsum dolor sit amet, cu sea illud etiam dicunt, ius at gloriatur adolescens. Illum tempor an vix, sed odio soluta legendos at, vulputate philosophia eum no. Vim debet tation ignota no, eos quem docendi forensibus ea. Graeci quidam ad pri, quando rationibus cum at. Ut eripuit vulputate intellegebat sed, qui at nullam tempor inciderint. Quo in adipisci appellantur disputationi, corrumpit molestiae ei eos, ei vide definitiones his. Sit ne fierent ocurreret signiferumque."},
        {userid:"root",content:"Lorem ipsum dolor sit amet, cu sea illud etiam dicunt, ius at gloriatur adolescens. Illum tempor an vix, sed odio soluta legendos at, vulputate philosophia eum no. Vim debet tation ignota no, eos quem docendi forensibus ea. Graeci quidam ad pri, quando rationibus cum at. Ut eripuit vulputate intellegebat sed, qui at nullam tempor inciderint. Quo in adipisci appellantur disputationi, corrumpit molestiae ei eos, ei vide definitiones his. Sit ne fierent ocurreret signiferumque."}
    ]
    useEffect(()=>async function(){
        try {
            const response = await fetch(`/api/group/plan/content/${group_id}/${plan_id}`,{method:'GET'});
            if(!response.ok)
              throw new Error(response.status);
            const data = await response.json();
            setContent(data);
          } catch (error) {
            setContent(content_example);
          }
    },[])
    return(
        <div class="content-container">
            <div class="contents">
        {
            contents.map((content)=>(
            <div class="content">
                <span id="author">{content.userid}</span>
                <span id="writes">{content.content}</span>
            </div>
            ))
        }
        </div>
        <div id="content-create" onClick={()=>navigate(`/group/plan/content/write/${group_id}/${plan_id}`)}>+글 쓰기</div>
        </div>
    )
}
export default PlanContent;