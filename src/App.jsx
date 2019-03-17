import React from 'react';
import {HashRouter, Route, Link, Redirect, Switch} from "react-router-dom";
import { Layout, Menu } from 'antd';
import styles from "@/css/app.less";

//导入组件
import Home from '@/components/Home';
import Movie from '@/components/Movie';
import About from '@/components/About';

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
    constructor () {
        super();
        this.state = {
            hashAddress: ''
        }
    }

    componentWillMount() {
        if (window.location.hash == '') {
            this.setState({
                hashAddress: 'movie'
            })
        } else {
            this.setState({
                hashAddress: window.location.hash.split('/')[1]
            })
        }
    }
    render() {
        return <HashRouter>
            <Layout className="layout" style={{height: '100%'}}>
                <Header>
                    <div className={styles.logo} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[ this.state.hashAddress]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home">
                            <Link to="/home">首页</Link>
                        </Menu.Item>
                        <Menu.Item key="movie">
                            <Link to="/movie/in_theaters/1">电影</Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about">关于</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ height: '100%' }}>
                    <div style={{ background: '#fff', minHeight: 280, height: '100%' }}>
                        {/*<Route exact path="/">*/}
                            {/*<Redirect to="/movie"></Redirect>*/}
                        {/*</Route>*/}
                        <Switch>
                            <Redirect exact from='/' to='/movie/in_theaters/1'/>
                            <Route path="/movie" component={Movie}></Route>
                        </Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/about" component={About}></Route>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', height: '42px', padding: '11px '}}>
                    DouBan ©2019 Created by XH
                </Footer>
            </Layout>
        </HashRouter>;
    }
}