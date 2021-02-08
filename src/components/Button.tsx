import React, { FunctionComponent } from 'react'

interface BaseButtonProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const styles = {
  common: 'leading-none py-4 px-6 rounded',
  primary: 'bg-zesty-500 text-grey-900',
  secondary: 'bg-grey-700 text-white',
}

const BaseButton: FunctionComponent<BaseButtonProps> = (props) => {
  const classes = [styles.common]
  props.className && classes.push(props.className)

  return (
    <button className={classes.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

type PrimaryButtonProps = BaseButtonProps

export const PrimaryButton: FunctionComponent<PrimaryButtonProps> = (props) => {
  const { className, ...otherProps } = props

  const classes = [styles.primary]
  className && classes.push(className)

  return (
    <BaseButton className={classes.join(' ')} {...otherProps}>
      {props.children}
    </BaseButton>
  )
}

type SecondaryButtonProps = Omit<BaseButtonProps, 'className'>

export const SecondaryButton: FunctionComponent<SecondaryButtonProps> = (
  props,
) => (
  <BaseButton className="bg-grey-700 text-white rounded" {...props}>
    {props.children}
  </BaseButton>
)
