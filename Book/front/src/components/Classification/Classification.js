import React , {useState,useEffect} from "react"
import {Link,Route,Routes,useSearchParams} from "react-router-dom";
import BookData from '../Data/book.json';
import './Classification.css'
import {ContentCard} from '../Data/function';


const Classification = () => {
    const [Params] = useSearchParams();
    const category = Params.get('category');
    let sep = Params.get('sep');
    const [title,SetTitle] = useState('');
    const [options,SetOptions] = useState([]);
    const [data,SetData] = useState([]);
    const themeOption = ["스릴러/호러","로맨스","무협","고전","사회","자기 계발","여행"];
    const SubjectOption = ["소설","시","역사","잡지","자격증"];
    const Setting = () => {
        if (sep == null)
            sep = 1;
        useEffect(() => {
          if (category == 0)
            {
                SetTitle("분야별");
                SetOptions(SubjectOption);
            }
            else if (category == 1)
            {
                SetTitle("테마별");
                SetOptions(themeOption);
            }
            else
                SetTitle("인기");
        },[])
    }
    Setting();
    GetBookData();
    function GetBookData(title,sep,option){
    //예를 들어 title = 분야별, sep = 1 페이지 option = 무협
    //문자열 그대로 보냄
        fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title,sep,option})
        })
        .then(response=>response.text())
        .then(data => SetData(data))
        .catch(error=>console.log(error))
    }

return (

<div class="container">
    <div class="category-section" id="category-theme">
        <h2 class="category-title">{title}</h2>
        <div class = "category-option">
          {options.map((option, index) => (
            <span key={index}>{option}</span>
          ))}
         </div>
        <div class="product-grid">
        {
            BookData.slice((sep-1)*25,sep*25).map((book,index) => (
            <ContentCard
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
    <div class="pagination">

        <a href ={`/classification?category=${category}&sep=1`} class="active">1</a>
        <a href={`/classification?category=${category}&sep=2`}>2</a>
        <a href={`/classification?category=${category}&sep=3`}>3</a>
        <a href={`/classification?category=${category}&sep=4`}>4</a>
        <a href={`/classification?category=${category}&sep=5`}>5</a>
    </div>
    </div>
);
}
//인기, 분야, 테마를 한 페이지에서 관리
//100개를 4 페이지에 맞춰서 25개씩 끊음
export default Classification;