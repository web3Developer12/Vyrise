import './App.css'
import blob    from  './assets/logo-1.svg'
import tokens    from  './assets/tokens.svg'
import Tokens from './Tokens'
import pattern from  './assets/pattern.svg'
import metamask from  './assets/metamask.svg'
import rubber from  './assets/rubber.svg'


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

function AnimateLetterInViewHidden(props) {

  const ref = useRef(null)
  const isInView = useInView(ref)

  return <motion.div style={{display:"flex",overflow:'hidden',...props.style}} ref={ref}>
      {
          [...props.text].map((el,index)=>{
              return <motion.div  initial={{opacity:0,y:400}} animate={isInView ?{y:0,opacity:1} :{y:400,opacity:0}} transition={{delay:index * 0.05,duration:1}} key={index}>
                  {el}
              </motion.div>
          })
      }
  </motion.div>
}

function App() {

  const [splash,setSplash] = useState(true)

  const refSection2 = useRef(null)
  const isInViewSection2 = useInView(refSection2)

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
      <div className='pattern'></div>

        <motion.div initial={{opacity:0}} transition={{duration:2}} animate={{opacity:1}} className='gradient-1'></motion.div>
        <motion.div initial={{opacity:0}} transition={{duration:3}} animate={{opacity:1}}  className='gradient-2'></motion.div>


        <motion.div className='navbar'>

          <motion.div initial={{opacity:0}} transition={{delay:1}} animate={{opacity:1}}>
            <img src={blob} width={33}/>
          </motion.div>

          <motion.div initial={{opacity:0}} transition={{delay:1}} animate={{opacity:1.5}}>

            <motion.ul    variants={navContainer} initial="hidden" animate="show" className='nav-items'>
              <motion.li  variants={navItem}>About</motion.li>
              <motion.li  variants={navItem}>Social</motion.li>
              <motion.li  variants={navItem}>Crowdsale</motion.li>
              <motion.li  variants={navItem}>Contact</motion.li>
            </motion.ul>

          </motion.div>

          <motion.div initial={{opacity:0,scale:0}} transition={{delay:1}} animate={{opacity:1,scale:1}}>
            <button>CONNECT</button>
          </motion.div>

        </motion.div>

        <motion.div className='section-1'>

          <motion.div className='sec-1-a'>
            <motion.p className='header'>VYRISE <span className='bold'>FUNGIBLE</span></motion.p>
            <motion.p initial={{opacity:0}} transition={{delay:.6,duration:1}} animate={{opacity:1}}>The new fungible token on the core blockchain showing the blockchain power.</motion.p>
          </motion.div>

          <motion.div   initial={{opacity:0}} transition={{delay:3,duration:.5}} animate={{opacity:1}} className='sec-2-a'>

              <Tokens/>

          </motion.div>

        </motion.div>

        <div className='data'>
            <div className='ticket'>
              <div className='num'>8.00K</div>
              <span className='label'>Total Supply</span>
            </div>
            <div className='ticket'>
              <div className='num'>50%</div>
              <span className='label'>Tokens Sale</span>
            </div>
            <div className='ticket'>
              <div className='num'>8.00K</div>
              <span className='label'>Total Supply</span>
            </div>
            <div className='ticket'>
              <div className='num'>8.00K</div>
              <span className='label'>Total Supply</span>
            </div>
        </div>

        <div className='section-2' ref={refSection2}>
          <div className="rubber">
            <motion.svg width="528" height="302" viewBox="0 0 528 302" fill="none" xmlns="http://www.w3.org/2000/svg">

              <motion.path d="M-4 200C17.5573 248.666 56.4797 357.6 62.9469 252C71.0308 120 135.449 176 212.246 220C289.044 264 171.826 369.719 171.826 164C171.826 10 382.01 -30.0005 525.5 33.9995" stroke="url(#paint0_linear_34_78)"
              strokeWidth="2" class={!isInViewSection2 ? 'svg-elem-hidden':'svg-elem-1'} transition={{delay:4}}>
              </motion.path>

              <defs>
                <linearGradient id="paint0_linear_34_78" x1="260.75" y1="17.9525" x2="489.122" y2="18.0009" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#9400FF"></stop>
                  <stop offset="0.734375" stop-color="#FF005C"></stop>
                  <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
          <motion.img initial={{y:345,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:.5}} src={metamask}/>
          <div className='texts'>

            <div className='info'>
               <p className='header'>Initial Coin offering</p>
               <p className='sub'>Lorem ipsum dolor citrraem detra dira kelo dira lorema lovitium detraem diro kaem vira tera detra </p>
            </div>

            <div className='info'>
               <p className='header'>Initial Coin offering</p>
               <p className='sub'>Lorem ipsum dolor citrraem detra dira kelo dira lorema lovitium detraem diro kaem vira tera detra </p>
            </div>

          </div>
        </div>

      </motion.div>
  )
}

export default App;
