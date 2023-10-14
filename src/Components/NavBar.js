import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

export class NavBar extends Component {
    constructor(){
        super();
        this.state = {
            activeElement:null
        }
    }
    handleCountry = (event)=>{
        console.log(event.target.value);
        this.props.selectCountry(event.target.value);
    }
    render() {
        return (
            <div style={{ position: 'sticky', top: '0', zIndex: '1000' }}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">NewsMonkey</a>
                        {/* <Link className="navbar-brand" to="/">NewsMonkey</Link> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                    {/* <Link className="nav-link active" onClick={this.handleClick} aria-current="page" to="/">Home</Link> */}
                                </li>
                                <li className="nav-item"><a className="nav-link" href="/business">Business</a></li>
                                <li className="nav-item"><a className="nav-link" href="/entertainment">Entertainment</a></li>
                                <li className="nav-item"><a className="nav-link" href="/general">General</a></li>
                                <li className="nav-item"><a className="nav-link" href="/health">Health</a></li>
                                <li className="nav-item"><a className="nav-link" href="/science">Science</a></li>
                                <li className="nav-item"><a className="nav-link" href="/sports">Sports</a></li>
                                <li className="nav-item"><a className="nav-link" href="/technology">Technology</a></li>
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/business">Business</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/entertainment">Entertainment</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/general">General</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/health">Health</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/science">Science</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/sports">Sports</Link></li> */}
                                {/* <li className="nav-item"><Link className="nav-link" onClick={this.handleClick} to="/technology">Technology</Link></li> */}
                            </ul>
                        </div>
                        <select className="form-select" onChange={this.handleCountry} aria-label="Default select example" style={{maxWidth:'20%'}}>
                            <option defaultValue={"us"}>Select Country</option>
                            <option value="us">US</option>
                            <option value="in">India</option>
                            <option value="jp">Japan</option>
                        </select>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;