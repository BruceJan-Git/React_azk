import React, { Component } from 'react'
import axios from 'axios'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { withFormik } from 'formik';

import { Link } from 'react-router-dom'
import * as yup from 'yup'

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
  validationSchema: yup.object().shape({
    username: yup.string().required('用户名不能为空').matches(REG_UNAME, '用户名必须是5-8个字符（字符、数字或者下划线）'),
    password: yup.string().required('用户名不能为空').matches(REG_PWD, '用户名必须是5-12个字符（字符、数字或者下划线）')
  })

})(Login)
