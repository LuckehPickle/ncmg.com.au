import React, { FunctionComponent } from 'react'

interface BaseButtonProps {
  className?: string
  iconClassName?: string
  to?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: FunctionComponent
  fullWidth?: boolean
}

const styles = {
  common:
    'inline-flex items-center leading-none py-4 px-5 sm:px-6 rounded focus:outline-white text-sm sm:text-md',
  primary:
    'bg-gradient-to-tl from-zesty-500 to-zesty-400 text-grey-800 font-normal transform-gpu hover:-translate-y-0.5 transition-transform',
  secondary: 'bg-grey-700 text-white',
  fullWidth: 'w-full justify-center',
  icon: {
    primary: 'mr-2 text-grey-700',
    secondary: 'mr-2 text-white',
  },
}

const BaseButton: FunctionComponent<BaseButtonProps> = (props) => {
  const classes = [styles.common]
  props.className && classes.push(props.className)
  props.fullWidth && classes.push(styles.fullWidth)

  const Icon = props.icon
  const Base = props.to ? `a` : `button`

  return (
    <Base href={props.to} className={classes.join(' ')} onClick={props.onClick}>
      {Icon && <Icon className={props.iconClassName} />}
      {props.children}
    </Base>
  )
}

type PrimaryButtonProps = BaseButtonProps

export const PrimaryButton: FunctionComponent<PrimaryButtonProps> = (props) => {
  const { className, ...otherProps } = props

  const classes = [styles.primary]
  className && classes.push(className)

  return (
    <BaseButton
      className={classes.join(' ')}
      iconClassName={styles.icon.primary}
      {...otherProps}
    >
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
    <BaseButton
      className={classes.join(' ')}
      iconClassName={styles.icon.secondary}
      {...otherProps}
    >
      {props.children}
    </BaseButton>
  )
}
