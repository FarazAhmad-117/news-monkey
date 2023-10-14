import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spiner from './Spiner'
// import dataSet from './../sampleOutput.json'
import InfiniteScroll from 'react-infinite-scroll-component'
import Sorry from '../img/sorry.jpg';


export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    
    const updateNews = async() => {
        props.setProgress(15);
        await setPage(1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        document.title = ` News Monkey | ${capitalize(props.category)} `;
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(80);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        setTotalPages(totalResults / props.pageSize);
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        //eslint-disable-next-line
    },[props.country,props.mode]);


    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        document.title = ` News Monkey | ${capitalize(props.category)} `;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
        setPage((prevPage) => prevPage + 1);
        setAllArticlesLoaded(page >= totalPages);
    }
    const capitalize = (wrd) => {
        return wrd.charAt(0).toUpperCase() + wrd.slice(1);
    }

    return (
        <>
            <h1 className="text-center" style={{ margin: '26px 0px', fontFamily: 'fantasy', fontSize: '48px', color: '#333',marginTop:'90px' }}>{`NewsMonkey - ${props.heading ? props.heading : 'Top Headlines'}`}</h1>
            {loading && <Spiner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={!allArticlesLoaded}
                loader={<Spiner />}
            >
                <div className="container">
                    <div className="row my-3 d-lg-flex flex-lg-wrap">
                        {articles.map((element) => {
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
            {allArticlesLoaded && (
                <div className="text-center">
                    <h2>Sorry, No More News For Today!</h2>
                    <img src={Sorry} alt="Sorry You Just Caught Up!" style={{ maxWidth: '400px', minWidth: '30%' }} />
                </div>
            )}
        </>
    );
}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
