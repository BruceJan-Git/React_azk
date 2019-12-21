import React from 'react';
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios';
import 'react-virtualized/styles.css'
import { List, AutoSizer } from 'react-virtualized'
import './city.scss'

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: null
    }
  }
  render() {
    return (
      <div className='cityList'>
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
        <AutoSizer>
          {({ height, width }) => {
            if (this.state.cityList) {
              return (
                <List
                  width={width}
                  height={height}
                  // 对象的长度=key.length
                  rowCount={this.state.cityList.cityIndex.length}
                  rowHeight={this.calcRowHeight}
                  rowRenderer={this.rowRenderer} />
              )
            }
          }}
        </AutoSizer>
      </div>
    )
  }
  componentDidMount() {
    this.loadCityList()
  }
  // 获取城市列表数据
  loadCityList = async () => {
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
    let currentCity = await axios.get('area/info', {
      params: {
        name: '北京'
      }
    })
    C_list.cityIndex.unshift('#')
    C_list.objCityList['#'] = [currentCity.body]
    this.setState({
      cityList: C_list
    })
  }
  // 定义排序城市列表数据的处理函数
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
  // 渲染城市列表
  renderCityList = () => {
    let obj = this.state.cityList.objCityList
    let indexs = this.state.cityList.cityIndex
    let arr = []
    if (obj) {
      indexs.forEach(letter => {
        arr.push(<li key={letter}>{letter}</li>)
        let citys = obj[letter]
        citys.forEach(city => {
          if (letter === 'hot') {
            arr.push(<li key={city.short}>{city.label}</li>)
          } else if (letter === '#') {
            arr.push(<li key={city.value + '#'}>{city.label}</li>)
          } else {
            arr.push(<li key={city.value}>{city.label}</li>)
          }
        })
      })
    }
    return (
      <ul>{arr}</ul>
    )
  }
  // 渲染列表
  rowRenderer = ({
    key,
    style,
    index
  }) => {
    let { objCityList, cityIndex} = this.state.cityList
    let letter = cityIndex[index]
    let Clist = objCityList[letter]
    return (
      <div key={key} style={style} className='city'>
        <div className="title">{letter}</div>
        {Clist && Clist.map(item => (
          <div className="name" key={item.value}>{item.label}</div>
        ))}
      </div>
    );
  }
  calcRowHeight = ({ index }) => {
    let { objCityList, cityIndex } = this.state.cityList
    let letter = cityIndex[index]
    let Clist = objCityList[letter]
    let h = 36 + 50 * Clist.length
    return h
  }

}

export default City