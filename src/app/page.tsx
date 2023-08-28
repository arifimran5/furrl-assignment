import ProductList from '@/components/ProductList'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Parallax Image */}

      <div className='relative'>
        <Image
          className='w-full -z-50 h-[15rem] object-cover object-top'
          width={300}
          height={200}
          src='https://cdn.furrl.in/vibes/VibeCard-NightFlea12.webp'
          alt='Event picture of FLEA'
        />

        <h1 className='font-extralight night_flea_message text-3xl absolute top-[70%] italic text-white translate-y-[-50%] left-1/2 translate-x-[-50%]'>
          #NightFlea
        </h1>
      </div>

      {/* Main Tab  */}
      <div className='bg-gray-100 w-full p-4 flex gap-4 justify-between rounded-md'>
        <div className='w-full text-center cursor-pointer'>
          <p className='bg-white rounded-md p-2'>Products</p>
        </div>
        <div className='w-full text-center'>
          <p className='bg-gray-200/50 text-gray-300 rounded-md p-2'>
            Collections
          </p>
        </div>
      </div>

      {/* List of Products */}
      <ProductList />
    </main>
  )
}
