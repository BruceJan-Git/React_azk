import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  render() {
    let { data, cols, onSave, type, onCancel } = this.props
    // console.log(data)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          value={this.state.value}
          onChange={this.onChange}
          cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} onSave={() => { onSave(this.state.value, type) }} />
      </>
    )
  }
  onChange = (value) => {
    this.setState({
      value: value
    })
  }
}
