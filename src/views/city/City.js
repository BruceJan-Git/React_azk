import React from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile'
import axios from 'axios';
import 'react-virtualized/styles.css'
import { List, AutoSizer } from 'react-virtualized'
import './city.scss'
import { currentCity } from '../../utils/api'

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: null,
      currentIndex: 0
    }
    this.listRef = React.createRef()
  }
  render() {
    return (
      <div className='cityList'>
        {/* 顶部导航栏布局 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.go(-1)
          }}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          ]}>
          北京
        </NavBar>
        {/* {this.renderCityList()} */}
        {/* 城市列表布局 */}
        <AutoSizer>
          {({ height, width }) => {
            if (this.state.cityList) {
              return (
                <List
                  width={width}
                  height={height}
                  scrollToAlignment='start'
                  ref={this.listRef}
                  onRowsRendered={this.onRowsRendered}
                  // 对象的长度=key.length
                  rowCount={this.state.cityList.cityIndex.length}
                  rowHeight={this.calcRowHeight}
                  rowRenderer={this.rowRenderer} />
              )
            }
          }}
        </AutoSizer>
        {/* 右侧索引布局 */}
        <ul className='city-index'>
          {this.renderIndex()}
        </ul>
      </div>
    )
  }
  componentDidMount() {
    this.loadCityList()
  }
  // 获取城市列表数据
  loadCityList = async () => {
    Toast.loading('加载中...', 0);
    let res = await axios.get('area/city', {
      params: {
        level: 1
      }
    })
    // console.log(res)
    let C_list = this.dataFormat(res.body)
    // 获取热门城市
    let hotCity = await axios.get('area/hot')
    C_list.cityIndex.unshift('hot')
    C_list.objCityList['hot'] = hotCity.body
    // 获取当前城市
    let city = await currentCity()
    C_list.cityIndex.unshift('#')
    C_list.objCityList['#'] = [city]
    this.setState({
      cityList: C_list
    })
    Toast.hide()
  }
  // 定义城市列表数据处理函数
  dataFormat = (data) => {
    let objCityList = {}
    let cityIndex = []
    data.forEach(item => {
      let firstLatter = item.short.substr(0, 1)
      if (objCityList[firstLatter]) {
        objCityList[firstLatter].push({
          label: item.label,
          value: item.value,
          short: item.short
        })
      } else {
        objCityList[firstLatter] = [{
          label: item.label,
          value: item.value,
          short: item.short
        }]
        cityIndex.push(firstLatter)
      }
    })
    cityIndex.sort()
    return {
      objCityList,
      cityIndex
    }
  }
  // 定义计算列表行高
  calcRowHeight = ({ index }) => {
    let { objCityList, cityIndex } = this.state.cityList
    let letter = cityIndex[index]
    let Clist = objCityList[letter]
    let h = 36 + 50 * Clist.length
    return h
  }
  /**
   * 渲染城市列表
   */
  rowRenderer = ({
    key,
    style,
    index
  }) => {
    let { objCityList, cityIndex } = this.state.cityList
    let letter = cityIndex[index]
    let Clist = objCityList[letter]
    return (
      <div key={key} style={style} className='city'>
        <div className="title">{letter}</div>
        {Clist && Clist.map(item => (
          <div
            className="name"
            onClick={() => {
              if (['北京', '广州', '上海', '深圳'].includes(item.label)) {
                window.localStorage.setItem('currentCity', JSON.stringify({
                  label: item.label,
                  value: item.value
                }))
                this.props.history.go(-1)
              } else {
                Toast.info('暂无数据', 1)
              }
            }}
            key={item.value}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }
  /**
   * 渲染右侧索引
   */
  renderIndex = () => {
    let { cityList, currentIndex } = this.state
    if (cityList) {
      let rightIndex = cityList.cityIndex
      // console.log(rightIndex)
      return rightIndex.map((item, index) => (
        <li
          key={index}
          // 点击索引滚动到对应的位置
          onClick={() => {
            let list = this.listRef.current
            list.scrollToRow (index)
          }}
          className="city-index-item">
          <span className={currentIndex === index ? 'index-active' : ''}>
            {item === 'hot' ? '热' : item.toUpperCase()}
          </span>
        </li>
      ))
    }
  }
  /**
   * 滚动渲染右侧索引
   */
  onRowsRendered = ({ startIndex }) => {
    let { currentIndex } = this.state
    if (currentIndex !== startIndex) {
      this.setState({
        currentIndex: startIndex
      })
    }
  }
}

export default City