import React, { useState, useEffect } from 'react';
import './components/clock.css';
import timezones from './data/timezones.json'; 
import Clock from './components/Clock'; 
function App() {
  const [timezone1, setTimezone1] = useState(timezones[0].value);
  const [timezone2, setTimezone2] = useState(timezones[1].value);

  useEffect(() => {
    // console.log("Selected Timezone 1:", timezone1, "Time:", new Date().toLocaleTimeString('en-US', { timeZone: timezone1 }));
    // console.log("Selected Timezone 2:", timezone2, "Time:", new Date().toLocaleTimeString('en-US', { timeZone: timezone2 }));
  }, [timezone1, timezone2]);

  return (
    <div className="App">
      <h1>World Clocks</h1>
      <Clock timezone="Europe/London" dominant={true} />
      <div className="controls">
        <label>
          Timezone 1:
          <select value={timezone1} onChange={(e) => setTimezone1(e.target.value)}>
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Timezone 2:
          <select value={timezone2} onChange={(e) => setTimezone2(e.target.value)}>
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="clocks">
        <Clock timezone={timezone1} dominant={false} />
        <Clock timezone={timezone2} dominant={false} />
      </div>
    </div>
  );
}

export default App;