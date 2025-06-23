import {useRef, useState} from 'react';
import './carousel.css'


export function Carousel({options}){

    const slotRef = useRef(null);
    //const slots = [useRef(null),useRef(null),useRef(null)];
    const [isSpinning, setSpinning] = useState(false);
    const [TargetIdx, setTargetIdx] = useState(0);
    const width = 150;

    const spin = () => { 

        setSpinning(true);

      //  slots.forEach((ref) => {
            const slot = slotRef.current;
            const totalOptions = options.length;
            //land on a random number :) random will output nums between 0-1
            const randomIndex = Math.floor(Math.random() * totalOptions);
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
            const offset = (totalOptions + index -2) * width;

            console.log(options[index]);

            //reset the layout with offsetWidth and starts cleanly to the next transition
            //can use any property that forces layout calc layout like offsetheight. clientTop scrollLeft
            //known as reflow
            //we discard it after, we just want to trigger the effect
            slot.classList.remove('spinning');
            void slot.offsetWidth;
            
            //use the final stopping position, do a final position animation
            slot.style.transition = 'transform 1.75s ease-out';
            slot.style.transform = `translateX(-${offset}px)`;

            setTimeout(() => setSpinning(false), 2000);
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
            <div className="d-flex flex-row slotrow justify-content-start">
                <div className="d-flex" ref={slotRef}>
                    {[...options, ...options, ...options].map((option, j) => (
                        <div className="p-3 border option" key={j}>{option}</div>
                    ))}
                </div>
            </div>
        </div>
        <button onClick={spin} disabled={isSpinning}>Spin The Slot Machine!</button>
    </>
    )
}