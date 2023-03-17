import './App.css'
import LOGO from "./assets/LOGO2.svg"
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';

function App() {
  
  const [canSpin,setCanSpin] = useState(false)

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

  useEffect(()=>{
    setTimeout(()=>{
      setCanSpin(true)
    },2000)
  })

  return (
    <div className="App">
      
      <div className='nav-bar'>
        
        <motion.div className='logo'>


          <motion.img initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.5}} src={LOGO} width={24}/>
          <motion.p initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.8}} className='ClimateCrisis'>SPIN COIN</motion.p>


        </motion.div>

        <div className='nav-items'>
          <motion.ul className='first-nav'  variants={container} initial="hidden" animate="show">
            <motion.li variants={item}>About</motion.li>
            <motion.li variants={item}>More</motion.li>
            <motion.li variants={item}>Sale</motion.li>
            <motion.li variants={item}>Discussion</motion.li>
          </motion.ul>
        </div>

        <div className='nav-items'>
          <motion.ul className='first-nav' variants={container} initial="hidden" animate="show">
            <motion.li  variants={item}> Buy/sell</motion.li>
            <motion.li  variants={item}>Support</motion.li>
          </motion.ul>
        </div>
        
      </div>
      
      <div className='hero'>

          <motion.span initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:1}} className='det'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </motion.span>

          <motion.p  initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:1.4}} className='text-sale'>PRE-<span className='yy'>SALE</span> OPEN !! 🥹</motion.p>

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

    </div>
  )
}

export default App;
