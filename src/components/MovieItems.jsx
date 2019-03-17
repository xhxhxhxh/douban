import React from 'react';
import styles from '@/css/MovieItem.less';
import { Rate } from 'antd';

export default class MovieItems extends React.Component {
    constructor () {
        super();
        this.state = {

        }
    }
    render() {
        return <div className={styles.item} onClick={() => this.toDetail()}>
            <a href="javacscript:;">
                <img src={'https://images.weserv.nl/?url=' + this.props.images.small.substr(8) } alt=""/>
                <h4 className="name">电影名称：{this.props.title}</h4>
                <h4 className="year">上映年份：{this.props.year}</h4>
                <h4 className="type">电影类型：{this.props.genres}</h4>
                <Rate disabled defaultValue={this.props.rating.average / 2} />
            </a>
        </div>;
    }

    //跳转详情页
    toDetail = () => {
        this.props.history.push(`/movie/detail/${this.props.id}`);
    }
}