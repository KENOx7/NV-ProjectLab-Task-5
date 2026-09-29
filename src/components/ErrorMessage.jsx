import { CircleAlert } from 'lucide-react';

function ErrorMessage({err}){
  return(
    <div className="mx-auto my-16 max-w-lg rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
      <CircleAlert className="mx-auto mb-3 text-red-400" size={36} />
      <h2 className="text-xl font-bold">Məlumatı gətirmək mümkün olmadı</h2>
      <p className="mt-2 text-sm text-zinc-400">Səhv link və ya internet bağlantısını yoxlayıb, yenidən cəhd et.</p>
      {err&&(
        <button onClick={err} className="mt-5 rounded-lg bg-cinema px-5 py-3 font-semibold hover:bg-red-700">
          Yenidən yoxla
        </button>
      )}
    </div>
  )
}

export default ErrorMessage;