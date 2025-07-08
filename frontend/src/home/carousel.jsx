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

function ChooseBear({option}){

    const whites = [common_bear];
    const blues = [tie_bear, glasses_bear];
    const greens = [detective_bear, delinquent_bear];
    const purples = [princess_bear, sleepy_bear];
    const blacks = [boba_bear];

    let choice = "";

    if(option === "white"){
        choice = common_bear;
    }
    else if(option === "blue"){
        choice = tie_bear;
    }
    else if(option === "green"){
        choice = detective_bear;
    }
    else if(option === "purple"){ 
        choice = sleepy_bear;
    }
    else if(option === "black"){
        choice = boba_bear;
    }
    else
        choice = common_bear;
    return(
    <>
        <img className="img-fluid" src={choice}/>
    </>
    )
}

export function Carousel({options}){
    
    function Shuffle(arr){

        const shallowCopy = [...arr];

        //random shuffle using Fisher-Yates
        //back to front (before 0), grab a random value from 0-i each time (takes random index)
        //each time becomes 1 less inclusive
        //all random, and the values shuffled aren't reswapped
        for(let i = arr.length-1; i > 0; i--){

            const j = Math.floor(Math.random() * (i+1));

            //destructuring to swap values in the array
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return shallowCopy;
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

    const [Arr1, setArr1] = useState(Shuffle([...options]));
    const [Arr2, setArr2] = useState(Shuffle([...options]));
    const [Arr3, setArr3] = useState(Shuffle([...options]));
    const [Arr4, setArr4] = useState(Shuffle([...options]));
    const width = 170;
    let stopTime = `1.75s`;

    const spin = () => { 

            setSpinning(true);

            //  slots.forEach((ref) => {
            const slot = slotRef.current;
            const totalOptions = options.length;
            //land on a random number :) random will output nums between 0-1(not including 1 excluded)
            let randomIndex = Math.floor(Math.random() * totalOptions);

            if(randomIndex == 5)
                randomIndex -= 1;
            
            setTargetIdx(randomIndex);

            //add the class to the DOM element for slot 

            //check and use setInterval
            //repeat for 1 second intervals until 4 seconds then exit 

            slot.classList.add('spinning');
            slot.style.transition = 'none';
            slot.style.transform = `translateX(0)`;

            /*
            const shuffleOptions = setInterval(() => 
            {
                setArr1([...Arr2]);
                Shuffle(Arr2);
                Shuffle(Arr3);
            }, 1000);
            */

            setTimeout(() =>
            {
             //clearInterval(shuffleOptions);
             stopSpinning(TargetIdx);
            }, 3000);
      //  });
    }   

    const stopSpinning = (index) => {

        const slot = slotRef.current;

        const totalOptions = options.length;
        //const offset = (totalOptions + index -2) * width;
        let offset = (totalOptions * width);
        console.log(Arr3[index]);

        if(index === 0)
            offset += (width*2+85) + Math.floor(Math.random() * 140) + 10; 
        else if(index === 1)
            offset += (width*3+85) + Math.floor(Math.random() * 140) + 10; 
        else if(index === 2)
            //offset += Math.floor(Math.random() * 50) + 10;  
            offset += (width*4+85) + Math.floor(Math.random() * 140) + 10;
        else if(index === 3)
            offset += (width*5+85) + Math.floor(Math.random() * 140) + 10;  
            //offset += 825 + Math.floor(Math.random() * 145);
        else if(index === 4)
            offset += (width*6+85) + Math.floor(Math.random() * 120) + 10;
            //offset += 975 + Math.floor(Math.random() * 145); 

        //reset the layout with offsetWidth and starts cleanly to the next transition
        //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
        //known as reflow
        //we discard it after, we just want to trigger the effect
        slot.classList.remove('spinning');
        void slot.offsetWidth;


        //inital position to save the amount of slots you went over 
        slot.style.transition = 'none';
        slot.style.transform = `translateX(-${(850*3)}px)`;
        //clear the transormation
        void slot.offsetWidth;



        requestAnimationFrame(() => {
            setTimeout( () => {
            slot.style.transition = 'transform 3.75s ease-out';
            slot.style.transform = `translateX(-${850*3+offset}px)`;
            }, 0);
        });

        setTimeout(() => setSpinning(false), 1000);
    }

    //duplicate options in the array because when animation loops to the start, the transition is smooth
    //you can see the animaton reset without it
    //the slots/objects will match up at the end of the loop EX: (1-6 = 50%, then back to 1-6)

    return (
    <>
        <div className="d-flex align-items-center flex-column justify-content-start h-100 pt-5">
            <div id="divider"></div>
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    <div className="d-flex" ref={slotboxRef}>
                        {[...Arr1, ...Arr2, ...Arr3, ...Arr4, ...Arr1, ...Arr1, ...Arr1, ...Arr1, ...Arr1, ...Arr1].map((option, j) => (
                            <div className="option" key={j} style={{backgroundColor: `${option}`}}><ChooseBear option={option}/></div>
                        ))}   
                    </div>    
                </div>
            </div>
            {isLoggedIn? <button className="px-5 my-3" onClick={spin} disabled={isSpinning}>Spin</button>: <Link to="/login"><button className="px-5 my-3">Login to Spin!</button></Link>}
        </div>
    </>
    )
}