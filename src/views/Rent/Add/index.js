import React, { Component } from 'react'
import axios from 'axios'

import {
  Flex,
  List,
  InputItem,
  Picker,
  ImagePicker,
  TextareaItem,
  Modal,
  NavBar,
  Toast
} from 'antd-mobile'

// import HousePackge from '../../../components/HousePackage'
import HousePackge from '../../../components/HousePackage/index'

import styles from './index.module.css'

const alert = Modal.alert

// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]

// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]

// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

export default class RentAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 临时图片地址
      tempSlides: [],

      // 小区的名称和id
      community: {
        name: '',
        id: ''
      },
      // 价格
      price: '',
      // 面积
      size: 0,
      // 房屋类型
      roomType: '',
      // 楼层
      floor: '',
      // 朝向：
      oriented: '',
      // 房屋标题
      title: '',
      // 房屋图片
      houseImg: '',
      // 房屋配套：
      supporting: '',
      // 房屋描述
      description: ''
    }
  }

  // 取消编辑，返回上一页
  onCancel = () => {
    alert('提示', '放弃发布房源?', [
      {
        text: '放弃',
        onPress: async () => this.props.history.go(-1)
      },
      {
        text: '继续编辑'
      }
    ])
  }

  render() {
    const Item = List.Item
    const { history } = this.props
    const {
      community,
      price,
      roomType,
      floor,
      oriented,
      description,
      tempSlides,
      title,
      size
    } = this.state

    const tagSelect = ['衣柜', '洗衣机', '空调', '天然气', '冰箱', '暖气', '电视', '热水器', '宽带', '沙发']

    return (
      <div className={styles.root}>
        <NavBar
          className={styles.navHeader}
          mode="dark"
          onLeftClick={this.onCancel}>
          发布房源
        </NavBar>

        <List
          className={styles.header}
          renderHeader={() => '房源信息'}
          data-role="rent-list">
          {/* 选择所在小区 */}
          <Item
            extra={community.name || '请输入小区名称'}
            arrow="horizontal"
            onClick={() => history.replace('/rent/search')}>
            小区名称
          </Item>

          <InputItem placeholder="请输入租金/月" extra="￥/月" value={price} onChange={(price) => { this.comValue('price', price) }}>
            租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金
          </InputItem>

          <InputItem placeholder="请输入建筑面积" extra="㎡" value={size} onChange={(size) => { this.comValue('size', size) }}>
            建筑面积
          </InputItem>

          <Picker data={roomTypeData} value={[roomType]} cols={1} onChange={(value) => { this.comValue('roomType', value[0]) }}>
            <Item arrow="horizontal">
              户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型
            </Item>
          </Picker>

          <Picker data={floorData} value={[floor]} cols={1} onChange={(value) => { this.comValue('floor', value[0]) }}>
            <Item arrow="horizontal">所在楼层</Item>
          </Picker>

          <Picker data={orientedData} value={[oriented]} cols={1} onChange={(value) => { this.comValue('oriented', value[0]) }}>
            <Item arrow="horizontal">
              朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向
            </Item>
          </Picker>
        </List>

        <List
          className={styles.title}
          renderHeader={() => '房屋标题'}
          data-role="rent-list">
          <InputItem
            onChange={(value) => { this.comValue('title', value) }}
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            value={title} />
        </List>

        <List
          className={styles.pics}
          renderHeader={() => '房屋图像'}
          data-role="rent-list">
          <ImagePicker
            onChange={this.handlerImage}
            files={tempSlides}
            multiple={true}
            className={styles.imgpicker}
          />
        </List>

        <List
          className={styles.supporting}
          renderHeader={() => '房屋配置'}
          data-role="rent-list">
          <HousePackge
            list={tagSelect}
            onSelect={this.handlerTagSelect}
            select />
        </List>

        <List
          className={styles.desc}
          renderHeader={() => '房屋描述'}
          data-role="rent-list" >
          <TextareaItem
            onChange={(value) => { this.comValue('description', value) }}
            rows={5}
            placeholder="请输入房屋描述信息"
            autoHeight
            value={description} />
        </List>

        <Flex className={styles.bottom}>
          <Flex.Item className={styles.cancel} onClick={this.onCancel}>
            取消
          </Flex.Item>
          <Flex.Item className={styles.confirm} onClick={this.addHouse}>
            提交
          </Flex.Item>
        </Flex>
      </div>
    )
  }
  componentDidMount() {
    let param = this.props.location.state
    if (param) {
      this.setState({
        community: {
          id: param.id,
          name: param.name
        }
      })
    }
  }
  comValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  handlerImage = (files, type, index) => {
    this.setState({
      tempSlides: files
    })
  }
  addHouse = async () => {
    let { tempSlides } = this.state
    if (tempSlides.length === 0) {
      Toast('请选择图片')
      return
    } else {
      let form = new FormData()
      tempSlides.forEach(item => {
        form.append('file', item.file)
      })
      let res = await axios.post('houses/image', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      let houseImg = res.body.join('|')
      console.log(houseImg)
    }
  }
  handlerTagSelect = (selectedItems) => {
    this.setState({
      supporting: selectedItems
    })
  }

}
