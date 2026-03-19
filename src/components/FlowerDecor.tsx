export function BranchLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M60 270 C58 230 55 200 60 170 C65 140 58 110 62 80 C66 50 60 25 65 5"
        stroke="#8FA68C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M60 200 C40 190 20 175 30 155 C42 158 54 178 60 200Z"
        fill="#B8D0BA"
        fillOpacity="0.65"
      />
      <path
        d="M62 165 C82 152 100 138 88 120 C76 128 68 148 62 165Z"
        fill="#B8D0BA"
        fillOpacity="0.65"
      />
      <path
        d="M60 235 C38 225 22 210 34 192 C46 198 55 218 60 235Z"
        fill="#C5DBC8"
        fillOpacity="0.55"
      />
      {/* small bud top */}
      <ellipse cx="65" cy="8" rx="5" ry="8" fill="#F4D5D5" fillOpacity="0.85" />
      <ellipse cx="65" cy="8" rx="3" ry="5" fill="#E8B8B8" fillOpacity="0.6" />
      {/* rose mid */}
      <circle cx="61" cy="80" r="9" fill="#F4D5D5" fillOpacity="0.8" />
      <circle cx="61" cy="80" r="5.5" fill="#E8B8B8" fillOpacity="0.6" />
      <circle cx="61" cy="80" r="2.5" fill="#BF8090" fillOpacity="0.5" />
    </svg>
  );
}

export function BranchRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: "scaleX(-1)" }}
    >
      <path
        d="M60 270 C58 230 55 200 60 170 C65 140 58 110 62 80 C66 50 60 25 65 5"
        stroke="#8FA68C"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M60 200 C40 190 20 175 30 155 C42 158 54 178 60 200Z"
        fill="#B8D0BA"
        fillOpacity="0.65"
      />
      <path
        d="M62 165 C82 152 100 138 88 120 C76 128 68 148 62 165Z"
        fill="#B8D0BA"
        fillOpacity="0.65"
      />
      <path
        d="M60 235 C38 225 22 210 34 192 C46 198 55 218 60 235Z"
        fill="#C5DBC8"
        fillOpacity="0.55"
      />
      <ellipse cx="65" cy="8" rx="5" ry="8" fill="#F4D5D5" fillOpacity="0.85" />
      <ellipse cx="65" cy="8" rx="3" ry="5" fill="#E8B8B8" fillOpacity="0.6" />
      <circle cx="61" cy="80" r="9" fill="#F4D5D5" fillOpacity="0.8" />
      <circle cx="61" cy="80" r="5.5" fill="#E8B8B8" fillOpacity="0.6" />
      <circle cx="61" cy="80" r="2.5" fill="#BF8090" fillOpacity="0.5" />
    </svg>
  );
}

export function SmallFlower({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="30"
          rx="5"
          ry="11"
          fill="#F4D5D5"
          fillOpacity="0.75"
          transform={`rotate(${angle} 30 30) translate(0 -10)`}
        />
      ))}
      <circle cx="30" cy="30" r="6" fill="#E8B8B8" fillOpacity="0.9" />
      <circle cx="30" cy="30" r="3" fill="#BF8090" fillOpacity="0.7" />
    </svg>
  );
}

export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="0" y1="20" x2="160" y2="20" stroke="#C5DBC8" strokeWidth="0.8" />
      <line x1="240" y1="20" x2="400" y2="20" stroke="#C5DBC8" strokeWidth="0.8" />
      {/* center small flower */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx="200"
          cy="20"
          rx="3"
          ry="7"
          fill="#F4D5D5"
          fillOpacity="0.8"
          transform={`rotate(${angle} 200 20) translate(0 -7)`}
        />
      ))}
      <circle cx="200" cy="20" r="4" fill="#E8B8B8" fillOpacity="0.9" />
      {/* small dots */}
      <circle cx="180" cy="20" r="1.5" fill="#C5DBC8" fillOpacity="0.8" />
      <circle cx="170" cy="20" r="1" fill="#C5DBC8" fillOpacity="0.6" />
      <circle cx="220" cy="20" r="1.5" fill="#C5DBC8" fillOpacity="0.8" />
      <circle cx="230" cy="20" r="1" fill="#C5DBC8" fillOpacity="0.6" />
    </svg>
  );
}

export function SmallLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 35 C10 25 5 10 20 5 C35 10 30 25 20 35Z"
        fill="#B8D0BA"
        fillOpacity="0.7"
      />
      <path
        d="M20 35 C20 20 20 10 20 5"
        stroke="#8FA68C"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
