import { Slot } from '@radix-ui/react-slot'
import { X } from 'lucide-react'
import { type ForwardedRef, type ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/ui/shadcn/utils/utils'
import type { ModalRef } from './modal-ref'

export type ModalViewProps = {
  title?: string
  children: (closeDialog: () => void) => ReactNode
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?: boolean
  hideScrollbar?: boolean
  onOpen?: () => void
  onClose?: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  isAnimating: boolean
  ref?: ForwardedRef<ModalRef>
}

const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full mx-4',
}

export const ModalView = ({
  title,
  children,
  trigger,
  size = 'md',
  isDismissable = true,
  hideCloseButton = false,
  hideScrollbar = true,
  onOpen: _onOpen,
  onClose: _onClose,
  isOpen,
  open,
  close,
  isAnimating,
  ref: _ref,
}: ModalViewProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const modalContent = isOpen ? (
    <>
      {isDismissable && (
        <button
          type='button'
          className={cn(
            'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-out',
            isAnimating ? 'opacity-100' : 'opacity-0',
          )}
          onClick={close}
          onKeyDown={(e) => e.key === 'Enter' && close()}
          aria-label='Fechar modal'
        />
      )}

      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
        <div
          className={cn(
            'pointer-events-auto relative w-full overflow-x-hidden bg-popover text-popover-foreground rounded-lg shadow-2xl transition-all duration-300 ease-out transform',
            sizeClasses[size],
            size === 'full' ? 'h-[90vh]' : 'max-h-[90vh]',
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300'
              : 'opacity-0 scale-90 translate-y-4',
          )}
        >
          {(title || !hideCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between p-6 border-b border-border transition-all duration-300 ease-out',
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )}
            >
              {title && (
                <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
              )}
              {!hideCloseButton && (
                <button
                  type='button'
                  onClick={close}
                  onKeyDown={(e) => e.key === 'Enter' && close()}
                  className='text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 cursor-pointer p-1 rounded-md hover:bg-muted'
                  aria-label='Fechar modal'
                >
                  <X className='w-5 h-5' />
                </button>
              )}
            </div>
          )}

          <div
            className={cn(
              'p-6 overflow-x-hidden max-h-[calc(90vh-8rem)] transition-all duration-300 ease-out delay-75',
              hideScrollbar ? 'scrollbar-hide' : 'scrollbar-light',
              isAnimating ? 'overflow-y-auto' : 'overflow-y-hidden',
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
          >
            {children(close)}
          </div>
        </div>
      </div>
    </>
  ) : null

  return (
    <>
      {trigger ? <Slot onClick={open}>{trigger}</Slot> : null}
      {isMounted && modalContent ? createPortal(modalContent, document.body) : null}
    </>
  )
}
