import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form } from 'antd'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'


import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/input-item/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user_account: '',
      user_password: ''
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue(this.state)
  }

  onClickSubmit() {
    let self = this

    self.props.form.validateFields((errors, values) => {
      if (!!errors) {
        let message = ''

        for(let e in errors) {
          message += errors[e]['errors'][0]['message'] + ';'
        }

        Toast.fail(message, Helper.duration)

        return
      }

      if(values.user_account == '') {
        Toast.fail('学号为空', Helper.duration)

        return
      }

      if(values.user_password == '') {
        Toast.fail('密码为空', Helper.duration)

        return
      }

      Helper.ajax({
        url: '/student/login',
        data: values,
        success: function(data) {
          Helper.login(data.token, data.student_name)

          Toast.success('登录成功', self.duration)

          setTimeout(function() {
            Toast.hide()

            self.props.router.push({
              pathname: '/index',
              query: {

              }
            })
          }, 1000)


        },
        complete: function() {

        }
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <div className="header">
          <NavBar mode="light" iconName={false}>学生登录</NavBar>
        </div>
        <div className="container">
          <List style={{ margin: '100px 20px 0px 20px'}}>
            <List.Body>
              <InputItem {...getFieldProps('user_account', {
                  initialValue: ''
                })}
                clear
                placeholder="请输入学号"
                >学号</InputItem>
              <InputItem
                {...getFieldProps('user_password', {
                  initialValue: ''
                })}
                type="password"
                format="password"
                clear
                placeholder="请输入密码"
              >密码</InputItem>
            </List.Body>
          </List>
          <div style={{ margin: '100px 20px 0px 20px'}}>
            <Button type="primary" onClick={this.onClickSubmit.bind(this)}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}

Login = Form.create({

})(Login)

export default withRouter(Login)