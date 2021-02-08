import React, { FunctionComponent } from 'react'
import { useMessageUsModal } from '../context/messageUs'

const MessageUsModal: FunctionComponent = () => {
  const { isShowingModal, disableModal } = useMessageUsModal()

  if (!isShowingModal) {
    return null
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-grey-900 opacity-50 z-0"
        onClick={() => disableModal()}
      />
      <div className="fixed inset-0 pointer-events-none">Message us</div>
    </>
  )
}

export default MessageUsModal
