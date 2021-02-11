import React, { FunctionComponent } from 'react'

import Copy from './Copy'
import FormControl from './FormControl'
import Heading from './Heading'
import PaperPlaneIcon from './icons/PaperPlane'
import Textarea from './Textarea'
import Textbox from './Textbox'
import TopicSelector from './TopicSelector'
import { PrimaryButton } from './Button'
import { useMessageUsModal } from '../context/messageUs'

// TODO fix focus/accessibility issues
const MessageUsModal: FunctionComponent = () => {
  const { isShowingModal, disableModal } = useMessageUsModal()

  if (!isShowingModal) {
    return null
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!isShowingModal) return

    if (event.key === 'Escape') {
      disableModal()
    }
    console.debug(event.key)
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <div
        className="fixed inset-0 bg-black opacity-75 z-10"
        onClick={() => disableModal()}
      />

      <div className="fixed inset-0 pointer-events-none overflow-x-hidden overflow-y-auto flex justify-center items-start px-0 py-16 z-20">
        <div
          className="pointer-events-auto bg-grey-800 max-w-screen-sm w-full p-10 rounded overflow-hidden"
          role="dialog"
          aria-labelledby="messageUsTitle"
          aria-describedby="messageUsCopy"
        >
          <Heading id="messageUsTitle" level={1}>
            Send us a message
          </Heading>

          <Copy id="messageUsCopy" className="mt-2 mb-6">
            We will respond to your message as soon as possible.
          </Copy>

          <FormControl
            id="topic"
            label="Topic"
            help="What would you like to talk about today?"
            isOptional
          >
            <TopicSelector />
          </FormControl>

          <FormControl id="name" label="Full Name">
            <Textbox />
          </FormControl>

          <FormControl
            id="email"
            label="Email Address"
            help="We need this to respond to your message."
          >
            <Textbox />
          </FormControl>

          <FormControl id="message" label="Message">
            <Textarea />
          </FormControl>

          <div className="px-10 py-7 bg-grey-900 -mx-10 -mb-10">
            <PrimaryButton onClick={() => disableModal()} icon={PaperPlaneIcon}>
              Send message
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageUsModal
