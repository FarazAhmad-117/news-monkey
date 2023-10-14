import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spiner from './Spiner'
// import dataSet from './../sampleOutput.json'
import InfiniteScroll from 'react-infinite-scroll-component'
import Sorry from '../img/sorry.jpg';

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            allArticlesLoaded : false,
            totalPages:0
        }
    }
    
    async componentDidMount() {
        this.updateNews();
    }

    async updateNews() {
        this.props.setProgress(15);
        await this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        document.title = ` News Monkey | ${this.capitalize(this.props.category)} `;
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(80);
        await this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults,
            totalPages:this.state.totalResults/ this.props.pageSize
        })
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        document.title = ` News Monkey | ${this.capitalize(this.props.category)} `;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData.articles);
        await this.setState((prevState) => ({
            articles: [...prevState.articles, ...parsedData.articles],
            totalResults: parsedData.totalResults,
            page: prevState.page + 1,
            allArticlesLoaded: this.state.page >= this.state.totalPages
        }));
        
    }
    capitalize = (wrd) => {
        return wrd.charAt(0).toUpperCase() + wrd.slice(1);
    }

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '26px 0px', fontFamily: 'fantasy', fontSize: '48px', color: '#333' }}>{`NewsMonkey - ${this.props.heading ? this.props.heading : 'Top Headlines'}`}</h1>
                {this.state.loading && <Spiner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={!this.state.allArticlesLoaded}
                    loader={<Spiner />}
                >
                    <div className="container">
                        <div className="row my-3 d-lg-flex flex-lg-wrap">
                            {this.state.articles.map((element) => {
                                if (!(element.title && element.author && element.description)) {
                                    return null;
                                }
                                return <div className="col-md-6 col-lg-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 90) : ""} description={element.description ? element.description.slice(0, 120) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fwww.ft.com%2F__origami%2Fservice%2Fimage%2Fv2%2Fimages%2Fraw%2Fhttps%253A%252F%252Fd1e00ek4ebabms.cloudfront.net%252Fproduction%252F41bd854f-b2e7-42d7-9b65-b7dc388444e8.jpg%3Fsource%3Dnext-article%26fit%3Dscale-down%26quality%3Dhighest%26width%3D700%26dpr%3D1?source=next-opengraph&fit=scale-down&width=900"}
                                        newsUrl={element.url ? element.url : "#"} date={element.publishedAt} author={element.author ? element.author : "Faraz Ahmad"}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {this.state.allArticlesLoaded && (
                    <div className="text-center">
                        <h2>Sorry, No More News For Today!</h2>
                        <img src={Sorry} alt="Sorry You Just Caught Up!" style={{maxWidth:'400px',minWidth:'30%'}}/>
                    </div>
                )}
            </>
        )
    }
}

export default News;


