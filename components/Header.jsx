export default function Header(){
  return (
    <div className="flex items-center justify-between">
      <div className="logo">
        <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="0" y="0" width="46" height="34" rx="6" fill="#000" opacity="0.15"/>
          <circle cx="14" cy="17" r="8" fill="#4285F4"/>
          <circle cx="22" cy="17" r="8" fill="#34A853"/>
          <circle cx="30" cy="17" r="8" fill="#F4B400"/>
          <rect x="36" y="8" width="8" height="16" rx="3" fill="#EA4335"/>
        </svg>
        <div>
          <div style={{display:"flex",gap:6,alignItems:"baseline"}}>
            <h1 style={{fontSize:22, fontWeight:800, color:"#5fb0ff"}}>Google <span style={{color:"#34A853"}}>Cloud</span> <span style={{color:"#F4B400"}}>Study</span> <span style={{color:"#EA4335"}}>Jams</span></h1>
          </div>
          <div style={{fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:2}}>Community Leaderboard</div>
        </div>
      </div>

      <div style={{display:"flex",gap:16,alignItems:"center"}}>
        <button className="text-sm px-3 py-2 rounded-full border border-white/6">Sign in</button>
      </div>
    </div>
  );
}
