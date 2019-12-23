import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

// css模块化导入方式 不再是import ''
import styles from './index.module.css'

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: {
        area: true,
        mode: false,
        price: false,
        more: false
      },
      openType: ''
    }
  }

  render() {
    let { openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(openType === 'mode' || openType === 'area' || openType === 'price') &&
          <div
            onClick={this.handlerCancle}
            className={styles.mask} />}
        <div className={styles.content}>
          
          {/* 标题栏 */}
          <FilterTitle
            changeSelect={this.changeSelect}
            menuState={this.state.menuState} />
          {/* 前三个菜单对应的内容： */}
          {(openType === 'mode' || openType === 'area' || openType === 'price') && <FilterPicker />}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
  // 控制title选中与否
  changeSelect = (props) => {
    let menuState = { ...this.state.menuState }
    menuState[props] = !menuState[props]
    this.setState({
      menuState: menuState,
      openType: props
    })
  }
  // 控制遮罩层关闭
  handlerCancle = () => {
    this.setState({
      openType: ''
    })
  }

}
