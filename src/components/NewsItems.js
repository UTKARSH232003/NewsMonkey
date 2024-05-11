import React, { Component } from 'react'

export class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    let consturl = "https://media.istockphoto.com/id/1409309637/vector/breaking-news-label-banner-isolated-vector-design.jpg?s=612x612&w=0&k=20&c=JoQHezk8t4hw8xXR1_DtTeWELoUzroAevPHo0Lth2Ow=";
    return(
      <div>
        <div className="card" style={{width: "18rem" ,margin: "10px 0px"}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source}</span>
            <img src={imageUrl!=null?imageUrl:consturl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"> <small className="text-muted"> By {!author?"Unknown": author} on {new Date(date).toGMTString()} </small></p>
                <a href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems