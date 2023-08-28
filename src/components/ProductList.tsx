'use client'

import { cn } from '@/utils/helper'
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Share } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import * as Dialog from '@radix-ui/react-dialog'

const queryClient = new QueryClient()

const ProductListWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  )
}
export default ProductListWrapper

const fetchData = async (page: number) => {
  const response = await fetch(
    'https://api.furrl.in/api/v1/vibe/getVibeRelate?visitId=&page=' + page,
    {
      method: 'POST',
      body: JSON.stringify({ vibe: '#NightFlea' }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return await response.json()
}

const productCategory = ['All', 'Accesories', 'Home', 'Apparel', 'Beauty']

function ProductList() {
  const { ref, inView } = useInView()
  const [shareOpen, setShareOpen] = useState(false)

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['products'],
      async ({ pageParam = 1 }) => await fetchData(pageParam),
      {
        getNextPageParam: (_, pages) => pages.length + 1,
      }
    )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isLoading) {
    return <div>Fetching....</div>
  }

  function handleShare(e: any) {
    e.preventDefault()
    setShareOpen(true)
  }

  const total = data?.pages[0].totalStoredProductIdsCount
  return (
    <div className='bg-white'>
      {/* total number and Product categories  */}
      <section className='sticky top-12 z-50 bg-white py-1'>
        <div className='mt-2'>
          <p className='font-light italic text-gray-400'>{total} Products</p>
        </div>
        <div className='flex mt-2 overflow-scroll product_category gap-4'>
          {productCategory.map((p, i) => (
            <div
              className={cn(
                'border-2 px-4 py-1 border-gray-200 rounded-2xl text-gray-400',
                i === 0 ? 'bg-indigo-500 text-white border-none' : ''
              )}
              key={p}
            >
              {p}
            </div>
          ))}
        </div>
      </section>

      <section className='grid grid-cols-2 mt-4 bg-white'>
        {data?.pages.map((page, i) => (
          <span key={i}>
            {page.productData.map((pr: any) => (
              <Link
                href={`/products/${pr.id}`}
                key={pr.id}
                className='mb-3 cursor-pointer'
              >
                <div className='relative'>
                  <Image
                    className='aspect-square w-full'
                    width={200}
                    height={200}
                    src={pr.images[0].src}
                    alt={`product image of ${pr.title}`}
                  />
                  <ShareModal
                    shareOpen={shareOpen}
                    setShareOpen={setShareOpen}
                    id={pr.id}
                  >
                    <button
                      onClick={handleShare}
                      className='bg-gray-600/80 hover:bg-indigo-600/80 transition-colors w-max p-2 z-10 bottom-2 right-2 rounded-full absolute'
                    >
                      <Share className='text-white' size={18} />
                    </button>
                  </ShareModal>
                </div>
                <div className='p-1'>
                  <p className='text-sm text-gray-500'>{pr.brandName}</p>
                  <h1 className='text-sm w-max'>
                    {pr.title.substring(0, 25)}
                    {pr.title.length > 25 ? '...' : ''}
                  </h1>
                  <span className='text-sm text-gray-500'>₹{pr.price}</span>
                </div>
              </Link>
            ))}
          </span>
        ))}
        <span ref={ref}></span>
      </section>
    </div>
  )
}

function ShareModal({
  children,
  id,
  shareOpen,
  setShareOpen,
}: {
  children: React.ReactNode
  id: string
  shareOpen: boolean
  setShareOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog.Root open={shareOpen} onOpenChange={setShareOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-800/5 inset-0 fixed z-[100]' />
        <Dialog.Content className='fixed top-[50%] z-[200] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]'>
          <h1 className='text-xl font-medium mb-1'>Share Link</h1>
          <p>
            {`${
              process.env.NEXT_PUBLIC_VERCEL_URL
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : 'http://localhost:3000'
            }/products/${id}`}{' '}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
