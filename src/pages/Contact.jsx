import { Mail, MapPin, Phone } from 'lucide-react';

const contactItems = [
  {
    icon: <Mail size={20} />,
    title: 'E-poçt',
    text: 'kenan777ehmedov@gmail.com',
    href: 'mailto:kenan777ehmedov@gmail.com'
  },
  {
    icon: <Phone size={20} />,
    title: 'Telefon',
    text: '+994 50 123 12 12',
    href: 'tel:+994501231212'
  },
  {
    icon: <MapPin size={20} />,
    title: 'Ünvan',
    text: 'Bakı, Azərbaycan',
    href: null
  }
]

function Contact(){
  return(
    <main className="mx-auto min-h-screen max-w-5xl px-5 pb-20 pt-12 sm:pt-32 lg:px-8">
      <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Bizimlə əlaqə saxla</h1>
      <p className="mt-5 max-w-2xl text-zinc-400">
        Təklif, sual və ya tapılmış xəta barədə bildiriş göndərmək istəyirsənsə — aşağıdakı formu doldur və ya birbaşa əlaqə vasitələrindən istifadə et.
      </p>
      <div className="-mx-2 mt-10 flex flex-wrap">
        {contactItems.map(({icon, title, text, href})=>(
          <div key={title} className="w-full px-2 pb-4 sm:w-1/3">
            <div className="h-full rounded-2xl border border-white/10 bg-zinc-900 p-6 transition-colors hover:border-cinema/40">
              <div className="text-cinema">{icon}</div>
              <h2 className="mt-4 font-bold">{title}</h2>
              {href?(
                <a href={href} className="mt-1 block text-sm text-zinc-400 hover:text-white">
                  {text}
                </a>
              ) : (
                <p className="mt-1 text-sm text-zinc-400">{text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="my-12 h-px bg-white/10" />
      <h2 className="mb-6 text-2xl font-bold">Mesaj göndər</h2>
      <form onSubmit={(e)=>e.preventDefault()}
        className="flex flex-wrap gap-y-5 rounded-2xl border border-white/10 bg-zinc-900 p-6 sm:p-8">
        <div className="w-full sm:w-1/2 sm:pr-2">
          <label className="mb-2 block text-sm font-semibold">Ad</label>
          <input type="text" placeholder="Adın"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-cinema"/>
        </div>
        <div className="w-full sm:w-1/2 sm:pl-2">
          <label className="mb-2 block text-sm font-semibold">E-poçt</label>
          <input type="email" placeholder="example@gmail.com"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-cinema"/>
        </div>
        <div className="w-full">
          <label className="mb-2 block text-sm font-semibold">Mesaj</label>
          <textarea rows={5} placeholder="Mesajınızı buraya yazın..."
            className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-cinema"/>
        </div>
        <div className="w-full">
          <button type="submit"
            className="w-full rounded-xl bg-cinema px-6 py-3 font-bold transition hover:bg-red-700 sm:w-auto">
            Göndər
          </button>
        </div>
      </form>
    </main>
  )
}

export default Contact;