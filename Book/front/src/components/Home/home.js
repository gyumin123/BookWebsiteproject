import React from "react"
import './home.css';
import BackgroundImage from './image/background.png';

const HOME = () => {

    return (
            <div className ="homebody" style={{ backgroundImage: `url(${BackgroundImage})`}}>
                <main className = "homemain">
                    <div className="book-grid">
                        <div className="side-book left">책</div>
                        
                        <svg className="arrow-icon arrow-left" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" viewBox="0 0 24 24">
                            <path d="M16 4l-8 8 8 8" />
                        </svg>
                        
                        <div className="book-item">책</div>

                        <svg className="arrow-icon arrow-right" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" viewBox="0 0 24 24">
                            <path d="M8 4l8 8-8 8" />
                        </svg>
                        
                        <div className="side-book right">책</div>
                    </div>
                </main>
            </div>
    );
}
export default HOME;
