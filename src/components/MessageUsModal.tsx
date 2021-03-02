import React, { useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'

import Copy from './Copy'
import FormControl from './FormControl'
import Heading from './Heading'
import PaperPlaneIcon from './icons/PaperPlane'
import Textarea from './Textarea'
import Textbox from './Textbox'
import { PrimaryButton } from './Button'
import { useMessageUsModal } from '../context/messageUs'
import CloseIcon from './icons/Close'

interface HTMLElementWithInert extends HTMLElement {
  inert?: boolean
}

export function encodeForm(
  data: Record<string, string | number | boolean>,
): string {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const MessageUsModal: React.FunctionComponent = () => {
  const [formState, setFormState] = useState({})

  const { isShowingModal, disableModal } = useMessageUsModal()
  const modal = useRef<HTMLDivElement>(null)

  // Move focus, toggle body scrolling, and more
  const [prevActiveElem, setPrevActiveElem] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const nonModal = document.getElementById(
      'non-modal-content',
    ) as HTMLElementWithInert
    nonModal.inert = isShowingModal

    if (isShowingModal) {
      setPrevActiveElem(document.activeElement as HTMLElement)
      document.body.classList.add('overflow-hidden')
      modal.current.querySelector('input').focus()
    } else {
      document.body.classList.remove('overflow-hidden')
      prevActiveElem?.focus()
    }
  }, [isShowingModal])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { target } = event
    const name = target.getAttribute('name')
    const value = target.value

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isShowingModal && event.key === 'Escape') {
      disableModal()
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForm({
        'form-name': 'sendMessage',
        ...formState,
      }),
    })
      .then(() => navigate('/thanks'))
      .catch((error) => alert(error))
  }

  const styles = [
    'fixed inset-0 z-10',
    isShowingModal ? '' : 'hidden',
    'flex items-start justify-center',
    'overflow-x-hidden overflow-y-auto',
    'sm:py-14',
  ]

  return (
    <div
      className={styles.join(' ')}
      role="dialog"
      onKeyDown={handleKeyDown}
      aria-labelledby="dialog__title"
      aria-describedby="dialog__copy"
      aria-hidden={!isShowingModal}
    >
      <div
        id="dialog__mask"
        className="fixed inset-0 bg-black opacity-80 z-10"
        onClick={() => disableModal()}
      />

      <button
        className="flex items-center justify-center h-10 w-10 rounded-full bg-grey-900 text-white fixed top-5 right-5 z-30 text-center focus:outline-zesty"
        onClick={() => disableModal()}
      >
        <CloseIcon />
      </button>

      <div
        ref={modal}
        id="dialog__body"
        className="relative z-20 bg-grey-800 max-w-screen-sm w-full p-4 pt-10 sm:p-8 rounded overflow-hidden"
      >
        <Heading id="dialog__title" level={3}>
          Send us a message
        </Heading>

        <Copy id="dialog__copy" className="mt-1 mb-6">
          We will respond to your message as soon as possible.
        </Copy>

        <form
          name="sendMessage"
          method="POST"
          data-netlify="true"
          action="/thanks"
          onSubmit={handleSubmit}
        >
          <FormControl id="name" label="Full Name">
            <Textbox onChange={handleChange} />
          </FormControl>

          <FormControl
            id="email"
            label="Email Address"
            help="We need this to respond to your message."
          >
            <Textbox kind="email" onChange={handleChange} />
          </FormControl>

          <FormControl id="message" label="Message">
            <Textarea onChange={handleChange} />
          </FormControl>

          <div className="bg-grey-900 p-4 sm:p-8 -mx-4 -mb-4 sm:-mx-8 sm:-mb-8">
            <PrimaryButton
              onClick={() => disableModal()}
              icon={PaperPlaneIcon}
              type="submit"
            >
              Send message
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageUsModal
