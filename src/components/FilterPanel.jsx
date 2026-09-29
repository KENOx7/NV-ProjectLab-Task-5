import { Check, ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const emptyFilters = {genreId: '', yearMin: '', yearMax: '', ratingMin: '', ratingMax: ''}

function FilterPanel({children, genres, onApply, onClear}){
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState(emptyFilters)
  const selectedGenre = genres.find((genre)=>String(genre.id) === filters.genreId)
  const changeFilter=(name, value)=>{setFilters((current)=>({...current,[name]:value}))}
  const clearFilters=()=>{setFilters(emptyFilters);setIsOpen(false);onClear()}

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
      <div className="min-w-0 flex-1">{children}</div>
      <button type="button" onClick={()=>setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-sm font-semibold hover:border-cinema sm:w-auto">
        <span className="flex items-center gap-2"><SlidersHorizontal size={18} /> {selectedGenre?.name || 'Filtrlər'}</span>
        <ChevronDown size={17} className={isOpen ? 'rotate-180 transition' : 'transition'} />
      </button>
      {isOpen&&(
        <div className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-5 shadow-xl sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Filmləri filtrlə</h3>
            <button type="button" onClick={clearFilters} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white">
              <RotateCcw size={14} /> Təmizlə
            </button>
          </div>
          <p className="mb-3 mt-6 text-xs font-semibold text-zinc-500">KATEQORİYA</p>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre)=>{
              const active = filters.genreId === String(genre.id)
              return(
                <button type="button" key={genre.id} onClick={()=>changeFilter('genreId', active ? '':String(genre.id))}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs 
                    ${active ? 'border-cinema bg-cinema/15 text-white' 
                    : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                  {genre.name} {active && <Check size={13} />}
                </button>
              )
            })}
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row">
            <div className="min-w-0 flex-1">
              <NumberRange title="Buraxılış ili" minValue={filters.yearMin} maxValue={filters.yearMax}
                minName="yearMin" maxName="yearMax" minPlaceholder="1900" 
                maxPlaceholder={String(new Date().getFullYear())} onChange={changeFilter} />
            </div>
            <div className="min-w-0 flex-1">
              <NumberRange title="Reytinq" minValue={filters.ratingMin} maxValue={filters.ratingMax}
                minName="ratingMin" maxName="ratingMax" minPlaceholder="0" maxPlaceholder="10"
                onChange={changeFilter} step="1"/>
            </div>
          </div>
          <button type="button" onClick={()=>{onApply(filters); setIsOpen(false)}}
            className="mt-6 w-full rounded-xl bg-cinema py-3 font-semibold hover:bg-red-700">
            Filtrləri tətbiq et
          </button>
        </div>
      )}
    </div>
  )
}

function NumberRange({title, minValue, maxValue, minName, maxName, minPlaceholder, 
                      maxPlaceholder, onChange, step = '1' }) {
  return(
    <div>
      <p className="mb-3 text-xs font-semibold uppercase text-zinc-500">{title}</p>
      <div className="flex gap-2">
        <input type="number" value={minValue} step={step} min="0" 
        placeholder={`Min: ${minPlaceholder}`} onChange={(event)=>onChange(minName, event.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm outline-none focus:border-cinema" />
        <input type="number" value={maxValue} step={step} min="0" 
        placeholder={`Max: ${maxPlaceholder}`} onChange={(event)=>onChange(maxName, event.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm outline-none focus:border-cinema" />
      </div>
    </div>
  )
}

export default FilterPanel;