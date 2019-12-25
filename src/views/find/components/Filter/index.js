import React, { Component } from 'react'
import axios from 'axios'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

// css模块化导入方式 不再是import ''
import styles from './index.module.css'
import { currentCity } from '../../../../utils/api'

export default class Filter extends Component {
  constructor(props) {
    super(props);
    /**
     * menuState=>title菜单每一项选中与否的状态
     * menuValue=>title菜单每一项的默认值
     * openType=>当前点击title的值
     * filterData=>筛选条件的数据
     */
    this.state = {
      menuState: {
        area: false,
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
      // case 'more':
      //   data = more
      //   break;
      default:
        break;
    }
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(openType === 'mode' || openType === 'area' || openType === 'price') &&
          <div
            onClick={() => { this.handlerCancle(openType) }}
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
          {openType === 'more' && <FilterMore onCancel={this.handlerCancle} />}
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.loadFilterData()
  }
  // 控制title以及弹窗是否有选值
  changeSelect = (type) => {
    /**
     * type是FilterTitle中传过来的类型
     * 1. 控制菜单选中与否控制逻辑
     * 2. 检测filterPicker中选项的选中与否
     * 3. 当切换filterPiecker时只选中一个或者选中已经选中的title
     */
    let { menuState, menuValue } = { ...this.state }
    let newMenuState = { ...this.state.menuState }
    Object.keys(menuState).forEach(item => {
      /**
       * 获取对象的值
       * menuValue定义的是一个对象,取值进行判断
       * 根据menuValue的键名和menuState对象的键名一致
       * 取处键名对应的键值(数组)的第一项,和默认值进行比较判断
       */
      let v = menuValue[item]
      if (item === type) {
        newMenuState[item] = true
      } else {
        this.handlerSelectCom(item, v, newMenuState)
      }
    })
    this.setState({
      menuState: newMenuState,
      openType: type
    })
  }
  // 控制遮罩层关闭
  handlerCancle = (type) => {
    let { menuState, menuValue } = this.state
    let newMenuState = { ...menuState }
    let v = menuValue[type]
    this.handlerSelectCom(type, v, newMenuState)
    this.setState({
      openType: '',
      menuState: newMenuState
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
  onSave = (v, type) => {
    let { menuState, menuValue } = this.state
    let newMenuValue = { ...menuValue }
    let newMenuState = { ...menuState }
    this.handlerSelectCom(type, v, newMenuState)
    newMenuValue[type] = v
    this.setState({
      menuValue: newMenuValue,
      openType: '',
      menuState: newMenuState
    })
  }
  // 通用筛选条件方法封装
  handlerSelectCom = (type, v, newMenuState) => {
    if (type === 'area' && (v.length === 3 || v[0] !== 'area')) {
      newMenuState[type] = true
    } else if (type === 'mode' && v[0] !== 'null') {
      newMenuState[type] = true
    } else if (type === 'price' && v[0] !== 'null') {
      newMenuState[type] = true
    } else if (type === 'more' && v.length !== 0) {
      newMenuState[type] = true
    } else {
      newMenuState[type] = false
    }
  }

}
