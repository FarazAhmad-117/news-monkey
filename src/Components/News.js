import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner'

export class News extends Component {
    articles = [
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "Phil Rosen",
            "title": "'You made it through winter': Anthony Scaramucci shares 3 reasons why he's still bullish on bitcoin",
            "description": "\"Every single Wall Street firm is going to have a bitcoin ETF in their arsenal,\" the Skybridge Capital founder told attendees at Messari Mainnet.",
            "url": "https://markets.businessinsider.com/news/currencies/anthony-scaramucci-bitcoin-outlook-skybridge-capital-crypto-messari-mainnet-conference-2023-9",
            "urlToImage": "https://i.insider.com/650b62ed12dc4f001a176ecb?width=1200&format=jpeg",
            "publishedAt": "2023-09-21T14:05:00Z",
            "content": "Anthony Scaramucci at Messari Mainnet, 2023.Phil Rosen/Insider\r\n<ul>\n<li>Anthony Scaramucci believes the next decade will be \"remarkably bullish\" for bitcoin.</li>\n<li>At the Messari Mainnet conferen… [+2015 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "Phil Rosen",
            "title": "Tech drags US stocks lower as Oracle drops and Apple slides after iPhone event",
            "description": "The Nasdaq dropped for the first time in three days and tech names broadly moved lower. Investors are bracing for the August CPI report.",
            "url": "https://markets.businessinsider.com/news/stocks/stock-market-news-oracle-apple-nasdaq-tech-iphone-sp500-investors-2023-9",
            "urlToImage": "https://i.insider.com/6500b90b7cfadd001913e367?width=1200&format=jpeg",
            "publishedAt": "2023-09-12T20:17:51Z",
            "content": "Apple CEO Tim Cook speaks before the start of the Apple Worldwide Developers Conference at its headquarters on June 05, 2023 in Cupertino, California.Justin Sullivan/Getty Images\r\n<ul>\n<li>Oracle sto… [+2955 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "beincrypto.com",
            "title": "Bitcoin Mining Drops 9% Due to ‘Record High’ Temperatures",
            "description": "Marathon Digital, a Bitcoin mining company, has blamed extreme weather conditions for the decrease in Bitcoin mining productivity in August. “The decrease in bitcoin production from July was largely due to increased curtailment activity in Texas due to record…",
            "url": "https://biztoc.com/x/906f9e47818beb53",
            "urlToImage": "https://c.biztoc.com/p/906f9e47818beb53/s.webp",
            "publishedAt": "2023-09-06T06:30:36Z",
            "content": "Marathon Digital, a Bitcoin mining company, has blamed extreme weather conditions for the decrease in Bitcoin mining productivity in August.The decrease in bitcoin production from July was largely du… [+307 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "thecryptobasic.com",
            "title": "Pro-XRP Attorney in Shock as Max Keiser Fails to Rank with Satoshi Holding 1.1M Bitcoin",
            "description": "Deaton in Shock as Max Keiser Absent from Top Bitcoin Holders List. Pro-XRP attorney John Deaton has expressed astonishment at the conspicuous absence of Max Keiser, a renowned Bitcoin maximalist, on the ranking of the most preeminent Bitcoin (BTC) holders. I…",
            "url": "https://biztoc.com/x/437504877f516879",
            "urlToImage": "https://c.biztoc.com/p/437504877f516879/s.webp",
            "publishedAt": "2023-09-19T07:36:15Z",
            "content": "Deaton in Shock as Max Keiser Absent from Top Bitcoin Holders List.Pro-XRP attorney John Deaton has expressed astonishment at the conspicuous absence of Max Keiser, a renowned Bitcoin maximalist, on … [+289 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "protos.com",
            "title": "Hot-headed crypto commentator Shinobi joins Bitcoin Magazine",
            "description": "The vocal, polarizing, and unapologetically Bitcoin-only researcher and journalist Shinobi has joined Bitcoin Magazine as its new technical editor. Following his promotion, CEO David Bailey praised Shinobi’s work as a technical advisor for Peter McCormack’s p…",
            "url": "https://biztoc.com/x/086e9d3d1668e35c",
            "urlToImage": "https://c.biztoc.com/p/086e9d3d1668e35c/s.webp",
            "publishedAt": "2023-09-07T11:24:13Z",
            "content": "The vocal, polarizing, and unapologetically Bitcoin-only researcher and journalist Shinobi has joined Bitcoin Magazine as its new technical editor. Following his promotion, CEO David Bailey praised S… [+300 chars]"
        }
    ]

    constructor() {
        super();
        console.log("Hello its constructor from news component!")
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
        }
    }
    
    async componentDidMount() {
        console.log("cdm");
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=88f2a12702c143bd853759ebbe213b7f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        })
    }

    handlePrev = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=88f2a12702c143bd853759ebbe213b7f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })
    }
    handleNext = async () => {
        if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
            console.log("Next");
            this.setState({ loading: true })
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=88f2a12702c143bd853759ebbe213b7f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                loading: false,
                page: this.state.page + 1
            })
        }
    }

    render() {
        console.log("first")
        return (
            <div className="container my-4">
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spiner />}
                <div className="row my-3">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage ? element.urlToImage : "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fwww.ft.com%2F__origami%2Fservice%2Fimage%2Fv2%2Fimages%2Fraw%2Fhttps%253A%252F%252Fd1e00ek4ebabms.cloudfront.net%252Fproduction%252F41bd854f-b2e7-42d7-9b65-b7dc388444e8.jpg%3Fsource%3Dnext-article%26fit%3Dscale-down%26quality%3Dhighest%26width%3D700%26dpr%3D1?source=next-opengraph&fit=scale-down&width=900"} newsUrl={element.url ? element.url : "#"} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;


