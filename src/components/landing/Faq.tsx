import React from 'react'

import Copy from '../Copy'
import Divider from '../Divider'
import Heading from '../Heading'
import Link from '../Link'
import Wrapper from '../Wrapper'
import { useMessageUsModal } from '../../context/messageUs'

interface QuestionProps {
  question: string
}

const Question: React.FunctionComponent<QuestionProps> = (props) => (
  <Copy variant="large" className="my-6">
    <span className="font-normal text-white bg-grey-900 rounded pr-1 md:px-1">
      {props.question}
    </span>
    &nbsp;
    <span>{props.children}</span>
  </Copy>
)

const FAQ: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  return (
    <div className="py-16 md:py-40 bg-grey-800">
      <Wrapper width="max-w-prose">
        <Heading level={1} align="center">
          Frequently Asked Questions
        </Heading>

        <Copy variant="large" className="mt-6 md:mt-8">
          Here's some common questions our customers have asked us, about NCMG's
          area of service, products, and more.
        </Copy>

        <Divider className="my-8" />

        <Question question="Do you take on commercial projects?">Yes!</Question>

        <Question question="Do you take on residential projects?">
          Yes!
        </Question>

        <Question question="Do you take on jobs outside the Mid North Coast?">
          Sometimes.{' '}
          <Link onClick={() => enableModal()}>Send us a message</Link> outlining
          where you'd like the work done, and we'll see what we can do.
        </Question>

        <Question question="Can you take on small projects?">
          Sure. We will take on projects of any size.
        </Question>

        <Question question="How can I get in touch?">
          You can{' '}
          <Link external to="tel:65811355">
            call
          </Link>
          ,{' '}
          <Link external to="tel:65810949">
            send a fax
          </Link>
          ,{' '}
          <Link external to="mailto:sales@ncmg.com.au">
            email us
          </Link>
          , or <Link onClick={() => enableModal()}>send a message</Link> on our
          website. You can even drop into our office during opening hours. We
          look forward to hearing from you!
        </Question>
      </Wrapper>
    </div>
  )
}

export default FAQ
