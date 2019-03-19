import React from 'react';
import { Spin, Alert, Pagination  } from 'antd';
import fetchJsonp from 'fetch-jsonp';
import MovieItems from '@/components/MovieItems';

export default class MovieList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            movieList: [],
            currentPage: parseInt(props.match.params.page),
            pageSize: 12,
            totalPage: 0,
            type: props.match.params.type,
            isLoading: true
        }
    }

    componentWillMount() {
        this.getMovieListDataByPage();
    }

    render() {
        return <div style={{height: '100%'}}>{this.renderList()}</div>;
    }

    //监听props改变
    componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.match.params.type,
            currentPage: parseInt(nextProps.match.params.page),
            isLoading: true
        },() => {
            this.getMovieListDataByPage();
        })
    }

    //渲染的html
    renderList = () => {
        if (this.state.isLoading) {
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影列表数据"
                    description="精彩内容马上呈现！"
                    type="info"
                />
            </Spin>
        } else {
            return <div style={{height: '100%', position: 'relative'}}>
                <div style={{display: 'flex',justifyContent: 'flex-start', flexWrap:'wrap',minWidth:'1232px',padding:'15px 15px 0'}}>
                {this.state.movieList.map(item => <MovieItems {...item} key={item.id} history={this.props.history}></MovieItems>)}
            </div>
                <Pagination showQuickJumper defaultCurrent={this.state.currentPage} total={this.state.totalPage}
                            pageSize={this.state.pageSize} onChange={(page) => this.pageChange(page)}
                style={{paddingLeft: '15px', position: 'absolute', bottom: '6px', left:'0'}}/>
                </div>
        }
    };

    //请求电影数据
    getMovieListDataByPage = () => {
        const start = (this.state.currentPage - 1) * this.state.pageSize;
        // console.log(this.state)
        fetchJsonp(`https://api.douban.com/v2/movie/${this.state.type}?start=${start}&count=${this.state.pageSize}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({
                    movieList: data.subjects,
                    totalPage: data.total,
                    isLoading: false
                })
        })
    };

    //页码改变事件
    pageChange = (page) => {
        this.props.history.push(`/movie/${this.state.type}/${page}`);
    }
}