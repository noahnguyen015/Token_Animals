import {useEffect, useRef, useState} from 'react';
import './carousel.css'


function Shuffle(arr){

    const shallowCopy = [...arr];

    //random shuffle using Fisher-Yates
    //back to front (before 0), grab a random value from 0-i each time (takes random index)
    //each time becomes 1 less inclusive
    //all random, and the values shuffled aren't reswapped
    for(let i = shallowCopy.length-1; i > 0; i--){

        const j = Math.floor(Math.random() * (i+1));

        //destructuring to swap values in the array
        [shallowCopy[i], shallowCopy[j]] = [shallowCopy[j], shallowCopy[i]];
    }

    return shallowCopy;
}

function renderSlotBoxes(ref, Arr1, Arr2, Arr3, Arr4){

    const slotrow = [...Arr1, ...Arr2, ...Arr3, ...Arr4];

    //check existing divs and the array length
    if(ref.current.children.length !== slotrow.length) {
        ref.current.innerHTML = "";
        //for each of the elements in the slotrow
        slotrow.forEach((option) => {
            const slotbox = document.createElement("div");
            slotbox.textContent = option;
            slotbox.className = "p-3 border option";
            slotbox.style.backgroundColor = option;
            ref.current.appendChild(slotbox);
        });
        return;
    }
    else {
    
    console.log("it goes in here");
    //take child DOMs in the element and turn them into array
    //Array.from --> changes iterable/array-like obj to an array
    Array.from(ref.current.children).forEach((slotbox, i) =>
        {
            const option = slotrow[i];
            if(slotbox.textContent !== option && slotbox.style.backgroundColor){
                slotbox.textContent = option;
                slotbox.style.backgroundColor = option;
            }else{
                console.log("THEY ARE THE SAME");
            }
        })
    }
}

export function Carousel({options}){

    const slotRef = useRef(null);
    const slotboxRef = useRef(null);
    //const slots = [useRef(null), useRef(null), useRef(null)];
    const [isSpinning, setSpinning] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);
    const Arr1 = useRef([...options]);
    const Arr2 = useRef([...options]);
    const Arr3 = useRef([...options]);
    const Arr4 = useRef([...options]);
    const width = 150;
    let stopTime = `1.75s`;

    const spin = () => { 

        Arr2.current = Shuffle(Arr2.current);
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

            const shuffleOptions = setInterval(() => 
            {
                Arr1.current = [...Arr2.current];
                Arr2.current = Shuffle([...Arr2.current]);
                Arr3.current = Shuffle([...Arr3.current]);

                renderSlotBoxes(slotboxRef, Arr1.current, Arr2.current, Arr3.current, Arr4.current);
            }, 1000);

            setTimeout(() =>
            {
             clearInterval(shuffleOptions);
             stopSpinning(TargetIdx);
            }, 4000);

      //  });
    }   

    const stopSpinning = (index) => {

        const slot = slotRef.current;
        const totalOptions = options.length;
        //const offset = (totalOptions + index -2) * width;
        let offset = (totalOptions * width);
        console.log(Arr2.current[index]);
        console.log(Arr3.current[index]);

        if(index === 0)
            offset += 375 + Math.floor(Math.random() * 120) + 10; 
        else if(index === 1)
            offset += 525 + Math.floor(Math.random() * 120) + 10; 
        else if(index === 2)
            offset += Math.floor(Math.random() * 50) + 10;  
            //offset += 675 + Math.floor(Math.random() * 145);
        else if(index === 3)
            offset += 75 + Math.floor(Math.random() * 120) + 10;  
            //offset += 825 + Math.floor(Math.random() * 145);
        else if(index === 4)
            offset += 225 + Math.floor(Math.random() * 120) + 10;
            //offset += 975 + Math.floor(Math.random() * 145); 

        //reset the layout with offsetWidth and starts cleanly to the next transition
        //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
        //known as reflow
        //we discard it after, we just want to trigger the effect
        slot.classList.remove('spinning');
        void slot.offsetWidth;

        if(offset >= 1000)
            stopTime = `3.5s`;
            //stopTime = `10.5s`;
        else
            stopTime = `1.75s`;
            //stopTime = `5.75s`;

        //use the final stopping position, do a final position animation
        slot.style.transition = `transform ${stopTime} ease-out`;
        slot.style.transform = `translateX(-${offset}px)`;

        setTimeout(() => setSpinning(false), 1000);
    }

    useEffect(() => 
        {
            renderSlotBoxes(slotboxRef, Arr1.current, Arr2.current, Arr3.current, Arr4.current);
        }
    );


    //duplicate options in the array because when animation loops to the start, the transition is smooth
    //you can see the animaton reset without it
    //the slots/objects will match up at the end of the loop EX: (1-6 = 50%, then back to 1-6)

    /*
    {slots.map((slot, i) => (
                ))}
    {[...Arr1, ...Arr2, ...Arr3, ...Arr4].map((option, j) => (
        <div className="p-3 border option" key={j} style={{backgroundColor: `${option}`}}>{option}</div>
    ))}                
    
    */

    return (
    <>
        <div className="d-flex align-items-center justify-content-center">
            <div id="divider"></div>
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    <div className="d-flex" ref={slotboxRef}>
                    </div>    
                </div>
            </div>
        </div>
        <button onClick={spin} disabled={isSpinning}>Spin The Slot Machine!</button>
    </>
    )
}