export function VideoCardFallback () {
  return (
    <article class='h-full w-full flex flex-col'>
      <section class='w-full aspect-video bg-neutral-700 xs:rounded-xl' />
      <section class='w-full flex min-h-29 h-full pt-3.5 gap-2 flex-1'>
        <div class='size-9 mr-1 not-xs:ml-3 bg-neutral-700 rounded-full' />
        <div class='flex-1 h-fit'>
          <div class='w-9/10 h-4 bg-neutral-700 rounded mb-3' />
          <div class='w-6/10 h-4 bg-neutral-700 rounded' />
        </div>
      </section>
    </article>
  )
}
