import React from 'react';
import { Flex } from 'antd-mobile'
import { currentCity } from '../../utils/api'
import './find.scss'
import Filter from './components/Filter'
import axios from 'axios'
import 'react-virtualized/styles.css'
import { List, AutoSizer } from 'react-virtualized'
import HouseItem from '../../components/HouseItem/index'

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      listData: [],
      total: 0,
      conditions: {}
    }
  }

  render() {
    let { listData } = this.state
    let styles = {
      search: {
        fontSize: '24px',
        verticalAlign: 'middle'
      }
    }
    return (
      <React.Fragment>
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
        <Filter onFilter={this.onFilter}></Filter>
        {/* 列表数据 */}
        <div className='list-contant'>
          {listData.length > 0 && <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowHeight={120}
                rowCount={10}
                rowRenderer={this.renderHouseItems} />
            )}
          </AutoSizer>}
        </div>
      </React.Fragment>
    )
  }
  async componentDidMount() {
    let res = await currentCity()
    this.setState({
      city: res
    }, () => {
      this.loadListData()
    })
  }
  loadListData = async () => {
    let { conditions } = this.state
    conditions.cityId = this.state.city.value
    // 分页条件查询参数
    conditions.start = 1
    conditions.end = 10
    let res = await axios('houses', {
      params: conditions,
    })
    this.setState({
      listData: res.body.list,
      total: res.body.count
    })
  }
  onFilter = (conditions) => {
    this.setState({
      conditions: conditions
    }, () => {
      this.loadListData()
    })
  }
  renderHouseItems = ({ key, index, style }) => {
    let { listData } = this.state
    let itemData = listData[index]
    return (
      <HouseItem key={key} style={style} {...itemData} />
    )
  }

}

export default Find