import { ChartSplineIcon } from 'lucide-react';

export function LoadingWithLogo() {
  return (
    <div className='grid size-full place-items-center'>
      <div className='relative inline-block border'>
        <div role='progressbar' aria-label='Loading' className='size-15'>
          <svg className='stroke-linejoin-round stroke-cap-round size-full fill-none stroke-3' viewBox='0 0 48 48'>
            <defs>
              <path
                id='cleanFlower'
                d='M24,4 C26.2,4 27.8,7.5 30,8.5 C32.2,9.5 35.5,8 37,9.5 C38.5,11 37,14.3 38,16.5 C39,18.7 42.5,20.3 42.5,22.5 C42.5,24.7 39,26.3 38,28.5 C37,30.7 38.5,34 37,35.5 C35.5,37 32.2,35.5 30,36.5 C27.8,37.5 26.2,41 24,41 C21.8,41 20.2,37.5 18,36.5 C15.8,35.5 12.5,37 11,35.5 C9.5,34 11,30.7 10,28.5 C9,26.3 5.5,24.7 5.5,22.5 C5.5,20.3 9,18.7 10,16.5 C11,14.3 9.5,11 11,9.5 C12.5,8 15.8,9.5 18,8.5 C20.2,7.5 21.8,4 24,4 Z'
              />
            </defs>
            <use href='#cleanFlower' className='stroke-secondary'></use>
            <use href='#cleanFlower' className='animate-m3-wavy-expand stroke-primary'></use>
          </svg>
        </div>
        <div className='text-primary absolute top-1/2 left-1/2 z-10 mb-0.5 -translate-1/2'>
          <ChartSplineIcon className='stroke-linejoin-round stroke-cap-round size-6 stroke-3' />
        </div>
      </div>
    </div>
  );
}
