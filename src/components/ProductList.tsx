'use client'

import { cn } from '@/utils/helper'
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { LoadingSkeleton, LoadingSpinner } from './LoadingSkeleton'
import ProductCard from './ProductCard'

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
    return <LoadingSkeleton />
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
              <ProductCard
                brandName={pr.brandName}
                id={pr.id}
                key={pr.id}
                price={pr.price}
                title={pr.title}
                src={pr.images[0].src}
              />
            ))}
          </span>
        ))}
        {isFetchingNextPage && <LoadingSpinner />}
        <span ref={ref}></span>
      </section>
    </div>
  )
}
