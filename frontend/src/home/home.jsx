import { useState } from 'react'
import {Carousel} from './carousel'

function Home() {
  const [count, setCount] = useState(0);

  const options = ["test1", "test2", "test3", "test4", "test5"];

  return (
    <>
        <p>Hello</p>
        <Carousel options={options}/>
    </>
  )
}

export default Home
