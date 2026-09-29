import { Film, Search, Star, Tv2 } from 'lucide-react';

const features = [
  {
    icon: <Search size={20} />,
    title: 'Sürətli axtarış',
    text: 'İstənilən filmi adına görə saniyələr içinde tap.'
  },
  {
    icon: <Film size={20} />,
    title: 'Ətraflı məlumat',
    text: 'Müddət, janr, aktyor heyəti, reytinq və süjet xülasəsi — hamısı bir yerdə, başqa tab açmağa ehtiyac yoxdur.'
  },
  {
    icon: <Star size={20} />,
    title: 'Populyar və reytinqli filmlər',
    text: 'Gündəlik yenilənən ən çox izlənən və ən yüksək qiymətləndirilən filmləri kəşf et.'
  },
  {
    icon: <Tv2 size={20} />,
    title: 'Janra görə filtrləmə',
    text: 'Aksiyon yerinə dram, komediya və ya qorxu seçmək istəyirsən? Bir kliklə seç.'
  }
]

const stats = [
  {value: '800K+', label: 'Film bazasında'},
  {value: 'Hər gün', label: 'Məlumatlar yenilənir'},
  {value: 'Pulsuz', label: 'Qeydiyyat tələb olunmur'}
]

function About(){
  return(
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-20 pt-12 sm:pt-32 lg:px-8">
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        İstədiyiniz filmi asanlıqla tap.
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
        KenoFilm istədiyiniz filmi rahatlıqla tapmaq imkanı olan şəxsi bir layihədir. Bütün məlumatlar — reytinqlər, süjetlər, janrlar, rejissor və digər məlumatlar, digər saytlara keçid etmədən bir yerdə.
      </p>
      <div className="mt-10 flex flex-wrap gap-8">
        {stats.map(({value, label})=>(
          <div key={label}>
            <p className="text-3xl font-extrabold text-cinema">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="my-12 h-px bg-white/10" />
      <h2 className="mb-6 text-2xl font-bold">Nə edə bilərsən?</h2>
      <div className="-mx-2 flex flex-wrap">
        {features.map(({icon, title, text})=>(
          <div key={title} className="w-full px-2 pb-4 sm:w-1/2">
            <div className="h-full rounded-2xl border border-white/10 bg-zinc-900 p-6 transition-colors hover:border-cinema/40">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cinema text-white">
                {icon}
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default About;