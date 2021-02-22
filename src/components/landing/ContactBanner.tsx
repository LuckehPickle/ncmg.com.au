import React from 'react'

import Heading from '../Heading'
import MailOpenIcon from '../icons/MailOpen'
import PhoneIcon from '../icons/Phone'
import Wrapper from '../Wrapper'
import { Bold } from '../Copy'
import { PrimaryButton, SecondaryButton } from '../Button'
import { useMessageUsModal } from '../../context/messageUs'

const ContactBanner: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  return (
    <div className="pt-24 bg-grey-800">
      <Wrapper>
        <div className="flex items-center justify-between bg-contact-pattern bg-cover rounded p-10">
          <Heading level={3}>
            Ready to get started?
            <br />
            <Bold>Get in touch with our friendly staff.</Bold>
          </Heading>

          <div className="flex items-center">
            <PrimaryButton
              onClick={() => enableModal()}
              icon={MailOpenIcon}
              className="mr-4"
            >
              Send a message
            </PrimaryButton>

            <SecondaryButton icon={PhoneIcon} to="tel:65811355">
              Call us
            </SecondaryButton>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default ContactBanner
