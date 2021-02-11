import React, { FunctionComponent } from 'react'

interface BaseButtonProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: FunctionComponent
  fullWidth?: boolean
}

const styles = {
  common: 'flex items-center leading-none py-4 px-6 rounded',
  primary:
    'bg-zesty-500 text-grey-800 font-normal transform-gpu hover:-translate-y-0.5 transition-transform focus:outline-white',
  secondary: 'bg-grey-700 text-white focus:outline-zesty',
  fullWidth: 'w-full justify-center',
}

const BaseButton: FunctionComponent<BaseButtonProps> = (props) => {
  const classes = [styles.common]
  props.className && classes.push(props.className)
  props.fullWidth && classes.push(styles.fullWidth)

  const Icon = props.icon

  return (
    <button className={classes.join(' ')} onClick={props.onClick}>
      {Icon && <Icon className="w-6 mr-2 text-grey-700" />}
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

type SecondaryButtonProps = BaseButtonProps

export const SecondaryButton: FunctionComponent<SecondaryButtonProps> = (
  props,
) => {
  const { className, ...otherProps } = props

  const classes = [styles.secondary]
  className && classes.push(className)

  return (
    <BaseButton className={classes.join(' ')} {...otherProps}>
      {props.children}
    </BaseButton>
  )
}
