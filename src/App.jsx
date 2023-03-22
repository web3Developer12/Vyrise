import './App.css'
import twitter from "./assets/twitter.svg"
import insta from "./assets/instagram.svg"
import logo from "./assets/ICON.svg"


import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";


import { wrap } from "@motionone/utils";
import { BrowserRouter, Routes,Route,useNavigate } from 'react-router-dom';

function TextAnimation(props) {
  const text = props.text.split(" ");
  return <AnimatePresence >
    {
      text.map((word, key) => {

        return <motion.span className={props.class} key={key} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: key * 0.05 }}>
          {word}
        </motion.span>
      })
    }
  </AnimatePresence>
}
function TextAnimationBr(props) {
  const text = props.text.split(";");
  return <AnimatePresence>

    {
      text.map((word, key) => {

        return <motion.span className={props.class} key={key} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: key * 0.05 }}>
          {word}<br />
        </motion.span>
      })
    }
  </AnimatePresence>
}

function TextAnimationSub(props) {
  const text = props.text.split(" ");
  return <AnimatePresence>

    {
      text.map((word, key) => {

        return <motion.span className={props.class} key={key} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: key * 0.05 }}>
          {word + " "}
        </motion.span>
      })
    }
  </AnimatePresence>
}

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -75, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax header">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

