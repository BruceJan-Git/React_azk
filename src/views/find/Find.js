import React from 'react';
import { Flex } from 'antd-mobile'
import { currentCity } from '../../utils/api'
import './find.scss'
import Filter from './components/Filter'
import axios from 'axios'
class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      listData: '',
      total: 0
    }
  }

  render() {
    let styles = {
      search: {
        fontSize: '24px',
        verticalAlign: 'middle'
      }
    }
    return (
      <div>
        <Flex className='header'>
          <i className="iconfont icon-zuojiantou" style={{ fontSize: '24px' }} onClick={() => { this.props.history.push('index/') }} />
          <Flex className='search-box searchHeader'>
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" >
                <span className="name">{this.state.city.label}</span>
                {/* <i className="iconfont icon-arrow" /> */}
              </div>

              {/* 搜索表单 */}
              <div className="form" >
                <i className="iconfont icon-tubiao-" style={styles.search} />
                <input className="text" placeholder='请输入小区或地址'></input>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-ditu" style={{ fontSize: '30px' }} />
          </Flex>
        </Flex>
        {/* 条件筛选找房 */}
        <Filter loadListData={this.loadListData}></Filter>
      </div>
    )
  }
  componentDidMount() {
    currentCity().then(res => (
      this.setState({
        city: res
      })
    ))
  }
  loadListData = async (params) => {
    params.cityId = this.state.city.value
    let res = await axios('houses', {
      params: params,
    })
    console.log(params)
    this.setState({
      listData: res.body.list,
      total: res.body.count
    })
  }

}

export default Find