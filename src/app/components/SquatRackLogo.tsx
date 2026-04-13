export function SquatRackLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Stand */}
      <rect x="15" y="20" width="8" height="70" fill="currentColor" />
      <rect x="10" y="20" width="18" height="6" fill="currentColor" />
      <rect x="10" y="84" width="18" height="6" fill="currentColor" />
      
      {/* Right Stand */}
      <rect x="77" y="20" width="8" height="70" fill="currentColor" />
      <rect x="72" y="20" width="18" height="6" fill="currentColor" />
      <rect x="72" y="84" width="18" height="6" fill="currentColor" />
      
      {/* Barbell */}
      <rect x="15" y="42" width="70" height="4" fill="currentColor" />
      
      {/* Left Weight Plate */}
      <circle cx="19" cy="44" r="8" fill="currentColor" opacity="0.9" />
      <circle cx="19" cy="44" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
      
      {/* Right Weight Plate */}
      <circle cx="81" cy="44" r="8" fill="currentColor" opacity="0.9" />
      <circle cx="81" cy="44" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
      
      {/* J-Hooks */}
      <path d="M 23 40 L 23 35 L 28 35 L 28 48" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M 77 40 L 77 35 L 72 35 L 72 48" stroke="currentColor" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
