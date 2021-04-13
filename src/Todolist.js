import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { List } from "antd";
import "./Todolist.css";

const { Header, Content, Footer } = Layout;

export default class Todolist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      inputValue: ""
    };
  }

  componentWillMount() {
    var myList = window.localStorage.getItem("myList");
    if (myList == null || myList == "") {
      myList = [];
    } else {
      myList = myList.split(",");
    }

    this.setState({
      list: myList
    });
  }

  handleBtnClick() {
    this.setState(
      {
        list: [...this.state.list, this.state.inputValue],
        inputValue: ""
      },
      () => {
        window.localStorage.setItem("myList", this.state.list);
      }
    );
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleItemClick(index) {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState(
      {
        list: list
      },
      () => {
        window.localStorage.setItem("myList", this.state.list);
      }
    );
  }

  keyDown(e) {
    if (e.keyCode == 13) {
      this.handleBtnClick();
    }
  }

  handleUpdate(index) {
    var rel = window.prompt("请输入新内容：");
    if (rel != null) {
      this.state.list.splice(index, 1, rel);
      this.setState(
        {
          list: this.state.list
        },
        () => {
          window.localStorage.setItem("myList", this.state.list);
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">
                <div>
                  <Input
                    placeholder="输入待办事项"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange.bind(this)}
                    onKeyDown={this.keyDown.bind(this)}
                  ></Input>
                  <Button
                    type="primary"
                    onClick={this.handleBtnClick.bind(this)}
                  >
                    添加
                  </Button>
                </div>
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <List bordered dataSource={""} header={<div>待办事项</div>}>
                {this.state.list.map((item, index) => {
                  return (
                    <List.Item key={index}>
                      {item}&nbsp;&nbsp;
                      <div style={{ float: "right" }}>
                        <Button
                          type="primary"
                          onClick={this.handleUpdate.bind(this, index)}
                        >
                          {" "}
                          修改{" "}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          type="primary"
                          danger
                          onClick={this.handleItemClick.bind(this, index)}
                        >
                          {" "}
                          删除{" "}
                        </Button>
                      </div>
                    </List.Item>
                  );
                })}
              </List>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Todolist</Footer>
        </Layout>
      </div>
    );
  }
}
