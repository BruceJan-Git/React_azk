import React from 'react'

import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'

import styles from './index.module.css'

function FilterFooter({ className, style, onSave, onCancel, btnName }) {
  let defaultName = '取消'
  if (btnName) {
    defaultName = btnName
  }
  return (
    <Flex style={style} className={[styles.root, className || ''].join(' ')}>
      {/* 取消按钮 */}
      <span onClick={onCancel} className={[styles.btn, styles.cancel].join(' ')}>{defaultName}</span>

      {/* 确定按钮 */}
      <span onClick={onSave} className={[styles.btn, styles.ok].join(' ')}>确定</span>
    </Flex>
  )
}

// props校验
FilterFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

export default FilterFooter
