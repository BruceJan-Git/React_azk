import React from 'react';
import styles from './index.module.scss';
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios';
import { currentCity } from '../../utils/api'
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: []
    }
  }

  render() {
    return (
      <div className={styles.mapContainer}>
        <NavBar
          mode='light'
          onLeftClick={() => { this.props.history.go(-1) }}
          icon={<Icon type="left" />}>地图找房</NavBar>
        <div id='myMap' className={styles.map}>

        </div>
      </div>
    )
  }
  async componentDidMount() {
    let mapData = await this.loadMapData()
    this.initMap(mapData)
  }
  /**
   * 获取地图数据
   */
  initMap = (mapData) => {
    var map = new window.BMap.Map("myMap");
    map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11)
    map.setCurrentCity("北京");
    mapData.forEach(item => {
      let dot = this.drawSingleDot(item, map)
      map.addOverlay(dot)
    })

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

  /**
   * 获取地图覆盖物数据
   */
  loadMapData = async () => {
    let city = await currentCity()
    let res = await axios.get('area/map', {
      params: {
        id: city.value
      }
    })
    console.log(res.body)
    return res.body
  }

  /**
   * 获取单个覆盖物
   */
  drawSingleDot = (dotInfo, map) => {
    let { longitude, latitude } = dotInfo.coord
    // let point = new window.BMap.Point(latitude, longitude) // 经纬度不可以写反,否则覆盖物找不到
    let point = new window.BMap.Point(longitude, latitude)
    var opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new window.BMap.Size(30, -30)    //设置文本偏移量
    }
    let content = `
      <div class=${styles.labelContent}>
        <div>${dotInfo.label}</div>
        <p>${dotInfo.count}套</p>
      </div>
    `
    var label = new window.BMap.Label(content, opts);  // 创建文本标注对象
    label.addEventListener('click', () => {
      let id = dotInfo.value
      axios.get('area/map', {
        params: {
          id
        }
      })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            map.centerAndZoom(point, 13)
          }, 0);
          map.clearOverlays()
          res.body.forEach(item => {
            let dot = this.drawSingleDot(item, map)
            map.addOverlay(dot)
          })
        })
    })
    label.setStyle({
      height: "0px",
      width: '0px',
      border: '0'
    });
    return label
  }
}

export default Map