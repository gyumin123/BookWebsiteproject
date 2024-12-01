import React , {useState,useEffect} from "react"
import {useSearchParams} from "react-router-dom";
import './Classification.css'
import {ContentCard} from '../Data/function';
import BookData from '../Data/book.json'
import BookImg from '../Data/book.jpg'


const Classification = () => {

    const [Params] = useSearchParams();

    const category = Params.get('category');
    const sep = Params.get('sep');
    const optionIdx = Params.get('option');

    const [title,SetTitle] = useState('');

    const [optionList,SetOptionList] = useState([]);

    const [option,SetOption] = useState(null);



    const [bookData,SetData] = useState([]);

    const themeOption = ["스릴러/호러","로맨스","무협","고전","사회","자기 계발","여행"];
    const SubjectOption = ["소설","시","역사","잡지","자격증"];

        useEffect(() => {
          if (category === '1')
            {
                SetTitle("분야별");
                SetOptionList(SubjectOption);
                if(option == null)
                    SetOption(optionList[0]);
                else
                    SetOption(optionList[option]);
            }
            else if (category === '2')
            {
                SetTitle("테마별");
                SetOptionList(themeOption);
                if(option == null)
                    SetOption(optionList[0]);
                else
                    SetOption(optionList[optionIdx]);
            }
            else
                SetTitle("인기");

            fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title,sep,option})
            })
            .then(response=>{
            if (!response.ok)
                throw new Error(response.status)
            else
                return response.json();
            })
            .then(data => {SetData(data)})
            .catch(error=>console.log(SetData(BookData)))
        },[])


return (

<div className="container">
    <div className="category-section" id="category-theme">
        <h2 className="category-title">{title}</h2>
        <div className = "pagination">
            {optionList.map ((option,index)=>(
                    <a href = {`/classification?category=${category}&sep=${sep}&option=${index}`}>{option}</a>
                    ))}
         </div>
        <div className="product-grid">
        {
            bookData.length > 0 &&
            bookData.slice((sep-1)*25,sep*25).map((book,index) => (
            <ContentCard
            image = {BookImg}
            rank = {(sep-1)*25+index+1}
            title = {book.title}
            author = {book.author}
            description = {book.description}
            rating = {book.rating}
            />
            ))
        }

        </div>
    </div>
    <div className="pagination">
        <a href ={`/classification?category=${category}&sep=1&option=${optionIdx}`} class="active">1</a>
        <a href={`/classification?category=${category}&sep=2&option=${optionIdx}`}>2</a>
        <a href={`/classification?category=${category}&sep=3&option=${optionIdx}`}>3</a>
        <a href={`/classification?category=${category}&sep=4&option=${optionIdx}`}>4</a>
        <a href={`/classification?category=${category}&sep=5&option=${optionIdx}`}>5</a>
    </div>
    </div>
);
}
//인기, 분야, 테마를 한 페이지에서 관리
//100개를 4 페이지에 맞춰서 25개씩 끊음
export default Classification;