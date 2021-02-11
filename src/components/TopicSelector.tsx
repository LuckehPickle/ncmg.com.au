import React, { FunctionComponent, useState } from 'react'
import Copy from './Copy'

interface TopicProps {
  label: string
  id: string
  selected: string | null
  setSelected: (id: string) => void
}

const Topic: FunctionComponent<TopicProps> = (props) => (
  <button
    onClick={() => props.setSelected(props.id)}
    className={`border-2 ${
      props.selected === props.id ? 'border-zesty-500' : 'border-grey-600'
    } focus:outline-white p-3 first:rounded-l last:rounded-r`}
  >
    <Copy>{props.label}</Copy>
  </button>
)

const TopicSelector: FunctionComponent = () => {
  const [selected, setSelected] = useState('')

  return (
    <div className="grid grid-cols-3 mt-2">
      <Topic
        label="Request quote"
        id="quote"
        selected={selected}
        setSelected={setSelected}
      />
      <Topic
        label="Make enquiry"
        id="enquiry"
        selected={selected}
        setSelected={setSelected}
      />
      <Topic
        label="Other"
        id="other"
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}

export default TopicSelector
