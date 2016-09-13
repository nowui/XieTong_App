import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import Helper from '../common/Helper'

import NavBar from 'antd-mobile/lib/nav-bar'
import List from 'antd-mobile/lib/list'
import Icon from 'antd-mobile/lib/icon'
import Button from 'antd-mobile/lib/button'
import Toast from 'antd-mobile/lib/toast'
import TabBar from 'antd-mobile/lib/tab-bar'

import 'antd-mobile/lib/nav-bar/style/index.css'
import 'antd-mobile/lib/list/style/index.css'
import 'antd-mobile/lib/icon/style/index.css'
import 'antd-mobile/lib/button/style/index.css'
import 'antd-mobile/lib/toast/style/index.css'
import 'antd-mobile/lib/tab-bar/style/index.css'

let list = []
let scrollTop = 0

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'indexTab',
      list: list
    }

  }

  componentDidMount() {
    this.load(list.length > 0)

    this.refs['list'].scrollTop = scrollTop
  }

  componentWillUnmount() {
    scrollTop = this.refs['list'].scrollTop
  }

  load = function(upLoad) {
    let self = this

    Helper.ajax({
      url: '/course/list2',
      data: {
        page: 0,
        limit: 0
      },
      unLoad: upLoad,
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

        list = data

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
    this.load(false)
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

          }}
        >
          <div className="header">
            <NavBar mode="light" iconName={false} leftContent={[<Icon key="0" type="reload" />]} rightContent="&nbsp;&nbsp;&nbsp;&nbsp;" onLeftClick={this.onClickLeft.bind(this)}>课程列表</NavBar>
          </div>
          <div className="container" ref='list'>
            <List style={{marginBottom: '99px'}}>
              <List.Body>
                {
                  this.state.list.map(function (item, index) {
                    return (
                      <List.Item key={index} arrow="horizontal" onClick={this.onClickListItem.bind(this, item.course_id)}>
                        <div style={{marginTop: '20px', height: '50px'}}><span style={{color:'#777777', marginRight:'20px'}}>课程:</span> {item.course_name}</div>
                        <div style={{width: '400px', height: '50px', flex: 2}}><span style={{color:'#777777', marginRight:'20px'}}>时间:</span> {item.course_class}</div>
                        <div style={{marginBottom: '20px'}}><span style={{color:'#777777', marginRight:'20px'}}>剩余名额:</span> <span style={{color: '#ff0000'}}>{item.course_apply_limit - item.course_apply_count}</span></div>
                        {
                          item.isApply ?
                          <div style={{position: 'absolute', right: '78px', top: '70px', color: '#888'}}>已申请</div>
                          :
                          ''
                        }
                      </List.Item>
                    )
                  }.bind(this))
                }
              </List.Body>
            </List>
          </div>
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: require('../assets/image/mine.png') }}
          selectedIcon={{ uri: require('../assets/image/mine_active.png') }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'settingTab'}
          onPress={() => {
            this.props.router.push({
              pathname: '/mine',
              query: {

              }
            })
          }}
        >
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default withRouter(Index)