import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AllStartups from "./pages/AllStartups";
import Bids from "./pages/Bids";
import Home from "./pages/Home";
import Messaging from "./pages/Messaging";
import { Button, Layout, Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
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
import Login from "./pages/Login";

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
            <Button className=" text-white border-none text-xl font-bold text-center px-6 py-4 border-b border-white mb-6">
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
            <Header className="site-layout-backgrounds items-center">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger p-0 text-white",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <Link to="/login">
                <Button className="float-right text-white my-4">Login</Button>
              </Link>
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
                <Route path="/login" element={<Login />}></Route>
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
