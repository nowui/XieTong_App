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

const course_class = [{
  value: '17',
  text: '星期一第七节'
}, {
  value: '18',
  text: '星期一第八节'
}, {
  value: '27',
  text: '星期二第七节'
}, {
  value: '47',
  text: '星期四第七节'
}, {
  value: '48',
  text: '星期四第八节'
}, {
  value: '56',
  text: '星期五第六节'
}]

class Index extends Component {

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
      url: '/course/list2',
      data: {
        page: 0,
        limit: 0
      },
      success: function(data) {
        for(let i = 0; i < data.length; i++) {
          let course = data[i]

          for(let j = 0; j < course_class.length; j++) {
            if(course.course_class == course_class[j].value) {
              course.course_class = course_class[j].text

              break
            }
          }
        }

        self.setState({
          list: data
        })
      },
      complete: function() {

      }
    })
  }

  onClickListItem(id) {
    this.props.router.push({
      pathname: '/course/' + id,
      query: {

      }
    })
  }

  onClickLeft() {
    this.load()
  }

  render() {
    return (
      <div>
        <NavBar iconName={false} leftContent={[<Icon key="0" type="reload" />]} rightContent={[<Link key="0" to="/setting" style={{color: '#ffffff'}}>帐号</Link>]} onLeftClick={this.onClickLeft.bind(this)}>课程列表</NavBar>
        <List>
          <List.Body>
            {
              this.state.list.map(function (item, index) {
                return (
                  <List.Item key={index} arrow="horizontal" onClick={this.onClickListItem.bind(this, item.course_id)} extra={item.isApply ? '已申请' : ''}>
                    <div style={{marginTop: '20px', height: '50px'}}><span style={{color: '#777777'}}>课程名称:</span> {item.course_name}</div>
                    <div style={{height: '50px'}}><span style={{color: '#777777'}}>上课时间:</span> {item.course_class}</div>
                    <div style={{marginBottom: '20px'}}><span style={{color: '#777777'}}>剩余名额:</span> <span style={{color: '#ff0000'}}>{item.course_apply_limit - item.course_apply_count}</span></div>
                  </List.Item>
                )
              }.bind(this))
            }
          </List.Body>
        </List>
      </div>
    )
  }
}

export default withRouter(Index)