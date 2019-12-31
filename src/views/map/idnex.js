import React from 'react';
import styles from './index.module.scss';
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios';
import { currentCity } from '../../utils/api'
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houseList: [],
      loaded: false
    }
  }

  render() {
    return (
      <div className={styles.map}>
        {/* 顶部导航栏 */}
        <NavBar
          mode='light'
          onLeftClick={() => { this.props.history.go(-1) }}
          icon={<Icon type="left" />}>地图找房</NavBar>
        {/* 地图显示区 */}
        <div id='myMap' className={styles.map_content}></div>
        {/* 小区房源列表展示 */}
        <div className={[styles.houseList, this.state.loaded ? styles.show : ''].join(' ')}>
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <a className={styles.titleMore} href="/house/list">更多房源</a>
          </div>
          <div className={styles.houseItems}></div>
        </div>
      </div>
    )
  }
  async componentDidMount() {
    let mapData = await this.loadMapData()
    this.initMap(mapData)
  }
  // 获取地图数据
  initMap = (mapData) => {
    var map = new window.BMap.Map("myMap");
    map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11)
    map.setCurrentCity("北京");
    this.drawFirstOverLay(mapData, map)
    // var myCity = new window.BMap.LocalCity();
    // myCity.get((res) => {
    //   console.log(res) // 定位失败,定位不到北京 若成功,则会获取当城市为北京
    //   let { lng, lat } = res.center
    //   let point = new window.BMap.Point(lng, lat)
    //   map.setCurrentCity("北京")
    //   map.centerAndZoom(point, 11);
    //   mapData.forEach(item => {
    //     let dot = this.drawSingleDot(item)
    //     map.addOverlay(dot)
    //   })
    // })
  }
  // 获取地图覆盖物数据
  loadMapData = async () => {
    let city = await currentCity()
    let res = await axios.get('area/map', {
      params: {
        id: city.value
      }
    })
    return res.body
  }
  // 获取单个覆盖物
  drawSingleDot = (dotInfo, map, type) => {
    let { longitude, latitude } = dotInfo.coord
    // let point = new window.BMap.Point(latitude, longitude) // 经纬度不可以写反,否则覆盖物找不到
    let point = new window.BMap.Point(longitude, latitude)
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new window.BMap.Size(30, -30)    //设置文本偏移量
    }
    let content = `
      <div class=${styles.point}>
        <div>${dotInfo.label}</div>
        <p>${dotInfo.count}套</p>
      </div> `
    var label = new window.BMap.Label(content, opts);  // 创建文本标注对象
    label.addEventListener('click', () => {
      let id = dotInfo.value
      if (type === 'first') {
        this.drawSecondtOverLay(id, map, point)
      } else if (type === 'second') {
        this.drawThirdOverLay(id, map, point)
      } else if (type === 'third') {
        this.getAreaHouseInfo(id)
      }
    })
    label.setStyle({
      height: "0px",
      width: '0px',
      border: '0'
    });
    return label
  }
  // 绘制一级覆盖物
  drawFirstOverLay = (mapData, map) => {
    mapData.forEach(item => {
      let dot = this.drawSingleDot(item, map, 'first')
      map.addOverlay(dot)
    })
  }
  // 绘制二级覆盖物
  drawSecondtOverLay = async (id, map, point) => {
    let res = await axios.get('area/map', {
      params: {
        id
      }
    })
    map.clearOverlays()
    res.body.forEach(item => {
      let dot = this.drawSingleDot(item, map, 'second')
      map.addOverlay(dot)
    })
    setTimeout(() => {
      map.centerAndZoom(point, 13)
    }, 0)
  }
  // 绘制三级覆盖物
  drawThirdOverLay = async (id, map, point) => {
    let res = await axios.get('area/map', {
      params: {
        id
      }
    })
    map.clearOverlays()
    res.body.forEach(item => {
      let dot = this.drawSingleDot(item, map, 'third')
      map.addOverlay(dot)
    })
    setTimeout(() => {
      map.centerAndZoom(point, 13)
    }, 0);
  }
  // 获取小区房源信息
  getAreaHouseInfo = async (id) => {
    let res = await axios.get('houses', {
      params: {
        cityId: id
      }
    })
    this.setState({
      houseList: res.body.list,
      loaded: true
    })
  }
}

export default Map