function App() {

  const [canSpin, setCanSpin] = useState(false)

  const ceil3Ref = useRef(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-50, 0, 100],
    ["#000000", "#FFFFFF", "#FFFFFF"]
  )

  const color = useTransform(
    x,
    [-100, 0, 100],
    ["#FFFFFF", "#000000", "#000000"]
  )

  useEffect(() => {
    setTimeout(() => {
      setCanSpin(true)
    }, 2000)
  })

  const navigate = useNavigate()
  return (
    <motion.div className="App" style={{ background }}>
      

      <motion.div className='nav-bar'>

      <motion.div className='logo' style={{ color }}>
        <motion.img drag src={logo} width={32} 
          dragConstraints={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
          }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragElastic={0.5}/>
        <TextAnimation text={"SPIN COIN"} class='ClimateCrisis' />

      </motion.div>

      <motion.div className='nav-items'  >
        <motion.ul className='first-nav' variants={container} initial="hidden" animate="show">
          <motion.li variants={item} style={{ color }} onClick={()=>{navigate('/about')}}>About</motion.li>
          <motion.li variants={item} style={{ color }}>Exchange</motion.li>
          <motion.li variants={item} style={{ color }}>Sale</motion.li>
          <motion.li variants={item} style={{ color }}>Discussion</motion.li>
        </motion.ul>
      </motion.div>

      <div className='nav-items'>
        <motion.ul className='first-nav' variants={container} initial="hidden" animate="show">
          <motion.li variants={item}> Buy/sell</motion.li>
          <motion.li variants={item}>Support</motion.li>
        </motion.ul>
      </div>

      </motion.div>

        <Routes>
          <Route path="/about" element={
            <motion.div className='about tr-2' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}} >
              
              <motion.p className='header' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
                SPIN-COIN:The next Erc-20 *
              </motion.p>
              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>Welcome to the official website of our ERC-20 token! Our token is a decentralized digital asset built on the Ethereum blockchain, designed to provide a fast and secure payment solution for individuals and businesses around the world.</motion.p>
              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}>Our team of developers has worked tirelessly to create a platform that is user-friendly, secure, and transparent. Our platform is built on top of the Ethereum blockchain, which means that all transactions are recorded on a public ledger that is immutable and transparent. This ensures that all transactions are secure and that the platform is resistant to fraud and hacking attempts.</motion.p>
              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.4}}>Overall, SpinCoin can be a powerful tool for incentivizing and rewarding user engagement on your website. It can also provide new revenue streams and opportunities for monetization. However, it is important to ensure that your users understand the benefits and limitations of using cryptocurrency, and to provide clear guidance on how to use SpinCoin on your site.</motion.p>
  
              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.8}}>To use your ERC-20 token, your users will need an Ethereum wallet that is compatible with ERC-20 tokens. There are many different wallets available, ranging from desktop wallets to mobile wallets and browser extensions.</motion.p>
              
              <motion.p className='header' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} style={{marginTop:"1%"}}>
                Dex: Exchanges Listed
              </motion.p>

              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>Welcome to the official website of our ERC-20 token! Our token is a decentralized digital asset built on the Ethereum blockchain, designed to provide a fast and secure payment solution for individuals and businesses around the world.</motion.p>
              <ul className='exchanges'>
                <li>IceCreamSwap</li>
                <li>ShadowSwap</li>
                <li>FinanceSwap</li>
            
              </ul>

              <motion.p className='header' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} style={{marginTop:"1%"}}>
                Discussion : Community
              </motion.p>

              <motion.p className='sub' initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}}>Welcome to the official website of our ERC-20 token! Our token is a decentralized digital asset built on the Ethereum blockchain, designed to provide a fast and secure payment solution for individuals and businesses around the world.</motion.p>


            </motion.div>    
          }/>
        </Routes>
     

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='content'>

        <motion.div className='ceil-1 ceil' drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}
            >
          <motion.div className='tr-1' initial={{ opacity: 1 }} animate={{
            opacity: 0, transitionEnd: {
              display: "none",
            }
          }} transition={{ delay: .4, duration: 1 }}></motion.div>

          <motion.div className='header'>
            <TextAnimationBr text="Look;Beyond;the future" startDelay={1} />
          </motion.div>

          <TextAnimationSub text="Get in touch with the new ERC-20 token on the core blockchain" startDelay={1} class='sub' />

          <motion.div class="container">

            <motion.main
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x, rotate: x }}
              className="spinner"
              dragElastic={0.5}
              initial={{ rotate: 46, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ delay: 1, type: 'spring', bounce: .2, duration: 3, stiffness: 50, velocity: 1 }}
            >

              <motion.svg width="300" height="300" fill="transparent" stroke="black" strokeWidth=".3" viewBox="-5 -5 100 100" version="1.1" baseProfil="full" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M89.5,61.3c-1-5.2-4.2-9-8.7-12.1c-3-1.6-6.9-2.4-11.5-2.5c-4-0.7-7.3-3.2-9.6-7.8c-1.6-3.6-1.3-7.3,0.3-11.3c1.5-2.3,2.3-4.9,2.5-7.6c0.4-6.5-1.4-12.4-8-17c-4.8-2.9-9.7-3.8-14.9-2.1c-4.9,1.4-8.9,4.8-11.2,9.3c-2.2,6.5-1.6,12.5,1.3,17.8c0.9,1.7,1.3,3.5,1.3,5.4c0.2,5.8-3.5,11.1-9,12.8c-2.4,0.5-4.8,0.8-7.2,0.9C10,48,5.9,50.7,2.6,55.3c-2.5,4.2-3.2,9.1-2.1,13.8c1.1,3.9,3.4,7.4,6.5,10c4,2.9,9,4,13.9,3.3c3.8-0.7,7.2-2.6,9.8-5.4c1.6-1.9,3.1-3.9,4.4-6c2.8-2.6,6.6-4,10.4-3.8c3.4,0.2,6.5,1.6,8.8,4.1l4,5.5c3.4,3.6,8.1,5.8,13.1,6c5.3,0.2,10.4-2,13.9-6C89,72.8,90.5,67.7,89.5,61.3zM17.5,77.7c-6.9,0-12.5-5.7-12.5-12.6c0-6.9,5.7-12.5,12.6-12.5c6.9,0,12.5,5.6,12.5,12.5C30.1,72,24.4,77.6,17.5,77.7L17.5,77.7zM44.8,5.4c6.9,0,12.6,5.6,12.6,12.6s-5.6,12.6-12.6,12.6c-6.9,0-12.6-5.6-12.6-12.6v0C32.3,11,37.9,5.4,44.8,5.4zM44.9,62.5c-7.2,0-13-5.8-13-12.9c0-7.2,5.8-13,12.9-13c7.2,0,13,5.8,13,12.9c0,0,0,0,0,0C57.8,56.7,52.1,62.5,44.9,62.5zM72.2,77.9c-6.9,0-12.6-5.6-12.6-12.5c0-6.9,5.6-12.6,12.5-12.6c6.9,0,12.6,5.6,12.6,12.5c0,0,0,0,0,0C84.7,72.2,79.1,77.9,72.2,77.9z" />

                  <circle cx="44.8" cy="18" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />

                  <circle cx="17.7" cy="65" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />
                  <circle cx="72.2" cy="65.3" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />
                  <circle cx="45" cy="49.5" r="11.5" />
                </g>
              </motion.svg>

            </motion.main>

          </motion.div>
        </motion.div>

        <motion.div className='ceil-2 ceil' drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}>

          <motion.div className='tr-1' initial={{ opacity: 1 }} animate={{
            opacity: 0, transitionEnd: {
              display: "none"
            }
          }} transition={{ delay: .8, duration: 1 }}></motion.div>

          <TextAnimationBr text="The;*Pre-Sale" class="header" startDelay={8} />
          <p className='sub'>Get in Early: Token Presale Now Available for Exclusive Investors!</p>
          <button className='original-button'>Start buy</button>
        </motion.div>

        <motion.div className='ceil-3 ceil' ref={ceil3Ref} drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}>
          <motion.div className='tr-1' initial={{ opacity: 1 }} animate={{
            opacity: 0, transitionEnd: {
              display: "none"
            }
          }} transition={{ delay: 1, duration: 1 }}></motion.div>

          <motion.div className='star' drag dragConstraints={ceil3Ref} whileHover={{
            color: 'rgba(0,0,0,.7)'
          }}>*</motion.div>
          <p className='header'>ERC-20</p>
          <p className='sub'>Don't miss out on the chance to be a part of something revolutionary</p>
        </motion.div>

        <motion.div className='ceil-4 ceil' drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}>
          <motion.div className='tr-1' initial={{ opacity: 1 }} animate={{
            opacity: 0, transitionEnd: {
              display: "none"
            }
          }} transition={{ delay: 1.4, duration: 1 }}></motion.div>

          <p className='header'>#</p>
          <p className='sub'>Don't miss out on the chance to be a part of something revolutionary</p>
          <span className='connect'>connect</span>
          <div className='socials'>
            <div className='social'>
              <img src={twitter} width={22} />

            </div>

            <div className='social'>
              <img src={insta} width={22} />
            </div>
          </div>


        </motion.div>

          
        <motion.div className='ceil-5 ceil' drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}>
        <motion.div className='tr-1' initial={{opacity:1}} animate={{opacity:0,transitionEnd: {
                display: "none"
              }}} transition={{delay:1.8,duration:1}}></motion.div>

          <p className='header'>/n Howdy !!</p>
          <p className='sub'>Don't miss out on the chance to be a part of something revolutionary</p>
          <span className='connect'>connect</span>

        </motion.div>

      </motion.div>

    </motion.div>
  )
}

