import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Icon from 'antd-mobile/lib/icon'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'

import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'

class History extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.load()
  }

  load = function(currentPage) {
    let self = this

    Helper.ajax({
      url: '/course/history',
      data: {
        course_id: self.props.params.course_id
      },
      success: function(data) {
        self.setState({
          list: data
        })
      },
      complete: function() {

      }
    })
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  render() {
    return (
      <div>
        <div className="header">
          <NavBar leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">申请记录</NavBar>
        </div>
        <div className="container">
          <List>
            <List.Body>
              {
                this.state.list.map(function (item, index) {
                  return (
                    <List.Item key={index}>
                      {
                        item.course_apply_history_is_apply ?
                        <div>提交申请</div>
                        :
                        <div style={{color: '#ff0000'}}>取消申请</div>
                      }
                      <div>{item.course_apply_history_create_time}</div>
                    </List.Item>
                  )
                }.bind(this))
              }
            </List.Body>
          </List>
        </div>

      </div>
    )
  }
}

export default withRouter(History)