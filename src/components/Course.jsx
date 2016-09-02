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

class Course extends Component {

  constructor(props) {
    super(props)

    this.state = {
      course: {
        course_teacher: []
      }
    }
  }

  componentDidMount() {
    this.load()
  }

  load = function(currentPage) {
    let self = this

    Helper.ajax({
      url: '/course/find2',
      data: {
        course_id: self.props.params.course_id
      },
      success: function(data) {
        self.setState({
          course: data,
          count: data.course_apply_limit - data.course_apply_count
        })
      },
      complete: function() {

      }
    })
  }

  onClickSubmit(isApply) {
    let self = this

    Helper.ajax({
      url: '/course/apply',
      data: {
        course_id: self.props.params.course_id,
        isApply: isApply
      },
      success: function(data) {
        let course = self.state.course
        course.isApply = isApply
        self.setState({
          course: course
        })

        Toast.success("操作成功", Helper.duration)
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
        <NavBar leftContent="返回" rightContent={[<Link key="0" to={"/history/" + this.props.params.course_id} style={{color: '#ffffff'}}>记录</Link>]} onLeftClick={this.onClickLeft.bind(this)}>课程明细</NavBar>
        <List>
          <List.Body>
            <List.Item extra={this.state.course.course_name}>
              课程名称
            </List.Item>
            <List.Item extra={
              this.state.course.course_teacher.map(function (item, index) {
                return (
                  <span key={index}>{index > 0 ? ',' : ''}{item}</span>
                )
              }.bind(this))
            }>
              上课老师
            </List.Item>
            <List.Item extra={this.state.course.course_class}>
              上课时间
            </List.Item>
            <List.Item extra={this.state.course.course_apply_limit}>
              限制人数
            </List.Item>
            <List.Item extra={this.state.course.course_address}>
              上课地点
            </List.Item>
            <List.Item extra={this.state.course.course_remark}>
              自备材料
            </List.Item>
            <List.Item>
              <div style={{marginTop: '20px'}}>课程介绍:</div>
              <div style={{color: '#666', marginTop: '20px', marginBottom: '20px'}}>{this.state.course.course_content}</div>
            </List.Item>
          </List.Body>
        </List>
        <div style={{ margin: '0 8px', marginTop: '30px' }}>
          {
            this.state.course.isApply ?
            <Button onClick={this.onClickSubmit.bind(this, false)} style={{backgroundColor: '#dd514c', color: '#ffffff'}}>取消申请</Button>
            :
              this.state.count == 0 ?
              ''
              :
              <Button type="primary" onClick={this.onClickSubmit.bind(this, true)}>提交申请</Button>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Course)