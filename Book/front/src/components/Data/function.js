import React , {useState,useEffect} from "react"
import {Link,Route,Routes,useSearchParams,useNavigate} from "react-router-dom";


const ContentCard = ({rank,title,image,author,rating,description}) =>  {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick = {() => navigate(`/book/${rank}`)}
    >
      <h2 class="product-rank">{rank}</h2>
      <img src={image} alt={title} className="product-image" />
      <h3 class="product-title">{title}</h3>
      <div class="product-author">저자 : {author}</div>
      <div class="product-rating">{generateStars(rating)}</div>
      {hovered && (
        <div className="product-description">
            <p>{description}</p>
        </div>
      )}
    </div>
  );
}
const generateStars = (rating) => {
    rating = parseFloat(rating);
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let star = '';

    // 가득 찬 별
    for (let i = 0; i < fullStars; i++) {
        star += '★';
    }

    // 반 별
    if (halfStar) {
        star += '★½';
    }

    // 빈 별
    for (let i = 0; i < emptyStars; i++) {
        star += '☆';
    }
    return star;
}
function Popup({message,onClickFunction,buttonMessage}){
console.log(buttonMessage);
  return (
  <div style={styles.overlay}>
        <div class ="popup" style={styles.popup}>
        {
            <div class = "popup-data">
              <p>{message}</p>
              {
                buttonMessage.map((text,idx)=>
                (
                <button onClick={()=>onClickFunction[idx]()}>{text}</button>
                ))
              }
            </div>
        }
        </div>
    </div>
  );
}
const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 흐릿한 검은 배경
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    popup: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
    },
};
 function totalPrice(SelectItem)
 {
    let total = 0;
    if (SelectItem.length != 0)
        total =  SelectItem.reduce((price,item)=>price+item.price,0)
    return total;
 }
function calPrice(purchaseType,price,period)
{
    if (purchaseType == '대여')
        return Math.floor(price/30*period);
    else
        return price;
}
export  {ContentCard,generateStars,Popup,calPrice,totalPrice};