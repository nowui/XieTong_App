import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form } from 'antd'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import TabBar from 'antd-mobile/lib/tab-bar'
import Icon from 'antd-mobile/lib/icon'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'

class Tab extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/UNQhIatjpNZHjVf.png' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/HLkBvJOKnmOfBPO.png' }}
          title="课程"
          key="课程"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {

          }}
        >
          <NavBar iconName={false} mode="light">NavBar</NavBar>
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/EljxLrJEShWZObW.png' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/LWNaMdwAFSmYBFw.png' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {

          }}
        >
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default withRouter(Tab)