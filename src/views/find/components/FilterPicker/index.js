import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  render() {
    let { data, cols, onSave } = this.props
    // console.log(data)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView
          data={data}
          value={null}
          onChange={this.onChange}
          cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter onSave={onSave} />
      </>
    )
  }
  onChange = (value) => {
    console.log(value)
  }
}
