export function TailwindIndicator() {
  return (
    <div className='bg-accent/85 text-accent-foreground fixed bottom-1 left-1 z-50 flex size-8 items-center justify-center rounded p-3 font-mono text-sm'>
      <div className='xs:hidden block'>2xs</div>
      <div className='xs:block hidden sm:hidden'>xs</div>
      <div className='hidden sm:block md:hidden'>sm</div>
      <div className='hidden md:block lg:hidden'>md</div>
      <div className='hidden lg:block xl:hidden'>lg</div>
      <div className='hidden xl:block 2xl:hidden'>xl</div>
      <div className='hidden 2xl:block'>2xl</div>
    </div>
  );
}
