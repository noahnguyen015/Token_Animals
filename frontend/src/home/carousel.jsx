import {useEffect, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom' 
import Banner from './banner'
import './carousel.css'
import common_bear from '../assets/bear_bank/common_bear.JPG'
import tie_bear from '../assets/bear_bank/tie_bear.JPG'
import glasses_bear from '../assets/bear_bank/glasses_bear.JPG'
import detective_bear from '../assets/bear_bank/detective_bear.JPG'
import delinquent_bear from '../assets/bear_bank/delinquent_bear.JPG'
import princess_bear from '../assets/bear_bank/princess_bear.JPG'
import sleepy_bear from '../assets/bear_bank/sleepy_bear.JPG'
import boba_bear from '../assets/bear_bank/boba_bear.JPG'
import {postItems, getItems} from '../items/items'

import common_goose from '../assets/geese_bank/common_goose.JPG'
import tie_goose from '../assets/geese_bank/tie_goose.JPG'
import hat_goose from '../assets/geese_bank/hat_goose.JPG'
import fisher_goose from '../assets/geese_bank/fisher_goose.JPG'
import chef_goose from '../assets/geese_bank/chef_goose.JPG'
import viking_goose from '../assets/geese_bank/viking_goose.JPG'
import pilot_goose from '../assets/geese_bank/pilot_goose.JPG'
import samurai_goose from '../assets/geese_bank/samurai_goose.JPG'


export function Carousel({options}){

    const bears = {whites: [{card: common_bear, name: "White Bear"}], 
                   blues: [{card: tie_bear, name: "Tie Bear"},{card: glasses_bear, name: "Glasses Bear"}],
                   greens: [{card: detective_bear, name: "Detective Bear"}, {card: delinquent_bear, name: "Delinquent Bear"}],
                   purples: [{card: princess_bear, name: "Princess Bear"}, {card: sleepy_bear, name: "Sleepy Bear"}],
                   blacks: [{card: boba_bear, name: "Boba Bear"}],
                  };

    const geese = {whites: [{card: common_goose, name: "White Goose"}], 
                   blues: [{card: tie_goose, name: "Tie Goose"},{card: hat_goose, name: "Hat Goose"}],
                   greens: [{card: fisher_goose, name: "Fisher Goose"}, {card: chef_goose, name: "Chef Goose"}],
                   purples: [{card: viking_goose, name: "Viking Goose"}, {card: pilot_goose, name: "Pilot Goose"}],
                   blacks: [{card: samurai_goose, name: "Samurai Goose"}],};

    const sets = [bears, geese];

    function Randomize(){

        let currentset = [];

        //choose one of the sets to gamble on
        if(currentCollectionPtr === 0)
            currentset = sets[0];
        else if(currentCollectionPtr === 1)
            currentset = sets[1];
        else if(currentCollectionPtr === 2)
            currentset = sets[2];

        let tempArr = [];

        for(let i = 0; i < 50; i++){

            const choice = Math.floor(Math.random() * 64);

            //0-29 30/64
            if(choice < 30){
                const whites = currentset["whites"];
                const choice_index = Math.floor(Math.random() * whites.length);
                tempArr[i] = {animal: whites[choice_index],
                              tier : "white",
                              };
            }
            //30-44 15/64%
            else if(choice < 45){
                const blues = currentset["blues"];
                const choice_index = Math.floor(Math.random() * blues.length);
                tempArr[i] = {animal: blues[choice_index],
                              tier : "blue",
                              };
            }
            //45-54 10/64%
            else if(choice < 55){
                const greens = currentset["greens"];
                const choice_index = Math.floor(Math.random() * greens.length);
                tempArr[i] = {animal: greens[choice_index],
                              tier : "green",
                              };
            }
            //55-61 7/64%
            else if(choice < 60){
                const purples = currentset["purples"];
                const choice_index = Math.floor(Math.random() * purples.length);
                tempArr[i] = {animal: purples[choice_index],
                              tier : "purple",
                              };
            }
            //60-62 3/64%
            else if(choice < 62){
                const blacks = currentset["blacks"];
                const choice_index = Math.floor(Math.random() * blacks.length);
                tempArr[i] = {animal: blacks[choice_index],
                              tier : "black",
                              };
            }
            //63. 2/64%
            else if (choice <= 63){
                const blacks = currentset["blacks"];
                const choice_index = Math.floor(Math.random() * blacks.length);
                tempArr[i] = {animal: blacks[choice_index],
                              tier : "black",
                              };
            }
        }

        return tempArr;
    }

    function DisplayAnimal(){

        let currentset = [];

        if(currentCollectionPtr === 0)
            currentset = sets[0];
        else if(currentCollectionPtr === 1)
            currentset = sets[1];
        else if(currentCollectionPtr === 2)
            currentset = sets[2];

        const whites = currentset["whites"];
        const blues = currentset["blues"];
        const greens = currentset["greens"];
        const purples = currentset["purples"];
        const blacks = currentset["blacks"];
        
        const displayArr = [{animal: whites[0], tier: "white",},
                            {animal: blues[0], tier:  "blue",},
                            {animal: greens[0], tier: "green",},
                            {animal: purples[0], tier: "purple",},
                            {animal: blacks[0], tier: "black",},
        ]

        return displayArr;
    }

    let isLoggedIn = false;

    const accesstoken = localStorage.getItem("access");
    const refreshtoken = localStorage.getItem("refresh");
    const username = localStorage.getItem("username");

    if(accesstoken && refreshtoken){
        isLoggedIn = true;
    }

    const [currentCollectionPtr, setCollectionPtr] = useState(0);
    const slotRef = useRef(null);
    const slotboxRef = useRef(null);
    //hold on to the current timeout for many renders
    //is stable for multiple renders
    const setTimeoutRef = useRef(null);
    //const slots = [useRef(null), useRef(null), useRef(null)];
    const [isSpinning, setSpinning] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);
    const [Finished, setFinished] = useState(false);
    const [Result, setResult] = useState(null);
    const [SlotSheet, setSlotSheet] = useState([]);
    const [numSpins, setnumSpins] = useState(0);
    const width = 170;

    const spin = () => {

        const randomized = Randomize();
        setSlotSheet(randomized);

        setFinished(false);
        //set it for the next render
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
        slot.addEventListener('animationend', () => stopSpinning(randomIndex, randomized));
    }   

    const stopSpinning = (index, randomized) => {

        const slot = slotRef.current;

        const totalOptions = options.length;
        let offset = (totalOptions * width);

        const realIndex = 25+index;

        //distance based on chosen index/box (offset to make the indicator point to it)
        if(index === 0)
            offset += (width*2+85) + Math.floor(Math.random() * 140) + 10; 
        else if(index === 1)
            offset += (width*3+85) + Math.floor(Math.random() * 140) + 10; 
        else if(index === 2)
            offset += (width*4+85) + Math.floor(Math.random() * 140) + 10;
        else if(index === 3)
            offset += (width*5+85) + Math.floor(Math.random() * 140) + 10;  
        else if(index === 4)
            offset += (width*6+85) + Math.floor(Math.random() * 140) + 10;
        

        //reset the layout with offsetWidth and starts cleanly to the next transition
        //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
        //known as reflow
        //we discard it after, we just want to trigger the effect
        slot.classList.remove('spinning');
        slot.style.transition = 'none';
        slot.style.transform = `translateX(0px)`;

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

        //clear the last timeout to set a new one
        //removes triggering many rerenders, clear the pending timeouts
        if(setTimeoutRef.current)
            clearTimeout(setTimeoutRef.current);

        //set it to the current timeout reference, so only the current one runs
        //updating does not trigger rerender for ref.current
        setTimeoutRef.current = setTimeout(async () => {
            setFinished(true);
            setSpinning(false);
            setResult(randomized[realIndex]);
            const message = await postItems(randomized[realIndex]);
            console.log(message);
        }, 2000);
    }

    function ShowResult() {

        let tier_color ="#ffffff";

        if(Result["tier"] === "blue")
            tier_color = "#3f48cc";
        else if(Result["tier"] === "green")
            tier_color = "#31751cff";
        else if(Result["tier"] === "purple")
            tier_color = "#86278dff";
        else if(Result["tier"] === "black")
            tier_color = "#000000";
        else
            tier_color ="#ffffff";

        return (
        <>
            <h5>You Won:</h5>
            <h4 style={{ color: tier_color }}>{Result["animal"]["name"]}</h4>
        </>
        )
    }

    useEffect(() => 
    {
       if(currentCollectionPtr === 0) {

        //if calling after a spin, remove all the offset
        const slot = slotRef.current;
        void slot.offsetWidth;
        //grab the new set to display
        const displaynew = DisplayAnimal();
        slot.style.transition = 'none';
        slot.style.transform = `translateX(0px)`;
        //set it to new set
        setSlotSheet(displaynew);

        //remove winning message
        setFinished(false);
       }
       else if(currentCollectionPtr === 1) {

        //if calling after a spin, remove all the offset
        const slot = slotRef.current;
        void slot.offsetWidth;
        //grab the new set to display
        const displaynew = DisplayAnimal();
        slot.style.transition = 'none';
        slot.style.transform = `translateX(0px)`;
        //set it to new set
        setSlotSheet(displaynew);

        //remove winning message
        setFinished(false);
       }
       else if(currentCollectionPtr === 2) {
        console.log('coming soon!')
       }

    },[currentCollectionPtr]);

    return (
    <>
        <Banner currentCollectionPtr={currentCollectionPtr} setCollectionPtr={setCollectionPtr}/>
        <div className="d-flex align-items-center flex-column justify-content-start h-100 pt-5">
            <div id="divider"></div>
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    <div className="d-flex" ref={slotboxRef}> 
                    {SlotSheet.map((option, j) => (
                        <div className="option" key={j}><img className="img-fluid" src={option["animal"]["card"]}/></div>
                    ))}  
                    </div>    
                </div>
            </div>
            {isLoggedIn? <button className="px-5 my-3" onClick={() =>{spin(); setnumSpins(prev => prev+1)}} disabled={isSpinning}>Spin</button>: <Link to="/login"><button className="px-5 my-3">Login to Spin!</button></Link>}
            {Finished? <ShowResult/>: <></>}
        </div>
    </>
    )
}