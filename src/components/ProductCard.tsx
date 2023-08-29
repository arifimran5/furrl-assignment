'use client'

import Image from 'next/image'
import Link from 'next/link'
import ShareModal from './ShareModal'
import { useState } from 'react'
import { Share } from 'lucide-react'

type ProductCardProps = {
  id: string
  src: string
  title: string
  brandName: string
  price: number
}

export default function ProductCard({
  id,
  src,
  title,
  brandName,
  price,
}: ProductCardProps) {
  const [shareOpen, setShareOpen] = useState(false)

  function handleShare(e: any) {
    e.preventDefault()
    setShareOpen(true)
  }
  return (
    <Link href={`/products/${id}`} className='mb-3 cursor-pointer'>
      <div className='relative'>
        <Image
          className='aspect-square w-full'
          width={200}
          height={200}
          src={src}
          alt={`product image of ${title}`}
        />
        <ShareModal shareOpen={shareOpen} setShareOpen={setShareOpen} id={id}>
          <button
            onClick={handleShare}
            className='bg-gray-600/80 hover:bg-indigo-600/80 transition-colors w-max p-2 z-10 bottom-2 right-2 rounded-full absolute'
          >
            <Share className='text-white' size={18} />
          </button>
        </ShareModal>
      </div>
      <div className='p-1'>
        <p className='text-sm text-gray-500'>{brandName}</p>
        <h1 className='text-sm w-max'>
          {title.substring(0, 20)}
          {title.length > 20 ? '...' : ''}
        </h1>
        <span className='text-sm text-gray-500'>₹{price}</span>
      </div>
    </Link>
  )
}
