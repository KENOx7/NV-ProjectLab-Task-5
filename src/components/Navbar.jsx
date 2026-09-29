import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  {name: 'Ana səhifə', path: '/'},
  {name: 'Haqqımızda', path: '/about'},
  {name: 'Əlaqə', path: '/contact'}
]

function Navbar(){
  const [openPath, setOpenPath] = useState(null)
  const {pathname} = useLocation()
  const isOpen = openPath === pathname

  return(
    <header className="relative z-20 border-b border-white/10 bg-black/90 backdrop-blur-md sm:absolute sm:left-0 sm:right-0 sm:top-0 sm:bg-black/30">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
          Keno<span className="text-cinema">Film</span>
        </NavLink>
        <div className="hidden items-center gap-7 text-sm font-medium text-zinc-300 sm:flex">
          {links.map((link)=>(
            <NavLink key={link.path} to={link.path} className={({isActive})=>isActive ? 'text-white' : 'hover:text-white'}>
              {link.name}
            </NavLink>
          ))}
        </div>
        <button type="button" onClick={()=>setOpenPath(isOpen ? null : pathname)} className="rounded-lg p-2 sm:hidden" aria-label="Open menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isOpen&&(
        <div className="border-t border-white/10 px-4 pb-4 pt-3 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950 p-3">
            {links.map((link)=>(<NavLink key={link.path} to={link.path} onClick={()=>setOpenPath(null)}
              className={({isActive})=>`rounded-xl px-4 py-3 text-sm 
              ${isActive ? 'bg-cinema text-white' : 'text-zinc-300 hover:bg-zinc-900'}`}>
              {link.name}
            </NavLink>))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar;