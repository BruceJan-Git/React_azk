import React from 'react';
import styles from './index.module.scss';
import { NavBar, Icon } from 'antd-mobile'
class Map extends React.Component {
  render() {
    return (
      <div className={styles.map}>
        <NavBar
          mode='light'
          onLeftClick={() => { this.props.history.go(-1) }}
          icon={<Icon type="left" />}>地图找房</NavBar>
        <div id='myMap' className={styles.map_content}>

        </div>
      </div>
    )
  }
  componentDidMount() {
    this.initMap()
  }
  initMap = () => {
    var map = new window.BMap.Map("myMap");
    var myCity = new window.BMap.LocalCity();
    myCity.get((res) => {
      let { lng, lat } = res.center
      let point = new window.BMap.Point(lng, lat)
      map.centerAndZoom(point, 11);
      var opts = {
        position: point,    // 指定文本标注所在的地理位置
        offset: new window.BMap.Size(30, -30)    //设置文本偏移量
      }
      let content = `
        <div class=${styles.point}>
          <div>海淀区</div>
          <p>100套</p>
        </div>
      `
      var label = new window.BMap.Label(content, opts);  // 创建文本标注对象
      label.setStyle({
        border:'0px'
      });
      map.addOverlay(label);
    })
  }
}

export default Map