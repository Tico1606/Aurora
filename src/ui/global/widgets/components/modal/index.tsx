import { forwardRef, useImperativeHandle } from 'react'
import type { ModalRef } from './modal-ref'
import { ModalView, type ModalViewProps } from './modal-view'
import { useModal } from './use-modal'

export type { ModalRef } from './modal-ref'

type ModalProps = Omit<
  ModalViewProps,
  'ref' | 'isOpen' | 'open' | 'close' | 'isAnimating'
>

export const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const { isOpen, open, close, isAnimating } = useModal(props.onOpen, props.onClose)

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <ModalView
      {...props}
      isOpen={isOpen}
      open={open}
      close={close}
      isAnimating={isAnimating}
    />
  )
})
