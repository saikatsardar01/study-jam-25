"use client";
import { useEffect, useState } from "react";

function pad(n){ return String(n).padStart(2,"0"); }

export default function Countdown({ targetDate }) {
  const target = new Date(targetDate).getTime();
  const [now,setNow] = useState(Date.now());

  useEffect(()=>{
    const t = setInterval(()=> setNow(Date.now()), 500);
    return () => clearInterval(t);
  },[]);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
  const secs = Math.floor((diff % (1000*60)) / 1000);

  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="text-xs text-gray-300 mr-2">Days</div>
      <div className="countdown-pill">{pad(days)}</div>
      <div className="countdown-pill">{pad(hours)}</div>
      <div className="countdown-pill">{pad(mins)}</div>
      <div className="countdown-pill">{pad(secs)}</div>
    </div>
  );
}
