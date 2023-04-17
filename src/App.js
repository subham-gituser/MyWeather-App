import React, { useState } from 'react'
import coldImag from "./assets/images/cold.jpg"
import hot from "./assets/images/hot.jpg"
import styles from "./assets/styles/style.css"
import Description from './components/description'
import { useEffect } from 'react'
import { getFormattedweatherData} from './weatherService'




const App = () => {

  const [city,setCity]=useState("Bhubaneswar")
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState('metric');
 const [bg,setBg] =useState(hot)
  useEffect(()=>{
    const fetchWeatherData =async () =>{
      const data= await getFormattedweatherData(city,units);
    setWeather(data)
const threshold = units === 'metric' ? 20 :60;
 if (data.temp <= threshold) setBg(coldImag)
 else setBg(hot) ;
};


    fetchWeatherData()
     },[units,city])

     const handleUnitsClick=(e) =>{
      const button =e.currentTarget;
      const currentUnit =button.innerText.slice(1);
      
      const isCelcius =currentUnit === 'C';
      button.innerText = isCelcius ? '°F' : '°C'
setUnits(isCelcius ? 'metric' : 'imperial');
     
     }
 const enterKeyPressed = (e)=>{
 if(e.keyCode ===13){
  setCity(e.currentTarget.value)
  e.currentTarget.blur()
 }
 }
  return (
    <div className='app' style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
            <div className='container'>
            <div className='section section_inputs'>
              <input onKeyDown={enterKeyPressed} type='text' name='city' placeholder='EnterCity'></input>
            <button onClick={(e) =>handleUnitsClick(e)}>°F</button>
            </div>
          <div className='section section_temperature'>
            <div className='icon'>
              <h3>{`${weather.name} ,${weather.country}`}</h3>
              <img src={weather.iconURL} alt='weatherIcon'/>
              <h3>{weather.description}</h3>
            </div>
            <div className='temperature'>
              <h1>{`${weather.temp.toFixed()} °${units ==='metric' ? 'C' : 'F'}`}</h1>
            </div>
          </div>
  
  
           {/* bottom description */}
           <Description weather={weather} units ={units}/>
        </div>
  
          )
        }
           </div>
    </div>
  )
}

export default App