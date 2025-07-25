import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './banner.css'

import common_bear from '../assets/bear_bank/common_bear.JPG'
import common_goose from '../assets/geese_bank/common_goose.JPG'
import bear_banner from '../assets/icon_bank/bear_banner.png' 
import goose_banner from '../assets/icon_bank/goose_banner.png' 


function scroll(direction) {

    console.log("scrolled left");
}

function Banner({currentCollectionPtr, setCollectionPtr}){

    const bannerRef = useRef(null);
    const [HoverBanner, setHover] = useState(false);

    const collections = ["set1", "set2", "set3"];

    function scroll(direction) {
        console.log("scrolled");

        setCollectionPtr(prev => { 
            if((prev === 0 && direction === -1) || (prev === 1 && direction === 1)){
                console.log(prev);
                return prev
            }
            else{
                console.log(prev + direction);
                return prev + direction;
            }
        });

        //find the width of the banner dynamically
        const banner = bannerRef.current.children[0];
        const bannerWidth = banner.offsetWidth;
        const bannerScroll = direction*bannerWidth;

        //left marks the x-axis for scrolling, smoothen animation 
        bannerRef.current.scrollBy({left: bannerScroll, behavior: "smooth"});
    }

    return (
    <>
        <div className="row mt-5">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-1 scroll-button" onClick={() => scroll(-1)}>&lt;</div>
                    <div className="col-10 d-flex banner-container p-0" ref={bannerRef}>
                        <div className="banner d-flex justify-content-center align-items-center">
                            Bear Collection
                            <img className="banner-img ms-3" src={bear_banner}/>
                        </div>
                        <div className="banner d-flex justify-content-center align-items-center">Goose Collection<img className="banner-img" src={goose_banner}/></div>
                    </div>
                    <div className="col-1 scroll-button" onClick={() => scroll(1)}>&gt;</div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    </>
    )
}

export default Banner