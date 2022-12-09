import React, { useRef, useState, useEffect } from "react";

const index = ({ minutes = 0.1, isPaused, onEnd }) => {
  // const minutesToMillis = (min) => min * 1000 * 60;

  const interval = useRef();
  const [mill, setMill] = useState(minutes * 1000 * 60);

  //
  const planEnd = onEnd ? onEnd : (e) => console.log("time ends");
  const countDown = () => {
    setMill((time) => {
      if (time < 999) {
        clearInterval(interval.current);
        planEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const hr = Math.floor(mill / 1000 / 60 / 60) % 60;
  const min = Math.floor(mill / 1000 / 60) % 60;
  const sec = Math.floor(mill / 1000) % 60;
  return (
    <div className="container bg-warning">
      <>
        <p>sec: {sec}</p>
        <p>Min: {min}</p>
        <p>hr: {hr}</p>
      </>
    </div>
  );
};

export default index;
