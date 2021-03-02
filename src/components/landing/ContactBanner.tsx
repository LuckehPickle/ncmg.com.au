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
    <div className="pt-10 sm:pt-24 bg-grey-800">
      <Wrapper collapseOnMobile>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-grey-900 bg-contact-pattern bg-cover sm:rounded px-5 py-6 sm:p-10">
          <Heading level={3} className="mb-4 lg:mb-0">
            Ready to get started?
            <br />
            <Bold>Get in touch with our friendly staff.</Bold>
          </Heading>

          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <PrimaryButton
              onClick={() => enableModal()}
              icon={MailOpenIcon}
              className="mb-4 sm:mb-0 sm:mr-4"
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
