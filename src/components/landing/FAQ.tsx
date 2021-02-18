import React from 'react'
import { useMessageUsModal } from '../../context/messageUs'
import Copy from '../Copy'
import Heading from '../Heading'
import Link from '../Link'
import Wrapper from '../Wrapper'

interface QuestionProps {
  question: string
}

const Question: React.FunctionComponent<QuestionProps> = (props) => (
  <div className="my-4">
    <Heading level={4} weight="medium" className="mb-1">
      {props.question}
    </Heading>
    <Copy>{props.children}</Copy>
  </div>
)

const FAQ: React.FunctionComponent = () => {
  const { enableModal } = useMessageUsModal()

  return (
    <div className="py-28 bg-grey-800">
      <Wrapper width="prose">
        <Heading level={1} align="center" className="mb-8">
          Frequently Asked Questions
        </Heading>

        <Question question="Do you take on commercial projects?">Yes!</Question>

        <Question question="Do you take on residential projects?">
          Yes!
        </Question>

        <Question question="Do you take on jobs outside the Mid North Coast?">
          Sometimes.{' '}
          <Link onClick={() => enableModal()}>Send us a message</Link> outlining
          where you'd like the work done, and we'll see what we can do.
        </Question>
      </Wrapper>
    </div>
  )
}

export default FAQ
