/*
* @Author: CJ Ting
* @Date: 2017-02-04 11:30:13
* @Email: fatelovely1128@gmail.com
*/

import "./style"
import React, { PropTypes } from "react"

const Radio = props => {
  const id = `_radio-${props.text}`
  return (
    <div className="_radio u-flex-row">
      <input
        id={ id }
        onClick={ props.onClick }
        type="radio"
        checked={ props.checked }
        onChange={ props.onChange }
        disabled={ props.disabled }
      />
      <label htmlFor={ id } >
        <div className="_radio__indicator">
          <div className="_radio__indicator__content" />
        </div>
        { props.text }
      </label>
    </div>
  )
}

Radio.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
}
Radio.defaultProps = {
  checked: true,
  disabled: false,
}

export default Radio
