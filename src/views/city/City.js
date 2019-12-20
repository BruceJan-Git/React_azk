import React from 'react';
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios';

class City extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityList: []
    }
  }
  render() {
    return (
      <div>
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
        <div>
          {this.renderCityList()}
        </div>
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
}

export default City