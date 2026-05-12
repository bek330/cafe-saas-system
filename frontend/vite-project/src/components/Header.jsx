import { Link } from "react-router-dom";
import { IoCafeOutline } from "react-icons/io5";

function Header() {
  return (
    <header className="bg-coffee-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 transition-all duration-300" title="Safeland Cafe - Fresh dishes, great experiences">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          to="/"
          className="group transition-transform duration-500 hover:scale-[1.02]"
        >
          <div className="inline-flex items-center justify-center w-[160px] md:w-[200px] h-auto">
            <svg
              viewBox="0 0 420 200"
              className="w-full h-full drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Icon Group */}
              <g transform="translate(-10, 10)">
                {/* Sparkle */}
                <path
                  d="M 120 30 Q 120 37 127 37 Q 120 37 120 44 Q 120 37 113 37 Q 120 37 120 30 Z"
                  fill="#c7b198"
                />
                {/* Sanctuary Arch (Safe) */}
                <path
                  d="M 60 130 L 60 110 C 60 70, 90 50, 120 50 C 150 50, 180 70, 180 110 L 180 130"
                  fill="none"
                  stroke="#c7b198"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Cup Top Rim */}
                <path
                  d="M 75 130 L 165 130"
                  fill="none"
                  stroke="#f9f5f0"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Cup Bowl (Cafe) */}
                <path
                  d="M 82 130 C 82 165, 100 175, 120 175 C 140 175, 158 165, 158 130"
                  fill="none"
                  stroke="#f9f5f0"
                  strokeWidth="4.5"
                  strokeLinejoin="round"
                />
                {/* Cup Handle */}
                <path
                  d="M 158 138 C 176 138, 176 160, 153 160"
                  fill="none"
                  stroke="#f9f5f0"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                {/* Steam / 'S' shape */}
                <path
                  d="M 120 120 C 100 100, 140 90, 120 70"
                  fill="none"
                  stroke="#f9f5f0"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Botanical Leaf (Land) */}
                <path
                  d="M 95 120 Q 80 105 95 90 Q 108 108 95 120 Z"
                  fill="#a68a6d"
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
                  fill="#f9f5f0"
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
                  fill="#c7b198"
                  textAnchor="start"
                  letterSpacing="0.5em"
                >
                  CAFE
                </text>
              </g>
            </svg>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <p className="text-coffee-300 text-[10px] font-black uppercase tracking-[0.3em] hidden lg:block italic">
            Artisanal Experience
          </p>
          <div className="h-4 w-px bg-coffee-800 hidden lg:block"></div>
          <Link 
            to="/menu" 
            className="flex items-center gap-2 text-coffee-100 hover:text-coffee-400 transition-colors duration-300"
          >
            <IoCafeOutline size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Menu</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
