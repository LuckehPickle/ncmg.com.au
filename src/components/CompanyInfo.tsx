import React from 'react'
import { Icon } from './icons/types'
import Heading from './Heading'

interface CompanyInfoProps {
  icon: Icon
  label?: string
  className?: string
}

const styles = {
  common: 'flex mb-5 sm:mb-7 last:mb-0',
}

const CompanyInfo: React.FunctionComponent<CompanyInfoProps> = (props) => {
  const Icon = props.icon

  const classes = [styles.common]
  props.className && classes.push(props.className)

  return (
    <div className={classes.join(' ')}>
      <Icon className="text-grey-100 mr-3" />

      <div>
        {props.label && (
          <Heading level={5} weight="medium" className="leading-tight mb-1">
            {props.label}
          </Heading>
        )}
        {props.children}
      </div>
    </div>
  )
}

export default CompanyInfo
