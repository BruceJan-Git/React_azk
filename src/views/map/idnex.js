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
  initMap = (mapData) => {
    var map = new window.BMap.Map("myMap");
    map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11)
    map.setCurrentCity("北京");
    mapData.forEach(item => {
      let dot = this.drawSingleDot(item)
      map.addOverlay(dot)
    })
    // var myCity = new window.BMap.LocalCity();
    // console.log(myCity)
    // myCity.get((res) => {
    //   console.log(res)
    //   let { lng, lat } = res.center
    //   let point = new window.BMap.Point(lng, lat)
    //   map.setCurrentCity("北京")
    //   map.centerAndZoom(point, 11);
    //   mapData.forEach(item => {
    //     let dot = this.drawSingleDot(item)
    //     map.addOverlay(dot)
    //   })
    //   // var opts = {
    //   //   position: point,    // 指定文本标注所在的地理位置
    //   //   offset: new window.BMap.Size(30, -30)    //设置文本偏移量
    //   // }
    //   // let content = `
    //   //   <div class=${styles.point}>
    //   //     <div>海淀区</div>
    //   //     <p>100套</p>
    //   //   </div>
    //   // `
    //   // var label = new window.BMap.Label(content, opts);  // 创建文本标注对象
    //   // label.setStyle({
    //   //   border: '0px'
    //   // });
    //   // map.addOverlay(label);
    // })
  }
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
  drawSingleDot = (dotInfo) => {
    let { latitude, longitude } = dotInfo.coord
    // console.log(latitude, longitude)
    let point = new window.BMap.Point(latitude, longitude)
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
    label.setStyle({
      height: "0px",
      width: '0px',
      border: '0'
    });
    return label
  }
}

export default Map