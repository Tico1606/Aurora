import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const useModal = (onOpenModal?: () => void, onCloseModal?: () => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousOverflow = useRef<string | null>(null)
  const previousPaddingRight = useRef<string | null>(null)
  const wasOpen = useRef(false)
  const onOpenModalRef = useRef(onOpenModal)
  const onCloseModalRef = useRef(onCloseModal)

  onOpenModalRef.current = onOpenModal
  onCloseModalRef.current = onCloseModal

  const open = useCallback(() => {
    setIsOpen(true)
    onOpenModalRef.current?.()

    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const close = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }, [])

  useLayoutEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)

      previousOverflow.current = document.body.style.overflow
      previousPaddingRight.current = document.body.style.paddingRight

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        const currentPaddingRight = Number.parseFloat(
          window.getComputedStyle(document.body).paddingRight || '0',
        )
        document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)

      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current
        previousOverflow.current = null
      }

      if (previousPaddingRight.current !== null) {
        document.body.style.paddingRight = previousPaddingRight.current
        previousPaddingRight.current = null
      }
    }
  }, [isOpen, close])

  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      onCloseModalRef.current?.()
    }

    wasOpen.current = isOpen
  }, [isOpen])

  return {
    isOpen,
    open,
    close,
    isAnimating,
  }
}
