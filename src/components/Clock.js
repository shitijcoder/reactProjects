import React, { useState, useEffect } from 'react';
import './clock.css';

// get time components for a specific timezone
function getTimeForTimezone(timezone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  //console.log(now);
  const parts = formatter.formatToParts(now).reduce((acc, part) => {
    if (part.type === 'hour') acc.hours = parseInt(part.value, 10);
    if (part.type === 'minute') acc.minutes = parseInt(part.value, 10);
    if (part.type === 'second') acc.seconds = parseInt(part.value, 10);
    //console.log("acc",acc);
    return acc;
  }, { hours: 0, minutes: 0, seconds: 0 });
    //console.log(parts);
  return parts;
}

// Clock component
function Clock({ timezone, dominant }) {
  const [time, setTime] = useState(getTimeForTimezone(timezone));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTimeForTimezone(timezone));

      // Check for alert on the hour
      if (time.minutes === 0 && time.seconds === 0) {
        alert(`It's ${time.hours} o'clock in ${timezone}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone, time]);

  const seconds = (time.seconds * 6) -90; 
  const minutes = (time.minutes * 6) -90; 
  const hours = (((time.hours % 12) + time.minutes / 60) * 30) -90; // Adjusted to include minutes contribution
    console.log(hours);
  return (
    <div className={`clock-container ${dominant ? 'dominant' : ''}`}>
      <h2>{timezone}</h2>
      <div className="clock">
        {/* Clock numbers */}
        {[...Array(12).keys()].map((i) => {
          const angle = (i + 1) * 30;
          return (
            <div
              key={i}
              className="clock-number"
              style={{
                 transform: `rotate(${angle}deg) translate(0, -75px) rotate(-${angle}deg)`, margin:'77px 0 0 80px'
              }}
            >
              {i + 1}
            </div>
          );
        })}

        {/* Clock hands */}
        <div className="hand hour" style={{ transform: `rotate(${hours}deg)` }}></div>
        <div className="hand minute" style={{ transform: `rotate(${minutes}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${seconds}deg)` }}></div>
      </div>
    </div>
  );
}

export default Clock;
