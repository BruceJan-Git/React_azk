import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter/index'

import styles from './index.module.css'

export default class FilterMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: this.props.defaultData || []
    }
  }

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return data.map(item => (
      <span
        key={item.value}
        onClick={this.handlerCheckes.bind(this, item.value)}
        className={[styles.tag, this.state.selectValue.includes(item.value) ? styles.tagActive : ''].join(' ')}>
        {item.label}
      </span>
    ))
  }

  render() {
    let { roomType, oriented, floor, characteristic } = this.props.data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          btnName='清除'
          onSave={() => {
            this.props.onSave(this.state.selectValue, 'more')
          }}
          onCancel={() => {
            this.setState({
              selectValue: []
            }, () => {
              this.props.onSave(this.state.selectValue, 'more')
              this.props.onCancel('more')
            })
          }} />
      </div>
    )
  }

  handlerCheckes = (value) => {
    let { selectValue } = this.state
    let newValue = [...selectValue]
    if (newValue.includes(value)) {
      // 存在值,则不添加
      let index = newValue.findIndex(item => {
        return item === value
      })
      newValue.splice(index, 1)
    } else {
      // 不存在值,则添加
      newValue.push(value)
    }
    this.setState({
      selectValue: newValue
    })
  }

}
