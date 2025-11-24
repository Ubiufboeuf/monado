export function HomeGuest () {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-1/2 flex flex-col items-center justify-between gap-8 h-fit w-124 p-6 border bg-neutral-800 border-neutral-600 rounded-xl'>
      <h1 className='text-2xl font-bold text-center'>¡Bienvenido a YouTube!</h1>
      <p className='-mt-2 text-center'>Acá podrás encontrar
        <strong> videos </strong>y<strong> shorts </strong>
        de todo tipo, y si no sabes qué buscar, el&nbsp;
        <a href='/tv' className='relative w-fit h-fit group inline-flex'>
          {/* hay tres "modo TV",
            - el 1ro es para mantener espacios,
            - el segundo para la vista normal,
            - y el tercero para el hover
          */}
          <span className='opacity-0'>modo TV</span>
          <strong className='absolute z-1 left-1/2 top-1/2 -translate-1/2 text-nowrap [background-image:var(--color-pink-gradient)] bg-clip-text text-transparent'>modo TV</strong> 
          <strong className='absolute z-2 left-1/2 top-1/2 -translate-1/2 text-nowrap [background-image:var(--color-gradient)] bg-clip-text text-transparent transition-opacity opacity-0 group-hover:opacity-100'>modo TV</strong>
        </a>
        &nbsp;será lo mejor para tí.
      </p>
      <span className='text-neutral-400 text-wrap text-xs text-center'>Necesitas consumir contenido para poder recomendarte cosas, <br />
        <strong>¡animate a hacer tu primera búsqueda!</strong>
      </span>
    </div>
  )
}
