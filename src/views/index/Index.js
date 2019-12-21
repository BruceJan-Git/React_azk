/**
 * 主页界面
 */
import React from 'react';
import { Carousel, Flex, WhiteSpace, Grid, WingBlank, NavBar, Icon } from 'antd-mobile';
import axios from 'axios'

import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

import './idnex.scss'
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSw: [],
      groups: [],
      news: [],
      imgHeight: 212,
      currentCity: '北京'
    }
  }

  render() {
    return (
      <div>
        {/* 顶部nav */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          leftContent={this.state.currentCity}
          onLeftClick={() => {
            this.props.history.push('/city')
          }}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          ]}>
          首页
        </NavBar>
        {/* 轮播图 */}
        <Carousel
          autoplay={false}
          infinite>
          {this.renderSwiper()}
        </Carousel>
        <WhiteSpace size='sm' />
        {/* 菜单 */}
        <Flex className='menu'>
          {this.renderMenu()}
        </Flex>
        {/* 租房小组 */}
        <div className='group'>
          <Flex justify='between' className='group-title'>
            <h3>租房小组</h3>
            <span>更多...</span>
          </Flex>
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={this.renderGridItem} />
        </div>
        {/* 最新咨询 */}
        <div className='news'>
          <h3 className='group-title'>最新资讯</h3>
          <WingBlank>{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
  // 组件挂载
  componentDidMount() {
    this.loadSwiper()
    this.loadGroup()
    this.loadNews()
    let city = localStorage.getItem('currentCity')
    city = JSON.parse(city)
    // console.log(city.label)
    this.setState({
      currentCity: city.label
    })
  }
  // 加载轮播图
  loadSwiper = async () => {
    let res = await axios.get('/home/swiper')
    this.setState({
      imgSw: res.body
    })
  }
  // 加载租房小组数据
  loadGroup = async () => {
    let res = await axios.get('/home/groups')
    this.setState({
      groups: res.body
    })
  }
  // 加载最新资讯
  loadNews = async () => {
    let res = await axios.get('/home/news')
    this.setState({
      news: res.body
    })
  }
  // 渲染轮播图
  renderSwiper = () => {
    return this.state.imgSw.map(item => {
      return (
        <a
          key={item.id}
          href="http://baidu.com"
          style={{ height: this.state.imgHeight }}>
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
  // 渲染菜单栏
  renderMenu = () => {
    let mentData = [{
      id: 1,
      mname: '整租',
      imgSrc: nav1
    }, {
      id: 2,
      mname: '合租',
      imgSrc: nav2
    }, {
      id: 3,
      mname: '地图找房',
      imgSrc: nav3
    }, {
      id: 4,
      mname: '去出租',
      imgSrc: nav4
    }]
    return mentData.map(item => {
      return (
        <Flex.Item key={item.id}>
          <img src={item.imgSrc} alt="" />
          <p>{item.mname}</p>
        </Flex.Item>
      )
    })
  }
  // 渲染租房小组
  renderGridItem = (item) => {
    return (
      <Flex justify='between' className='gird-item'>
        <div className='desc'>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
        <img src={`${axios.defaults.baseURL}${item.imgSrc}`} alt="" />
      </Flex>
    )
  }
  // 渲染最新资讯模板
  renderNews = () => {
    return this.state.news.map(item => {
      return (
        <div className="news-item" key={item.id}>
          <div className="imgwrap">
            <img
              className="img"
              src={`${axios.defaults.baseURL}${item.imgSrc}`}
              alt=""
            />
          </div>
          <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="info" justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      )
    })
  }
}

export default Index