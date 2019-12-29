import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { currentCity } from '../../../utils/api'

import styles from './index.module.css'
import axios from 'axios'

export default class Search extends Component {
  // 当前城市id
  cityId = currentCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li
        onClick={() => {
          this.props.history.replace('/rent/add', {
            id: item.community,
            name: item.communityName
          })
        }}
        key={item.community}
        className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          onClear={this.handlerClear}
          onChange={this.handlerChange}
          onSubmit={this.handlerSubmit}
          value={searchTxt}
          placeholder="请输入小区或地址"
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')} />
        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
  handlerChange = (value) => {
    this.setState({
      searchTxt: value
    })
  }
  handlerSubmit = async () => {
    let cityId = await currentCity()
    let { searchTxt } = this.state
    let res = await axios.get('area/community', {
      params: {
        name: searchTxt,
        id: cityId.value
      }
    })
    this.setState({
      tipsList: res.body
    })
  }
  handlerClear = () => {
    this.setState({
      tipsList: []
    })
  }

}
