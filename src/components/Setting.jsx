import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Button from 'antd-mobile/lib/button'
import Icon from 'antd-mobile/lib/icon'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'

import styles from './Setting.less'

class Setting extends Component {

  constructor(props) {
    super(props)
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

  render() {
    return (
      <div>
        <NavBar leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">我的帐号</NavBar>
        <List style={{ marginTop: '50px' }}>
          <List.Body>
            <List.Item>
              <div className={styles.avatar}></div>
              <div className={styles.name}>{Helper.getName()}</div>
              <div className={styles.school}>佛山协同(国际)学校</div>
            </List.Item>
          </List.Body>
        </List>

        <div style={{ margin: '0 8px', marginTop: '100px' }}>
          <Button onClick={this.onClickLogout.bind(this)} style={{backgroundColor: '#dd514c', color: '#ffffff'}}>退出</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(Setting)