import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"

const Navbar = () => {
  return (
    <header className=" w-full px-5 flex justify-between items-center py-7 sm:px-10 ">
        <nav className=" flex w-full screen-max-width  ">
            <img src={appleImg} alt="Apple" width={14} height={18} className="md:fixed md:z-99"/>

            <div className="flex flex-1 justify-center max-sm:hidden ">
                {navLists.map((nav) => (
                    <div key={nav} className="px-5 text-sm cursor-pointer text-foreground hover:text-white transition-all">
                        {nav}
                    </div>
                ))}
            </div>
            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 md:fixed md:right-30 md:z-99">
            <img src={searchImg} alt="Search" width={18} height={18} />
            <img src={bagImg} alt="bag" width={18} height={18} />
            </div>
        </nav>
    </header>
  )
}

export default Navbar