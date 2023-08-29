import { Dispatch, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function ShareModal({
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
  const sharable_link =
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : 'http://localhost:3000') +
    '/products/' +
    id

  return (
    <Dialog.Root open={shareOpen} onOpenChange={setShareOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-800/80 inset-0 fixed z-[100]' />
        <Dialog.Content
          onClick={(e) => e.preventDefault()}
          className='fixed top-[50%] z-[200] left-[50%] max-h-[85vh] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px]'
        >
          <div className='flex flex-col overflow-scroll'>
            <h1 className='text-xl font-medium mb-1'>Share Link</h1>
            <p className='w-max'>{sharable_link}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
