import React from 'react'

interface ColumnsProps {
  columns?: string | number
  gap?: string | number
  verticalAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  className?: string
}

const Columns: React.FunctionComponent<ColumnsProps> = (props) => {
  const styles = ['grid']

  props.className && styles.push(props.className)
  props.columns && styles.push(`grid-cols-${props.columns}`)
  props.gap && styles.push(`gap-${props.gap}`)
  props.verticalAlign && styles.push(`items-${props.verticalAlign}`)

  return <div className={styles.join(' ')}>{props.children}</div>
}

export default Columns
