import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultData
    }
  }
  render() {
    let { data, cols, onSave, type, onCancel } = this.props
    // console.log(data)
    return (
      <div className={styles.picker}>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          value={this.state.value}
          onChange={this.onChange}
          cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={() => { onCancel(type) }} onSave={() => { onSave(this.state.value, type) }} />
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState) {
    /**
     * 1.  可以直接调用setState(),但是必须加上判断条件,否则导致死循环
     * 2. 组件更新有两个状态,prevProps和prevState是变化之前的状态值
     */
    if (prevProps.defaultData !== this.props.defaultData) {
      this.setState({
        value: this.props.defaultData
      })
    }

  }
  onChange = (value) => {
    this.setState({
      value: value
    })
  }
}
