import { LoaderCircle } from 'lucide-react';

function Loader(){
  return(
    <div className="flex min-h-64 items-center justify-center text-zinc-400">
      <LoaderCircle className="mr-3 animate-spin text-cinema" /> Filmlər yüklənir...
    </div>
  )
}

export default Loader;