export function HomeError () {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col gap-4 px-4'>
      <h1 className='text-2xl font-bold'>Hubo un error consiguiendo los videos</h1>
      <p className='w-md max-w-full text-pretty text-center'>
        Si recargar la página no soluciona el error ponte en contacto con el
        <a href='/' className='text-blue-400'> soporte técnico </a>
        para solucionar el problema.
      </p>
    </div>
  )
}
