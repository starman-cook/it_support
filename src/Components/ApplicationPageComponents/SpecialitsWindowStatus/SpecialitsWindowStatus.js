import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './SpecialitsWindowStatus.css';



const SpecialitsWindowStatus = (props) => {
    let timerDuration = 900000; //15 минут
    const history = useHistory();
    const status = props.status;
    const id = props.id;
    let topComponent;
    const [seconds, setSeconds] = useState("00");
    const [minutes, setMinutes] = useState(15);
   
    let timer = null;


    useEffect(() => {
       
        if (timerDuration > 0 && !timer) {
            timer = setInterval(() => {
                let seconds = (timerDuration % 60000) / 1000;
                let minutes = Math.floor(timerDuration / 60000);
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                setSeconds(seconds);
                setMinutes(minutes);
                timerDuration -= 1000;
                if (minutes === "00" && seconds === "00") {
                    clearInterval(timer);
                }
            }, 1000);
        }
        if (timerDuration <= 0) {
            clearInterval(timer);
            timer = null;
        }
        return(() => {
            clearInterval(timer)
        })
    }, []);
  

   


    // possible statusses 'new' 'in_progress' 'complete' 'canceled'
    if (status === 'new')
    topComponent = (
        <div className="StatusNew">
            <h2 className="StatusNew__title">Получили вашу заявку, спасибо!</h2>
            <p className="StatusNew_text">Мы назначим ИТ-специалиста в течение:</p>
            <div className="StatusNew__timeBlock">
                <span className="StatusNew__time StatusNew__time--numbers">{minutes}</span>
                <span className="StatusNew__time">:</span>
                <span className="StatusNew__time StatusNew__time--numbers">{seconds}</span>
            </div>
        </div>
    )
    return (
        <>
            {topComponent}
        </>
    )
}

export default SpecialitsWindowStatus;