import React, { PropTypes } from 'react'
import EmailPropTypes from '../PropTypes'
import Box from './Box'
import Item from './Item'

function singleLineString(strings, ...values) {
  // Interweave the strings with the
  // substitution vars first.
  // let output = ''
  // const valuesLength = values.length
  // for (let i = 0; i < valuesLength; i++) {
  //   output += strings[i] + values[i]
  // }
  // output += strings[values.length]
  const output = values.reduce((out, value, i) => {
    return out += strings[i] + values[i]
  }, '') + strings[values.length]

  // Split on newlines.
  const lines = output.split(/(?:\r\n|\n|\r)/)

  // Rip out the leading whitespace.
  return lines.map((line) => {
    return line.replace(/^\s+/gm, '')
  }).join(' ').trim()
}

// inspired by http://htmlemailboilerplate.com
export default function Email(props) {
  // default nested 600px wide outer table container (see http://templates.mailchimp.com/development/html/)
  return (
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{props.title}</title>
        <style dangerouslySetInnerHTML={{__html: singleLineString`
          #content {
            max-width: ${props.width}px !important;
          }

          table td {
            border-collapse: collapse;
          }

          @media (max-width: ${props.width}px) {
            #content {
              width: 100% !important;
            }
          }
          ${props.css}
        `}} />
      </head>
      <body style={{
        padding: '0',
        margin: '0',
        WebkitTextSizeAdjust: '100%',
        MsTextSizeAdjust: '100%',
        backgroundColor: props.bgcolor,
      }}>
        <Box
          bgcolor={props.bgcolor}
          align="center"
          valign="top"
          style={{
            width: '100% !important',
            lineHeight: '100% !important',
          }}>
          <Item align="center" valign="top">
            <Box
              align="center"
              cellPadding={props.cellPadding}
              cellSpacing={props.cellSpacing}
              width={props.width}
              id="content"
              style={{
                ...props.style
              }}
            >
              {props.children}
            </Box>
          </Item>
        </Box>
      </body>
    </html>
  )
}

Email.propTypes = {
  title: PropTypes.string.isRequired,
  bgcolor: PropTypes.string,
  cellPadding: PropTypes.number,
  cellSpacing: PropTypes.number,
  style: EmailPropTypes.style,
  children: PropTypes.node,
  width: PropTypes.number,
  css: PropTypes.string
}

Email.defaultProps = {
  style: {},
  width: 600,
  css: ''
}
