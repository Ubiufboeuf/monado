export function VideoListCardFallback () {
  return (
    <article class='h-24 w-full flex items-start justify-center gap-2'>
      <section class='h-full aspect-video bg-neutral-700 rounded-xl' />
      <section class='w-full flex min-h-24 h-full gap-2 flex-1'>
        <div class='flex-1 h-fit pt-0.5'>
          <div class='w-9/10 h-6 bg-neutral-700 rounded mb-3' />
          <div class='w-4/10 h-2 bg-neutral-700 rounded mb-1.5' />
          <div class='w-6/10 h-2 bg-neutral-700 rounded' />
        </div>
      </section>
    </article>
  )
}
