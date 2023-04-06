import './App.css'
import blob    from  './assets/logo-1.svg'
import tokens    from  './assets/tokens.svg'
import Tokens from './Tokens'
import pattern from  './assets/pattern.svg'

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView
} from "framer-motion";
import {useRef,useState} from 'react';
import { Parallax, ParallaxProvider, useParallax } from 'react-scroll-parallax'

function AnimateLetterInViewHidden(props) {

  const ref = useRef(null)
  const isInView = useInView(ref)

  return <motion.div style={{display:"flex",overflow:'hidden',...props.style}} ref={ref}>
      {
          [...props.text].map((el,index)=>{
              return <motion.div  initial={{y:500}} animate={isInView ?{y:0} :{y:400}} transition={{delay:index * 0.10,duration:1}} key={index}>
                  {el}
              </motion.div>
          })
      }
  </motion.div>
}

function App() {

  const [splash,setSplash] = useState(true)

  const navContainer = {
        hidden: { opacity: 0,y:4 },
        show: {
            opacity: 1,
            y:0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 1,
                duration:1,
            },
        },
  }

  const navItem = {
        hidden : { opacity: 0,y:4 },
        show   : { opacity: 1,y:0   },
 }


  return (
      <motion.div className="App">

        <motion.div initial={{opacity:0}} transition={{duration:2}} animate={{opacity:1}} className='gradient-1'></motion.div>
        <motion.div initial={{opacity:0}} transition={{duration:3}} animate={{opacity:1}}  className='gradient-2'></motion.div>


        <motion.div className='navbar'>

          <motion.div initial={{opacity:0}} transition={{delay:1}} animate={{opacity:1}}>
            <img src={blob} width={33}/>
          </motion.div>

          <motion.div initial={{opacity:0}} transition={{delay:1}} animate={{opacity:1.5}}>

            <motion.ul    variants={navContainer} initial="hidden" animate="show" className='nav-items'>
              <motion.li  variants={navItem}>ABOUT</motion.li>
              <motion.li  variants={navItem}>SOCIAL</motion.li>
              <motion.li  variants={navItem}>CROWDSALE</motion.li>
              <motion.li  variants={navItem}>CONTACT</motion.li>
            </motion.ul>

          </motion.div>

          <motion.div initial={{opacity:0,scale:0}} transition={{delay:1}} animate={{opacity:1,scale:1}}>
            <button>CONNECT</button>
          </motion.div>

        </motion.div>

        <motion.div className='section-1'>

          <motion.div className='sec-1-a'>
            <motion.p className='header'><AnimateLetterInViewHidden text="VYRISE"/> <span className='bold'><AnimateLetterInViewHidden text="FUNGIBLE"/></span></motion.p>
            <motion.p initial={{opacity:0}} transition={{delay:.6,duration:1}} whileInView={{opacity:1}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</motion.p>
          </motion.div>

          <motion.div   initial={{opacity:0}} transition={{delay:3,duration:.5}} animate={{opacity:1}} className='sec-2-a'>

              <Tokens/>

          </motion.div>

        </motion.div>


      </motion.div>
  )
}

export default App;
