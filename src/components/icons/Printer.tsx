import React from 'react'
import { Icon } from './types'

const PrinterIcon: Icon = (props) => (
  <svg
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden={true}
  >
    <path
      fillRule="evenodd"
      d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
      clipRule="evenodd"
    />
  </svg>
)

export default PrinterIcon
