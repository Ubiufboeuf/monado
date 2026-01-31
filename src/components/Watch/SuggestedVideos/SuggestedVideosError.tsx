export function SuggestedVideosError () {
  return (
    <div class='h-full w-full flex items-center justify-center flex-col gap-4 px-4 not-lg:not-cinema:pb-32 group:h-full'>
      <h1 class='text-2xl font-bold text-center'>Hubo un error consiguiendo los videos</h1>
      <p class='w-fit max-w-md text-pretty text-center'>
        Si recargar la página no soluciona el error ponte en contacto con el
        <a href='/' class='text-blue-400'> soporte técnico </a>
        para solucionar el problema.
      </p>
    </div>
  )
}
