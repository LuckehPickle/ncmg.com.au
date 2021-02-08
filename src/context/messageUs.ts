import React, { useContext } from 'react'

interface MessageUsContextType {
  isShowingModal: boolean
  enableModal: () => void
  disableModal: () => void
}

export const MessageUsContext = React.createContext<MessageUsContextType>({
  isShowingModal: false,
  enableModal: () => {},
  disableModal: () => {},
})

export function useMessageUsModal() {
  return useContext(MessageUsContext)
}
