import React from 'react';
import { Flex } from 'antd-mobile'
import { currentCity } from '../../utils/api'
import './find.scss'
import Filter from './components/Filter'

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  render() {
    return (
      <div>
        <Flex className='header'>
          {/* <i className="iconfont icon-back" /> */}
          <span onClick={() => {this.props.history.push('index/')}}>click</span>
          <Flex className='search-box searchHeader'>
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" >
                <span className="name">{this.state.city}</span>
                {/* <i className="iconfont icon-arrow" /> */}
              </div>

              {/* 搜索表单 */}
              <div className="form" >
                <i className="iconfont icon-seach" />
                <input className="text" placeholder='请输入小区或地址'></input>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            {/* <i className="iconfont icon-map" /> */}
          </Flex>
        </Flex>
        {/* 条件筛选找房 */}
        <Filter></Filter>
      </div>
    )
  }
  componentDidMount() {
    currentCity().then(res => (
      this.setState({
        city: res.label
      })
    ))
  }
}

export default Find