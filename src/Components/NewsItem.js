import React, { Component } from 'react'

export class NewsItem extends Component {

    timeHandle = (time) => {
        const date = new Date(time);
        const today = new Date();
        const timeDiff = today - date;
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    render() {
        let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
        return (
            <div className="my-3 outer-container">
                <div className="card" style={{ maxWidth: '80%', margin: '12px auto', minWidth: '320px' }}>
                    <div style={{display:'flex',justifyItems:'flex-end',position:'absolute',right:'0'}}>
                        <span className=" p-2 bg-warning text-danger  badge rounded-pill" >{source}</span>
                    </div>
                    <img src={imageUrl}
                        className="card-img-top" alt={title.slice(0, 22)} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text text-start mb-1">Credits:  <b>{author}</b></p>
                        <p className="card-text my-2 py-2"><small className="text-body-secondary">{this.timeHandle(date)} days ago</small></p>
                        <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;