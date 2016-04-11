import React, { PropTypes } from 'react'
import EmailPropTypes from '../PropTypes'

export default function Image(props) {
  return (
    <img
      src={props.src}
      srcSet={props.srcSet}
      width={props.width}
      height={props.height}
      style={{
        display: props.inline ? 'inline': 'block',
        outline: 'none',
        border: 'none',
        textDecoration: 'none',
        maxWidth: '100vw !important',
        width: props.width ? `${props.width}px` : '100% !important',
        // height: props.height && !props.srcSet ? `${props.height}px` : 'auto !important',
        height: 'auto !important',
        ...props.style
      }}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: EmailPropTypes.style,
  inline: PropTypes.bool
}
