import React, { Component } from 'react'
import axios from 'axios'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

// css模块化导入方式 不再是import ''
import styles from './index.module.css'
import { currentCity } from '../../../../utils/api'

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
      openType: '',
      filtersData: {},
      menuValue: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
      }
    }
  }

  render() {
    let { openType, menuValue, filtersData: { area, price, subway, rentType } } = this.state
    // 弹窗组件的默认值
    let data = null
    let cols = 1
    let defaultData = menuValue[openType]
    switch (openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        break;
      case 'price':
        data = price
        break;
      default:
        break;
    }
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
          {(openType === 'mode' || openType === 'area' || openType === 'price') &&
            <FilterPicker
              // 加上key属性,当组件状态更行的时候,作为唯一标识,这样就会在组件切换状态的时候保存原始值
              // key={openType}
              defaultData={defaultData}
              type={openType}
              onCancel={this.handlerCancle}
              onSave={this.onSave}
              data={data}
              cols={cols} />}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.loadFilterData()
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
  // 获取筛选条件数据
  loadFilterData = async () => {
    let city = await currentCity()
    let res = await axios('houses/condition', {
      params: {
        id: city.value
      }
    })
    this.setState({
      filtersData: res.body
    })
    // console.log(this.state.filtersData)
  }
  // 控制点击确定按钮
  onSave = (value, type) => {
    // console.log(value, type) // 默认选中area
    // console.log(value + '====' + type)
    this.setState({
      menuValue: {
        ...this.state.menuValue,
        [type]: value,
      }
    }, () => { this.handlerCancle() })
  }

}
