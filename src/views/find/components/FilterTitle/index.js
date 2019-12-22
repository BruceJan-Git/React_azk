import React from 'react'

import { Flex, Icon } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle() {
  let Tags = titleList.map(item => (
    <Flex.Item key={item.type}>
      {/* <span className={[styles.dropdown, styles.selected].join(' ')}> */}
      <span>
        <span>{item.title}</span>
        <i className="iconfont icon-arrow" />
        <Icon type='down' style={{
          width: '16px',
          height: '16px',
          verticalAlign: 'bottom'
        }}></Icon>
      </span>
    </Flex.Item>
  ))
  return (
    <Flex align="center" className={styles.root}>
      {Tags}
    </Flex>
  )
}
