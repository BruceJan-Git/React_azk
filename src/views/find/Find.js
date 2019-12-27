import React from 'react';
import { Flex, Toast } from 'antd-mobile'
import { currentCity } from '../../utils/api'
import './find.scss'
import Filter from './components/Filter'
import axios from 'axios'
import 'react-virtualized/styles.css'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import HouseItem from '../../components/HouseItem/index'
import NoHouse from '../../components/NoHouse/index'
import Stick from '../../components/Stick/index'

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      listData: [],
      total: 0,
      conditions: {},
      isFinish: false
    }
  }

  render() {
    let { listData, total, isFinish } = this.state
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
        <Stick>
          <Filter onFilter={this.onFilter}></Filter>
        </Stick>
        {/* 列表数据 */}
        <div className='list-contant'>
          {listData.length > 0 &&
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={total}
            >
              {({ onRowsRendered, registerChild }) => {
                return (
                  <WindowScroller>
                    {({ height, isScrolling, scrollTop }) => {
                      return (
                        <AutoSizer>
                          {({ width }) => (
                            <List
                              autoHeight
                              scrollTop={scrollTop}
                              isScrolling={isScrolling}
                              onRowsRendered={onRowsRendered}
                              ref={registerChild}
                              width={width}
                              height={height}
                              rowHeight={120}
                              rowCount={total}
                              rowRenderer={this.renderHouseItems} />
                          )}
                        </AutoSizer>
                      )
                    }}
                  </WindowScroller>
                )
              }}
            </InfiniteLoader>
          }
        </div>
        {isFinish === false && total === 0 && <NoHouse>暂无房源</NoHouse>}
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
  /**
   * @cityId string require
   * @startIndex number 开始索引
   * @stopIndex number 结束缩影
   * @conditions Object 房源查询筛选条件数据
   */
  loadListData = async (startIndex, stopIndex) => {
    Toast.info('loading...')
    this.setState({
      isFinish: true
    })
    let { conditions } = this.state
    conditions.cityId = this.state.city.value
    // 分页条件查询参数
    conditions.start = startIndex || 1
    conditions.end = stopIndex || 10
    let res = await axios('houses', {
      params: conditions,
    })
    if (conditions.start === 1) {
      this.setState({
        listData: res.body.list,
        total: res.body.count
      })
    }
    Toast.hide()
    this.setState({
      isFinish: false
    })
    return res.body
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
    if (!itemData) {
      return (
        <div style={style} key={key}>
          <p className='loading'></p>
        </div>
      )
    } else {
      return (
        <HouseItem key={key} style={style} {...itemData} />
      )
    }
  }
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      let res = await this.loadListData(startIndex, stopIndex)
      this.setState({
        total: res.count,
        listData: [...this.state.listData, ...res.list]
      }, () => { resolve() })
      // let res = await axios.get('houses', {
      //   params: {
      //     ...this.state.conditions,
      //     cityId: this.state.city.value,
      //     start: startIndex,
      //     end: stopIndex
      //   }
      // })
      // this.setState({
      //   total: res.body.count,
      //   listData: [...this.state.listData, ...res.body.list]
      // },() => {
      //   resolve()
      // })
    })
  }
  isRowLoaded = ({ index }) => {
    return !!this.state.listData[index];
  }

}

export default Find