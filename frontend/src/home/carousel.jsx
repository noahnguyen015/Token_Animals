import {useEffect, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom' 
import './carousel.css'
import common_bear from '../assets/bear_bank/common_bear.JPG'
import tie_bear from '../assets/bear_bank/tie_bear.JPG'
import glasses_bear from '../assets/bear_bank/glasses_bear.JPG'
import detective_bear from '../assets/bear_bank/detective_bear.JPG'
import delinquent_bear from '../assets/bear_bank/delinquent_bear.JPG'
import princess_bear from '../assets/bear_bank/princess_bear.JPG'
import sleepy_bear from '../assets/bear_bank/sleepy_bear.JPG'
import boba_bear from '../assets/bear_bank/boba_bear.JPG'



export function Carousel({options}){

    const bears = {"whites": [common_bear], 
                   "blues": [tie_bear, glasses_bear],
                   "greens": [detective_bear, delinquent_bear],
                   "purples": [princess_bear, sleepy_bear],
                   "blacks": [boba_bear]
                  };

    function Randomize(){

        let tempArr = []

        for(let i = 0; i < 50; i++){

            const choice = Math.floor(Math.random() * 64);

            //0-29 30/64
            if(choice < 30){
                const whites = bears["whites"];
                const choice_bear = Math.floor(Math.random() * whites.length);
                tempArr[i] = whites[choice_bear];
            }
            //30-44 15/64%
            else if(choice < 45){
                const blues = bears["blues"];
                const choice_bear = Math.floor(Math.random() * blues.length);
                tempArr[i] = blues[choice_bear];
            }
            //45-54 10/64%
            else if(choice < 55){
                const greens = bears["greens"];
                const choice_bear = Math.floor(Math.random() * greens.length);
                tempArr[i] = greens[choice_bear];
            }
            //55-61 7/64%
            else if(choice < 60){
                const purples = bears["purples"];
                const choice_bear = Math.floor(Math.random() * purples.length);
                tempArr[i] = purples[choice_bear];
            }
            //60-62 3/64%
            else if(choice < 62){
                const blacks = bears["blacks"];
                const choice_bear = Math.floor(Math.random() * blacks.length);
                tempArr[i] = blacks[choice_bear];
            }
            //63. 1/64%
            else if (choice === 63){
                const blacks = bears["blacks"];
                const choice_bear = Math.floor(Math.random() * blacks.length);
                tempArr[i] = blacks[choice_bear];
            }
        }

        return tempArr;
    }

    let isLoggedIn = false;

    const accesstoken = localStorage.getItem("access");
    const refreshtoken = localStorage.getItem("refresh");
    const username = localStorage.getItem("username");

    if(accesstoken && refreshtoken){
        isLoggedIn = true;
    }

    const slotRef = useRef(null);
    const slotboxRef = useRef(null);
    //const slots = [useRef(null), useRef(null), useRef(null)];
    const [isSpinning, setSpinning] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);
    const [Finished, setFinished] = useState(false);
    const [Result, setResult] = useState("");
    const [SlotSheet, setSlotSheet] = useState(Randomize());
    const width = 170;

    const spin = () => { 

        setFinished(false);
        setSlotSheet(Randomize());
        setSpinning(true);

        const slot = slotRef.current;
        const totalOptions = options.length;
        //land on a random number :) random will output nums between 0-1(not including 1 excluded)
        let randomIndex = Math.floor(Math.random() * totalOptions);
        
        setTargetIdx(randomIndex);

        //add the class to the DOM element for slot 

        //check and use setInterval
        //repeat for 1 second intervals until 4 seconds then exit 
        slot.classList.add('spinning');
        slot.style.transition = 'none';
        slot.style.transform = `translateX(0px)`;

        //makes sure the animation is detected on finish, fixes timing over setTimeout
        slot.addEventListener('animationend', () => stopSpinning(TargetIdx));
    }   

    const stopSpinning = (index) => {

        const slot = slotRef.current;

        const totalOptions = options.length;
        let offset = (totalOptions * width);
        console.log(index);

        const realIndex = 22+index;

        console.log(SlotSheet[22+index]);


        //distance based on chosen index/box (offset to make the indicator point to it)
        if(index === 0)
            offset += (width*2+85) //+ Math.floor(Math.random() * 140) + 10; 
        else if(index === 1)
            offset += (width*3+85) //+ Math.floor(Math.random() * 140) + 10; 
        else if(index === 2)
            offset += (width*4+85) //+ Math.floor(Math.random() * 140) + 10;
        else if(index === 3)
            offset += (width*5+85) //+ Math.floor(Math.random() * 140) + 10;  
        else if(index === 4)
            offset += (width*6+85) //+ Math.floor(Math.random() * 120) + 10;

        //reset the layout with offsetWidth and starts cleanly to the next transition
        //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
        //known as reflow
        //we discard it after, we just want to trigger the effect
        slot.classList.remove('spinning');

        void slot.offsetWidth;

        const initial_position = (850*3);

        //inital position to save the amount of slots you went over 
        slot.style.transition = 'none';
        slot.style.transform = `translateX(-${initial_position}px)`;
        //activate a reflow in the browser so it recalculates the position of everything, aka intitally setting position to -xpx above
        //sets starting point 
        void slot.offsetWidth;

        //queue up the next batch of animation
        //waits for current one to finish, then for next frame it applies this style
        requestAnimationFrame(() => {
           //queues up style before the next reflow occurs
           slot.style.transition = `transform 2s ease-out`;
           slot.style.transform = `translateX(-${initial_position+offset}px)`;
        });

        setResult(SlotSheet[realIndex]);

        setTimeout(() => {
            setFinished(true);
            setSpinning(false);
        }, 2000);
    }

    return (
    <>
        <div className="d-flex align-items-center flex-column justify-content-start h-100 pt-5">
            <div id="divider"></div>
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    <div className="d-flex" ref={slotboxRef}>
                        {SlotSheet.map((option, j) => (
                            <div className="option" key={j}><img className="img-fluid" src={option}/></div>
                        ))}   
                    </div>    
                </div>
            </div>
            {isLoggedIn? <button className="px-5 my-3" onClick={spin} disabled={isSpinning}>Spin</button>: <Link to="/login"><button className="px-5 my-3">Login to Spin!</button></Link>}
            {Finished? <div>You won {Result}</div>: <></>}
        </div>
    </>
    )
}