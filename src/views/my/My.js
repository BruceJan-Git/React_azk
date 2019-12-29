import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from 'antd-mobile'
import { API_BASE as BASE_URL } from '../../utils/api'
import { token } from '../../utils/api'
import axios from 'axios'
import styles from './index.module.css'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null
    }
  }

  render() {
    const { history } = this.props
    let { info } = this.state
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={info && info.avatar ? BASE_URL + info.avatar : DEFAULT_AVATAR} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{info ? info.nickname : '游客'}</div>
              {info ? (
                <React.Fragment>
                  <div className={styles.auth}>
                    <span onClick={this.handlerLoginOut}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                  <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </React.Fragment>
              ) : (
                  <div className={styles.edit}>
                    <Button
                      type="primary"
                      size="small"
                      inline
                      onClick={() => history.push('/login')}>
                      去登录
                    </Button>
                  </div>
                )
              }

              {/* 未登录展示： */}

            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = async () => {
    let res = await axios.get('user')
    if (res.status === 200) {
      this.setState({
        info: res.body
      })
    }
    console.log(res)
  }
  handlerLoginOut = async () => {
    let res = await axios.post('user/logout', null)
    if (res.status === 200) {
      token.removeToken()
      this.setState({
        info: null
      })
    }
  }

}
