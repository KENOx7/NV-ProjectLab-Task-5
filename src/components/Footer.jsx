import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer(){
  return(
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:flex-row sm:flex-wrap sm:justify-between lg:px-8">
        <div className="w-full sm:w-auto sm:max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold">
            Keno<span className="text-cinema">Film</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-zinc-500">
            Məşhur filmləri kəşf et.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <h3 className="font-bold">Keçidlər</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
            <Link to="/" className="hover:text-white">Ana səhifə</Link>
            <Link to="/about" className="hover:text-white">Haqqımızda</Link>
            <Link to="/contact" className="hover:text-white">Əlaqə</Link>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <h3 className="font-bold">Sosial Media Hesablarımız</h3>
          <div className="mt-4 flex gap-3 text-zinc-400">
            <a href="https://github.com/KENOx7" target="_blank" rel="noreferrer" aria-label="GitHub" 
              className="rounded-lg border border-white/10 p-3 hover:border-cinema hover:text-white">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/kanan-ahmadov-774647291" target="_blank" rel="noreferrer" aria-label="LinkedIn" 
              className="rounded-lg border border-white/10 p-3 hover:border-cinema hover:text-white">
              <Linkedin size={18} />
            </a>
            <a href="mailto:kenan777ehmedov@gmail.com" aria-label="Email" 
              className="rounded-lg border border-white/10 p-3 hover:border-cinema hover:text-white">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} KenoFilm Bütün Hüquqları Qorunur :D
      </div>
    </footer>
  )
}

export default Footer;