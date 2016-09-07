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

class MyCourse extends Component {

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
      url: '/course/my',
      data: {
        page: 0,
        limit: 0
      },
      success: function(data) {
        for(let i = 0; i < data.length; i++) {
          let course = data[i]

          for(let j = 0; j < Helper.course_class.length; j++) {
            if(course.course_class == Helper.course_class[j].value) {
              course.course_class = Helper.course_class[j].text

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

  onClickLeft() {
    this.props.router.goBack()
  }

  render() {
    return (
      <div>
        <div className="header">
          <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">我的课程</NavBar>
        </div>
        <div className="container">
          <List>
            <List.Body>
              {
                this.state.list.map(function (item, index) {
                  return (
                    <List.Item key={index}>
                      <div style={{marginTop: '20px', height: '50px'}}><span style={{color: '#777777'}}>课程:</span> {item.course_name}</div>
                      <div style={{height: '50px'}}><span style={{color: '#777777'}}>时间:</span> {item.course_class}</div>
                      <div style={{marginBottom: '20px'}}><span style={{color: '#777777'}}>地点:</span> {item.course_address}</div>
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

export default withRouter(MyCourse)