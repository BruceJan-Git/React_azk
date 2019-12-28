import React, { Component } from 'react'
import axios from 'axios'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { withFormik } from 'formik';

import { Link } from 'react-router-dom'

import styles from './index.module.css'

class Login extends Component {
  render() {
    const {
      values,
      handleChange,
      handleSubmit,
    } = this.props
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar className={styles.navHeader} mode="dark">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button onClick={handleSubmit} className={styles.submit} type="button">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }

}


export default withFormik({
  // 受控组件绑定值
  mapPropsToValues: () => ({ username: '', password: '' }),
  handleSubmit: async (values, Login) => {
    let { username, password } = values
    let res = await axios.post('/user/login', {
      username,
      password
    })
    let { status, description } = res
    if (status === 200) {
      Login.props.history.push('/')
      window.sessionStorage.setItem('mytoken', res.body.token)
    } else {
      Toast.info(description)
    }

  },

})(Login)
