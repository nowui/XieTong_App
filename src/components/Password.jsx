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

class Password extends Component {

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

    console.log(99)

    self.props.form.validateFields((errors, values) => {
      if (!!errors) {
        let message = ''

        for(let e in errors) {
          message += errors[e]['errors'][0]['message'] + ';'
        }

        Toast.fail(message, Helper.duration)

        return
      }

      if(values.user_password == '') {
        Toast.fail('密码为空', Helper.duration)

        return
      }

      if(values.user_password_2 == '') {
        Toast.fail('确认密码为空', Helper.duration)

        return
      }

      if(values.user_password != values.user_password_2) {
        Toast.fail('两个密码不一致', Helper.duration)

        return
      }

      Helper.ajax({
        url: '/student/password/update',
        data: values,
        success: function(data) {
          Toast.success('修改成功', self.duration)

          setTimeout(function() {
            Toast.hide()

            self.onClickLeft()
          }, 1500)


        },
        complete: function() {

        }
      })
    })
  }

  onClickLeft() {
    this.props.router.goBack()
  }

  render() {
    const { getFieldProps } = this.props.form

    return (
      <div>
        <NavBar mode="light" leftContent="返回" onLeftClick={this.onClickLeft.bind(this)} rightContent="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">重置密码</NavBar>
        <List style={{ margin: '100px 20px 0px 20px'}}>
          <List.Body>
            <InputItem {...getFieldProps('user_password', {
                initialValue: ''
              })}
              type="password"
              format="password"
              clear
              placeholder="请输入新的密码"
              >新的密码</InputItem>
            <InputItem
              {...getFieldProps('user_password_2', {
                initialValue: ''
              })}
              type="password"
              format="password"
              clear
              placeholder="请输入确认密码"
            >确认密码</InputItem>
          </List.Body>
        </List>
        <div style={{ margin: '100px 20px 0px 20px'}}>
          <Button type="primary" onClick={this.onClickSubmit.bind(this)}>确定</Button>
        </div>
      </div>
    )
  }
}

Password = Form.create({

})(Password)

export default withRouter(Password)