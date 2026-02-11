import { useEffect, useState } from "react";

const CircleProgress = ({ value = 0 ,size = 200}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(Math.max(value, 0), 100);

    const timer = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start >= end) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className=" rounded-full shadow flex items-center justify-center transition-all duration-200"
      style={{
        background: `conic-gradient(#FF9800 ${progress * 3.6}deg, #e5e7eb 0deg)`,
        height:size,
        width:size
      }}
    >
      {/* Inner Circle */}
      <div style={{
        width:size-size/5,
        height:size-size/5
      }} className="w-[110px] h-[110px] rounded-full bg-white flex items-center justify-center text-2xl font-bold">
      <h1 style={{
        fontSize : size/5
      }}>{progress}%</h1>  
      </div>
    </div>
  );
};

export default CircleProgress;
