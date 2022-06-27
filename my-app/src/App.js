import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("Oct 13, 2022 10:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="App">
      <section className="coundownApp">
        <div className="Countdown">
          <p className="Countdown_title main_title">D-Day Countdown</p>
          <div className="Countdown_dates">
            <p className="Countdown_dates_date">{timerDays}일</p>
            <p className="Countdown_dates_date">{timerHours}시</p>
            <p className="Countdown_dates_date">{timerMinutes}분</p>
            <p className="Countdown_dates_date">{timerSeconds}초</p>
          </div>
        </div>
        <style jsx>{`
          * {
            box-sizing: border-box;
            background-color: #111c2f;
          }
          .coundownApp {
            height: 100%;
            background-color: #111c2f;
          }
          .Countdown_title {
            display: flex;
            font-size: 25px;
            width: 100%;
            justify-content: center;
          }
          .main_title {
            font-size: 40px;
            color: white;
          }
          .Countdown_dates {
            color: white;
            display: flex;
            justify-content: space-between;
            margin: 0 50px;
            margin-top: 100px;
          }
          .Countdown_dates_date {
            font-size: 30px;
          }
        `}</style>
      </section>
    </div>
  );
}

export default App;
