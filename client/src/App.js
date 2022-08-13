import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AllStartups from "./pages/AllStartups";
import Bids from "./pages/Bids";
import Home from "./pages/Home";
import Messaging from "./pages/Messaging";
import { Button, Layout, Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageFilled,
  StockOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Chat from "./pages/Chat";
import { connect } from "react-redux";
import { startLoading, stopLoading } from "./store/actions";

const { Header, Sider, Content } = Layout;
function App(props) {
  useEffect(() => {
    props.startLoading("Logging you in");
    //  TODO: login user
    props.stopLoading();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="App">
      <Spin spinning={props.loading} tip={props.loadingMessage}>
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Button
              style={{
                width: "100%",
                margin: "4px 0px",
                boxSizing: "border-boxs",
              }}
            >
              Investify
            </Button>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HomeFilled />,
                  label: "Home",
                  onClick: () => {
                    navigate("/");
                  },
                },
                {
                  key: "2",
                  icon: <UnorderedListOutlined />,
                  label: "Startups",
                  onClick: () => {
                    navigate("/all");
                  },
                },
                {
                  key: "3",
                  icon: <StockOutlined />,
                  label: "Bids and Asks",
                  onClick: () => {
                    navigate("/bids");
                  },
                },
                {
                  key: "4",
                  icon: <MessageFilled />,
                  label: "Chats",
                  onClick: () => {
                    navigate("/messaging");
                  },
                },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-backgrounds">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <Button className="float-right">Login</Button>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route
                  path="/all"
                  element={<AllStartups></AllStartups>}
                ></Route>
                <Route path="/bids" element={<Bids></Bids>}></Route>
                <Route
                  path="/messaging"
                  element={<Messaging></Messaging>}
                ></Route>
                <Route
                  path="/messaging/:userId/:receiverId"
                  element={<Chat></Chat>}
                ></Route>
                <Route path="/" element={<Home />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Spin>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    loadingMessage: state.loadingMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: (message) => {
      dispatch(startLoading(message));
    },
    stopLoading: () => {
      dispatch(stopLoading());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
