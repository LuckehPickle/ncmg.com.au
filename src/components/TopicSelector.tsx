import React, { useState } from 'react'
import Copy from './Copy'
import CalculatorIcon from './icons/Calculator'
import ChatIcon from './icons/Chat'
import QuestionIcon from './icons/Question'
import { Icon } from './icons/types'

interface TopicProps {
  icon?: Icon
  label: string
  id: string
  selected: string | null
  setSelected: (id: string) => void
}

const Topic: React.FunctionComponent<TopicProps> = (props) => {
  const Icon = props.icon

  const isSelected = props.selected === props.id

  const styles = [
    'flex flex-col items-center',
    'border-2',
    isSelected ? 'border-zesty-500' : 'border-grey-600',
    isSelected ? 'bg-grey-700' : 'bg-grey-800',
    'focus:outline-white',
    'px-3 py-5',
    'first:rounded-l',
    'last:rounded-r',
  ]

  return (
    <button
      onClick={() => props.setSelected(props.id)}
      className={styles.join(' ')}
    >
      {props.icon && (
        <div className="flex items-center justify-center rounded-full bg-grey-900 h-12 w-12 mb-3">
          <Icon className="text-white" />
        </div>
      )}
      <Copy className="font-normal">{props.label}</Copy>
    </button>
  )
}

const TopicSelector: React.FunctionComponent = () => {
  const [selected, setSelected] = useState('')

  return (
    <div className="grid grid-cols-3 mt-2">
      <Topic
        icon={CalculatorIcon}
        label="Request quote"
        id="quote"
        selected={selected}
        setSelected={setSelected}
      />
      <Topic
        icon={QuestionIcon}
        label="Ask question"
        id="question"
        selected={selected}
        setSelected={setSelected}
      />
      <Topic
        icon={ChatIcon}
        label="Other"
        id="other"
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}

export default TopicSelector
