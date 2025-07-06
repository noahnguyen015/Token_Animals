import { useState } from 'react'
import {Carousel} from './carousel'

function Home() {
  const [count, setCount] = useState(0);

  const options = ["blue", "blue", "purple", "pink", "red"];

  const [isChanging, setChange] = useState([]);

  return (
    <>
        <p>Hello</p>
        <Carousel options={options}/>
    </>
  )
}

export default Home
