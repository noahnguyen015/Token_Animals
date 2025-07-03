import {useRef, useState} from 'react';
import './carousel.css'


export function Carousel({options}){

    const slotRef = useRef(null);
    //const slots = [useRef(null),useRef(null),useRef(null)];
    const [isSpinning, setSpinning] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);
    const width = 150;
    let stopTime = `1.75s`;

    const spin = () => { 

        setSpinning(true);

      //  slots.forEach((ref) => {
            const slot = slotRef.current;
            const totalOptions = options.length;
            //land on a random number :) random will output nums between 0-1
            let randomIndex = Math.floor(Math.random() * totalOptions);

            if(randomIndex == 5)
                randomIndex -= 1;
            
            setTargetIdx(randomIndex);

            //add the class to the DOM element for slot 
            slot.classList.add('spinning');
            slot.style.transition = 'none';
            slot.style.transform = `translateX(0)`;

            setTimeout(() => stopSpinning(TargetIdx), 4000);
      //  });
    }   

    const stopSpinning = (index) => {

            const slot = slotRef.current;
            const totalOptions = options.length;
            //const offset = (totalOptions + index -2) * width;
            let offset = (totalOptions * width);
            console.log(options[index]);

            if(index === 0)
                offset += 375 + Math.floor(Math.random() * 130); 
            else if(index === 1)
                offset += 525 + Math.floor(Math.random() * 130); 
            else if(index === 2)
                offset += Math.floor(Math.random() * 60);  
                //offset += 675 + Math.floor(Math.random() * 145);
            else if(index === 3)
                offset += 75 + Math.floor(Math.random() * 130);  
                //offset += 825 + Math.floor(Math.random() * 145);
            else if(index === 4)
                offset += 225 + Math.floor(Math.random() * 130)
                //offset += 975 + Math.floor(Math.random() * 145); 

            //reset the layout with offsetWidth and starts cleanly to the next transition
            //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
            //known as reflow
            //we discard it after, we just want to trigger the effect
            slot.classList.remove('spinning');
            void slot.offsetWidth;

            if(offset > 1075)
                stopTime = `3.5s`;
            else
                stopTime = `1.75s`;

            //use the final stopping position, do a final position animation
            slot.style.transition = `transform ${stopTime} ease-out`;
            slot.style.transform = `translateX(-${offset}px)`;

            setTimeout(() => setSpinning(false), 1000);
    }


    //duplicate options in the array because when animation loops to the start, the transition is smooth
    //you can see the animaton reset without it
    //the slots/objects will match up at the end of the loop EX: (1-6 = 50%, then back to 1-6)

    /*
{slots.map((slot, i) => (
                ))}
    
    */
    return (
    <>
        <div className="d-flex align-items-center justify-content-center">
            <div className ="d-flex align-items-center" id="divider"></div>
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    {[...options, ...options, ...options, ...options].map((option, j) => (
                        <div className="p-3 border option" key={j}>{option}</div>
                    ))}
                </div>
            </div>
        </div>
        <button onClick={spin} disabled={isSpinning}>Spin The Slot Machine!</button>
    </>
    )
}