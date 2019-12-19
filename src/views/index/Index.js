/**
 * 主页界面
 */
import React from 'react';
import { Carousel, Flex, WhiteSpace } from 'antd-mobile';
import axios from 'axios'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

import './idnex.css'
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSw: [],
      imgHeight: 212
    }
  }

  render() {
    return (
      <div>
        {/* 轮播图 */}
        <Carousel
          autoplay={false}
          infinite>
          {this.renderSwiper()}
        </Carousel>
        <WhiteSpace size='sm' />
        {/* 菜单 */}
        <Flex>
          <Flex.Item>
            <img src={nav1} alt="" />
            <p>整租</p>
          </Flex.Item>
          <Flex.Item>
            <img src={nav2} alt="" />
            <p>合租</p>
          </Flex.Item>
          <Flex.Item>
            <img src={nav3} alt="" />
            <p>地图找房</p>
          </Flex.Item>
          <Flex.Item>
            <img src={nav4} alt="" />
            <p>去出租</p>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
  // 动态渲染轮播图
  renderSwiper = () => {
    return this.state.imgSw.map(item => {
      return (
        <a
          key={item.id}
          href="http://baidu.com"
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
          <img
            src={`${axios.defaults.baseURL}${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // 触发窗口resize事件来改变高度
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </a>
      )
    })
  }
  // 组件挂载
  componentDidMount() {
    this.loadSwiper()
  }
  // 加载轮播图
  loadSwiper = async () => {
    let res = await axios.get('/home/swiper')
    this.setState({
      imgSw: res.body
    })
  }
}

export default Index