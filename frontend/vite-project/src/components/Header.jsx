import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white/95 sticky top-0 z-10 shadow-sm border-b border-gray-200" title="Safeland Cafe - Fresh dishes, great experiences">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-serif font-bold text-charcoal"
        >
          <div className="inline-flex items-center justify-center w-[200px] h-auto">
            <svg
              viewBox="0 0 420 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Icon Group */}
              <g transform="translate(-10, 10)">
                {/* Sparkle */}
                <path
                  d="M 120 30 Q 120 37 127 37 Q 120 37 120 44 Q 120 37 113 37 Q 120 37 120 30 Z"
                  fill="#C8A97E"
                />
                {/* Sanctuary Arch (Safe) */}
                <path
                  d="M 60 130 L 60 110 C 60 70, 90 50, 120 50 C 150 50, 180 70, 180 110 L 180 130"
                  fill="none"
                  stroke="#C8A97E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Cup Top Rim */}
                <path
                  d="M 75 130 L 165 130"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Cup Bowl (Cafe) */}
                <path
                  d="M 82 130 C 82 165, 100 175, 120 175 C 140 175, 158 165, 158 130"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                {/* Cup Handle */}
                <path
                  d="M 158 138 C 176 138, 176 160, 153 160"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Steam / 'S' shape */}
                <path
                  d="M 120 120 C 100 100, 140 90, 120 70"
                  fill="none"
                  stroke="#1A1A1A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Botanical Leaf (Land) */}
                <path
                  d="M 95 120 Q 80 105 95 90 Q 108 108 95 120 Z"
                  fill="#506C59"
                />
              </g>
              {/* Typography */}
              <g transform="translate(190, 120)">
                <text
                  x="0"
                  y="0"
                  fontFamily="'Cinzel', serif"
                  fontSize="34"
                  fontWeight="700"
                  fill="#1A1A1A"
                  textAnchor="start"
                  letterSpacing="0.1em"
                >
                  SAFELAND
                </text>
                <text
                  x="4"
                  y="26"
                  fontFamily="'Montserrat', sans-serif"
                  fontSize="12"
                  fontWeight="600"
                  fill="#C8A97E"
                  textAnchor="start"
                  letterSpacing="0.5em"
                >
                  CAFE
                </text>
              </g>
            </svg>
          </div>
        </Link>
        <p className="text-sage">Fresh dishes, great experiences</p>
      </div>
    </header>
  );
}

export default Header;
