import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle(props) {
  let menuState = props.menuState
  // console.log(menuState)
  let selectClass = [styles.dropdown, styles.selected].join(' ')
  let Tags = titleList.map(item => {
    let state = menuState[item.type]
    return (
      <Flex.Item key={item.type}>
        {/* <span className={}> */}
        <span
          // 接受父组件传递过来的函数,调用并传参
          onClick={() => {
            props.changeSelect(item.type)
          }}
          className={state ? selectClass : ''}>
          <span>{item.title}</span>
          <i className="iconfont icon-sanjiaodown" />
        </span>
      </Flex.Item>
    )
  })
  return (
    <Flex align="center" className={styles.root}>
      {Tags}
    </Flex>
  )
}
