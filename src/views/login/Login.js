import React, { Component } from 'react'
import axios from 'axios'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { withFormik } from 'formik';

import { Link } from 'react-router-dom'

import styles from './index.module.css'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/
class Login extends Component {
  render() {
    const {
      values,
      handleChange,
      handleSubmit,
      handleBlur,
      errors,
      touched
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
                onBlur={handleBlur}
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
              {touched.username && errors.username && <div className={styles.error}>{errors.username}</div>}
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
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
  validate: (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = '用户名不能为空'
    } else if (!REG_UNAME.test(values.username)) {
      errors.username = '字符为长度为5~8'
    }
    if (!values.password) {
      errors.password = '密码不能为空'
    } else if (!REG_PWD.test(values.password)) {
      errors.password = '密码长度为5~12'
    }
    return errors
  }

})(Login)
