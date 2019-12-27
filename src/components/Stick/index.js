import React from 'react';
import styles from './index.module.scss'

/**
 * 吸顶组件封装
 * 1. 创建两个引用对象
 * 2. 监听页面滚动
 * 3. 在滚动事件中,通过getBoundingClientRect()方法获取顶部top值
 * 4. 滚动到顶部则添加类样式,离开顶部,则移除吸顶样式,同时占位元素高度重置为0
 */
class Stick extends React.Component {
  constructor() {
    super()
    this.placeholder = React.createRef()
    this.content = React.createRef()
  }
  render() {
    return (
      <div>
        <div ref={this.placeholder}></div>
        <div ref={this.content}>{this.props.children}</div>
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handlerScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlerScroll)
  }
  handlerScroll = () => {
    let holder = this.placeholder.current
    let content = this.content.current
    let { top } = holder.getBoundingClientRect()
    if (top <= 0) {
      content.classList.add(styles.tofixed)
      holder.style.height = this.props.height + 'px'
    } else {
      content.classList.remove(styles.tofixed)
      holder.style.height = '0px'
    }
  }

}

export default Stick