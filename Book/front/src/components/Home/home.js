import React, {useEffect, useState} from "react"
import './home.css';
import BackgroundImage from './image/background.png';
import BookImg from '../Data/book.jpg'
import BookData from '../Data/book.json';
import {useNavigate} from "react-router-dom";

const HOME = () => {
    const [id,setBookid] = useState(1);
    const [maxid,setMaxId] = useState(2);
    const [minid,setMinId] = useState(0);

    const navigate = useNavigate();

    useEffect(()=>{
        const current = getRandomNumber()
        setBookid(current);
        setMaxId(current+5);
        setMinId(Math.max(0,current-5))
    },[])
    function getRandomNumber() {
        return Math.floor(Math.random() * 104) + 1;
    }
    return (
            <div className ="homebody" style={{ backgroundImage: `url(${BackgroundImage})`}}>
                <main className = "homemain">
                    <div className="book-grid" >
                        <div className="book-item side-book left" onClick={()=>navigate(`/book/${id}`)}>
                            <img src={BookImg}  alt="책">
                            </img>
                            <div>
                                {BookData[id-1].title}
                            </div>
                        </div>

                        <svg onClick={()=>{
                            if (id > minid)
                                setBookid(id-1)
                        }
                        } className="arrow-icon arrow-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" viewBox="0 0 24 24">
                            <path d="M16 4l-8 8 8 8" />
                        </svg>

                        <div className="book-item" id="main" onClick={()=>navigate(`/book/${id+1}`)}>
                            <img src={BookImg} alt="책"></img>
                            <div>
                                {BookData[id].title}
                            </div>
                        </div>

                        <svg className="arrow-icon arrow-right"
                             onClick={()=>{
                                 if (id<maxid)
                                     setBookid(id+1);
                             }}
                             xmlns="http://www.w3.org/2000/svg" fill="none"
                             stroke="black" viewBox="0 0 24 24">
                            <path d="M8 4l8 8-8 8" />
                        </svg>

                        <div className="book-item side-book right" onClick={()=>navigate(`/book/${id+2}`)}>
                            <img src={BookImg} alt="책"></img>
                            <div>
                                {BookData[id+1].title}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    );
}
export default HOME;
