export function Logo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield Background */}
      <path
        d="M100 20 L160 40 L160 100 C160 140 130 170 100 180 C70 170 40 140 40 100 L40 40 Z"
        fill="url(#gradient1)"
        stroke="#0D0678"
        strokeWidth="3"
      />
      
      {/* Jersey Icon */}
      <path
        d="M70 70 L65 80 L65 120 L75 130 L125 130 L135 120 L135 80 L130 70 L115 75 L100 65 L85 75 Z"
        fill="white"
        stroke="#0D0678"
        strokeWidth="2"
      />
      
      {/* Collar */}
      <path
        d="M95 70 L100 65 L105 70"
        stroke="#0D0678"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Center Line */}
      <line x1="100" y1="70" x2="100" y2="130" stroke="#0D0678" strokeWidth="1.5" />
      
      {/* Star */}
      <path
        d="M100 90 L102 96 L108 96 L103 100 L105 106 L100 102 L95 106 L97 100 L92 96 L98 96 Z"
        fill="#FFD700"
        stroke="#0D0678"
        strokeWidth="0.5"
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="40" y1="20" x2="160" y2="180">
          <stop offset="0%" stopColor="#1a0f9e" />
          <stop offset="100%" stopColor="#0D0678" />
        </linearGradient>
      </defs>
    </svg>
  );
}