export default App;

/**
      <div className='hero'>

      
          <motion.div class="container" >
            <motion.main class={`spinner ${canSpin ? "canSpin":""}`}
            initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:1,type: 'spring',bounce:1,duration: 0.1,stiffness: 630,velocity: 6}}
            >
              
              <motion.svg width="300" height="300" fill="white" viewBox="-5 -5 100 100" version="1.1" baseProfil="full" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M89.5,61.3c-1-5.2-4.2-9-8.7-12.1c-3-1.6-6.9-2.4-11.5-2.5c-4-0.7-7.3-3.2-9.6-7.8c-1.6-3.6-1.3-7.3,0.3-11.3c1.5-2.3,2.3-4.9,2.5-7.6c0.4-6.5-1.4-12.4-8-17c-4.8-2.9-9.7-3.8-14.9-2.1c-4.9,1.4-8.9,4.8-11.2,9.3c-2.2,6.5-1.6,12.5,1.3,17.8c0.9,1.7,1.3,3.5,1.3,5.4c0.2,5.8-3.5,11.1-9,12.8c-2.4,0.5-4.8,0.8-7.2,0.9C10,48,5.9,50.7,2.6,55.3c-2.5,4.2-3.2,9.1-2.1,13.8c1.1,3.9,3.4,7.4,6.5,10c4,2.9,9,4,13.9,3.3c3.8-0.7,7.2-2.6,9.8-5.4c1.6-1.9,3.1-3.9,4.4-6c2.8-2.6,6.6-4,10.4-3.8c3.4,0.2,6.5,1.6,8.8,4.1l4,5.5c3.4,3.6,8.1,5.8,13.1,6c5.3,0.2,10.4-2,13.9-6C89,72.8,90.5,67.7,89.5,61.3zM17.5,77.7c-6.9,0-12.5-5.7-12.5-12.6c0-6.9,5.7-12.5,12.6-12.5c6.9,0,12.5,5.6,12.5,12.5C30.1,72,24.4,77.6,17.5,77.7L17.5,77.7zM44.8,5.4c6.9,0,12.6,5.6,12.6,12.6s-5.6,12.6-12.6,12.6c-6.9,0-12.6-5.6-12.6-12.6v0C32.3,11,37.9,5.4,44.8,5.4zM44.9,62.5c-7.2,0-13-5.8-13-12.9c0-7.2,5.8-13,12.9-13c7.2,0,13,5.8,13,12.9c0,0,0,0,0,0C57.8,56.7,52.1,62.5,44.9,62.5zM72.2,77.9c-6.9,0-12.6-5.6-12.6-12.5c0-6.9,5.6-12.6,12.5-12.6c6.9,0,12.6,5.6,12.6,12.5c0,0,0,0,0,0C84.7,72.2,79.1,77.9,72.2,77.9z" />

                  <circle cx="44.8" cy="18" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />

                  <circle cx="17.7" cy="65" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />
                  <circle cx="72.2" cy="65.3" r="8.2" fill="none" stroke="#1D1F20" stroke-width="6" />
                  <circle cx="45" cy="49.5" r="11.5" />
                </g>
              </motion.svg>
              
            </motion.main>
          </motion.div>

      </div>

      <div className='bottom'>

          <ul className='bottom-nav'>
            <li>SpinToken Smart Contract Address: 0x4d224452801aced8b2f0aebe155379bb5d594381</li>
          </ul>


      </div>

 */