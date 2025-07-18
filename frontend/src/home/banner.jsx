import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './banner.css'


function scroll(direction) {

    console.log("scrolled left");
}

function Banner({currentCollection, setCollection}){

    const bannerRef = useRef(null);

    const collections = ["set1", "set2", "set3"];

    function scroll(direction) {
        console.log("scrolled");

        setCollection(prev => { 
            if((prev === 0 && direction === -1) || (prev === 2 && direction === 1)){
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
                        <div className="banner" style={{backgroundColor: "green"}}>TESTING</div>
                        <div className="banner" style={{backgroundColor: "red"}}>TESTING</div>
                        <div className="banner">TESTING</div>
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