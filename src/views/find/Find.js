import React from 'react';
import { Flex } from 'antd-mobile'
import './find.scss'

class Find extends React.Component {
  render() {
    return (
      <div>
        <Flex className='header'>
          <i className="iconfont icon-back" />
          <Flex className='search-box searchHeader'>
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" >
                <span className="name">北京</span>
                <i className="iconfont icon-arrow" />
              </div>

              {/* 搜索表单 */}
              <div className="form" >
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-map" />
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default Find