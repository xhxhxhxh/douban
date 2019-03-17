import React from 'react';
import { Spin, Alert, Button, Radio, Icon} from 'antd';
import fetchJsonp from 'fetch-jsonp';

export default class MovieDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            movieDetail: {},
            isLoading: true,
            id: props.match.params.id
        }
    }
    render() {
        return <div>{this.renderList()}</div>;
    }

    componentWillMount() {
        this.getMovieListDataByPage();
    }

//渲染的html
    renderList = () => {
        if (this.state.isLoading) {
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影详情数据"
                    description="精彩内容马上呈现！"
                    type="info"
                />
            </Spin>
        } else {
            return <div style={{height: '100%', padding: '15px'}}>
                <Button type="primary" onClick={() => this.goBack()}>
                    <Icon type="left" />返回电影列表页面
                </Button>
                <h1 style={{fontSize: '24px', fontWeight: 500, textAlign: 'center'}}>{this.state.movieDetail.aka[0]}</h1>
                <img src={'https://images.weserv.nl/?url=' + this.state.movieDetail.images.small.substr(7)}
                style={{display: 'block', margin: '0 auto'}} height='380'/>
                <p style={{lineHeight: '30px', textIndent: '2em', marginTop: '15px'}}>{this.state.movieDetail.summary}</p>
            </div>
        }
    };
    //请求电影数据
    getMovieListDataByPage = () => {
        fetchJsonp(`http://api.douban.com/v2/movie/subject/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    movieDetail: data,
                    isLoading: false
                })
            })
    };

    //返回上一页
    goBack = () => {
        this.props.history.go(-1);
    }
}