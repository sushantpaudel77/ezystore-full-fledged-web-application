import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCode,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500 rounded-t-3xl">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 rounded-t-3xl"></div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/20 border-t border-gray-200/50 dark:border-gray-700/50 rounded-t-3xl"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 dark:from-blue-600/10 dark:to-purple-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-rose-500/20 dark:from-pink-600/10 dark:to-rose-700/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Compact main content */}
        <div className="flex flex-col items-center space-y-6">
          
          {/* Brand section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-600/25">
                <FontAwesomeIcon icon={faCode} className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                Sushant Paudel
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium max-w-md">
              Crafting digital experiences with passion & precision
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-5">
            <a
              href="https://github.com/sushantpaudel77/"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3 rounded-lg bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
              aria-label="GitHub"
            >
              <FontAwesomeIcon 
                icon={faGithub} 
                className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" 
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-lg blur opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-300"></div>
            </a>
            
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3 rounded-lg bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50"
              aria-label="Twitter"
            >
              <FontAwesomeIcon 
                icon={faTwitter} 
                className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" 
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-300"></div>
            </a>
            
            <a
              href="https://github.com/sushantpaudel77/"
              target="_blank"
              rel="noreferrer"
              className="group relative p-3 rounded-lg bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50"
              aria-label="View Source Code"
            >
              <FontAwesomeIcon 
                icon={faCode} 
                className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" 
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-400 dark:from-purple-600 dark:to-purple-400 rounded-lg blur opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-300"></div>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
            <FontAwesomeIcon icon={faCopyright} className="text-gray-500 dark:text-gray-500" />
            <span>{currentYear}</span>
            <span>•</span>
            <span>Made with</span>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-500 dark:text-red-500 animate-pulse mx-1"
              aria-hidden="true"
            />
            <span>by</span>
            <a
              href="https://github.com/sushantpaudel77/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-300 dark:hover:to-purple-300 transition-all duration-300"
            >
              Sushant
            </a>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-600 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1.5 h-1.5 bg-rose-500 dark:bg-rose-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}