import React from 'react';
import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import MovieList from '@/components/MovieList'
import MovieDetail from '@/components/MovieDetail'
import {Link, Route, Switch} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Movie extends React.Component {
    constructor () {
        super();
        this.state = {

        }
    }
    render() {
        return <div style={{height: '100%'}}>
            <Layout style={{height: '100%',background: '#fff'}}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="in_theaters">
                            <Link to="/movie/in_theaters/1">正在热映</Link>
                        </Menu.Item>
                        <Menu.Item key="coming_soon">
                            <Link to="/movie/coming_soon/1">即将上映</Link>
                        </Menu.Item>
                        <Menu.Item key="top250">
                            <Link to="/movie/top250/1">Top250</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{ height: '100%' }}>
                    <div style={{ background: '#fff', minHeight: 280, height: '100%' }}>
                       <Switch>
                           <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
                           <Route path="/movie/:type/:page" component={MovieList}></Route>
                       </Switch>
                    </div>
                </Content>
            </Layout>
        </div>;
    }
}