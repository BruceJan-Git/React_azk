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
    map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);
    map.setCurrentCity("北京")
  }
}

export default Map