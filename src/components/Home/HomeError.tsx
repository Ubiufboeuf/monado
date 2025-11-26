export function HomeError () {
  return (
    <div class='h-full w-full flex items-center justify-center flex-col gap-4 px-4'>
      <h1 class='text-2xl font-bold'>Hubo un error consiguiendo los videos</h1>
      <p class='w-md max-w-full text-pretty'>
        Si recargar la página no soluciona el error ponte en contacto con el
        <a href='/' class='text-blue-400'> soporte técnico </a>
        para solucionar el problema.
      </p>
    </div>
  )
}
