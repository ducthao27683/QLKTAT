export const EvnLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center drop-shadow-md ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <polygon points="50,2 60,40 98,50 60,60 50,98 40,60 2,50 40,40" fill="#1e40af" />
      <polygon points="50,20 55,45 80,50 55,55 50,80 45,55 20,50 45,45" fill="#dc2626" />
      <polygon points="50,35 52,48 65,50 52,52 50,65 48,52 35,50 48,48" fill="#facc15" />
    </svg>
  </div>
);
