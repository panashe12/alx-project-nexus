import Link from "next/link"


const Header: React.FC = () => {
  return (
    <header
      className="
        h-16
        flex
        items-center
        px-4 md:px-16 lg:px-44
        text-white
        bg-black/30
        backdrop-blur-md
        fixed
        top-0
        left-0
        w-full
        z-50
      "
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="text-base md:text-2xl font-semibold">
          Binge<span className="text-[#da7227]">Guru</span>
        </h2>

        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link
            href="/"
            className="hover:text-[#da7227] text-base transition-colors duration-300 font-semibold"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="hover:text-[#da7227] text-base transition-colors duration-300 font-semibold"
          >
            Movies
          </Link>
          <Link
            href="/favorites"
            className="hover:text-[#da7227] text-base transition-colors duration-300 font-semibold"
          >
            Favorites
          </Link>
          
          


        </nav>

        
      </div>
    </header>
  )
}

export default Header

