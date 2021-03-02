import React from 'react'

interface DividerProps {
  className?: string
}

const Divider: React.FunctionComponent<DividerProps> = (props) => {
  const styles = ['text-zesty-500 mx-auto']
  props.className && styles.push(props.className)

  return (
    <svg
      width={108}
      height={17}
      viewBox="0 0 108 17"
      fill="none"
      className={styles.join(' ')}
      aria-hidden="true"
    >
      <path
        d="M106 15L93 2 80 15 67 2 54 15 41 2 28 15 15 2 2 15"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="square"
      />
    </svg>
  )
}

export default Divider
