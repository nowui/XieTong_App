import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'
import TabBar from 'antd-mobile/lib/tab-bar'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'

import styles from './Mine.less'

class Mine extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'settingTab'
    }
  }

  componentDidMount() {

  }

  onClickLeft() {
    this.props.router.goBack()
  }

  onClickLogout() {
    Helper.logout()

    this.props.router.push({
      pathname: '/login',
      query: {

      }
    })
  }

  onClickListItem(id) {
    let url = ''

    if(id == 0) {
      url = '/mycourse'
    } else {
      url = '/password'
    }

    this.props.router.push({
      pathname: url,
      query: {

      }
    })
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          icon={{ uri: require('../assets/image/brand.png') }}
          selectedIcon={{ uri: require('../assets/image/brand_active.png') }}
          title="课程"
          key="课程"
          selected={this.state.selectedTab === 'indexTab'}
          onPress={() => {
            this.props.router.push({
              pathname: '/index',
              query: {

              }
            })
          }}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: require('../assets/image/mine.png') }}
          selectedIcon={{ uri: require('../assets/image/mine_active.png') }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'settingTab'}
          onPress={() => {
          }}
        >
          <div className="header">
            <NavBar mode="light" iconName={false}>个人信息</NavBar>
          </div>
          <div className="container">
            <List style={{ marginTop: '40px' }}>
              <List.Body>
                <List.Item>
                  <div className={styles.avatar}></div>
                  <div className={styles.name}>{Helper.getName()}</div>
                  <div className={styles.school}>佛山协同(国际)学校</div>
                </List.Item>
              </List.Body>
            </List>

            <List style={{ marginTop: '40px' }}>
              <List.Body>
                <List.Item arrow="horizontal" onClick={this.onClickListItem.bind(this, 0)}>
                  我的课程
                </List.Item>
                <List.Item arrow="horizontal" onClick={this.onClickListItem.bind(this, 1)}>
                  重置密码
                </List.Item>
              </List.Body>
            </List>

            <div style={{ margin: '100px 20px 0px 20px'}}>
              <Button onClick={this.onClickLogout.bind(this)} style={{backgroundColor: '#dd514c', color: '#ffffff'}}>退出</Button>
            </div>
          </div>
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default withRouter(Mine)