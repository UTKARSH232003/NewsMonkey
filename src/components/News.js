import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    name: 'stranger',
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  articles = [
    {
      "source": {
      "id": null,
      "name": "YouTube"
      },
      "author": null,
      "title": "March Fed FOMC meeting and what it means for interest rates, investors, and the Fed - Yahoo Finance",
      "description": "The Federal Reserve is set to announce its rate decision Wednesday afternoon, with markets anticipating three rate cuts. Macro Institute Chief Investment Str...",
      "url": "https://www.youtube.com/watch?v=SMTyInMqahk",
      "urlToImage": "https://i.ytimg.com/vi/SMTyInMqahk/maxresdefault.jpg",
      "publishedAt": "2024-03-20T00:00:19Z",
      "content": null
      }
    ]
    capitalizeFirstLetterString = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  constructor(props){
    super();
    console.log("this is constructor");
    this.state = {
      page: 1,
      articles: this.articles,
      loading: false
    }
    document.title = `${this.capitalizeFirstLetterString(props.category)} - NewsMonkey`;
    // document.title = `${this.props.category} - NewsMonkey`;
  }
  async updateNews(pageNo){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e0a07c69d744eb58c3178a5fefed116&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.updateNews();
  }

  handleNextClick = async() =>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e0a07c69d744eb58c3178a5fefed116&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   // this.setState({loading: false});
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page +1,
    //     articles: parsedData.articles,
    //     loading : false
    //   })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }
  handlePrevClick = async() =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e0a07c69d744eb58c3178a5fefed116&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page -1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page - 1})
    this.updateNews();
  }


  fetchMoreData = async() => {

    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: 1,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults
    })
  };


  render() {
    return (
      <div className="container my-3">
          <h2 className="text-center" style={{margin: '35px 0px' }}>NewsMonkey - Top Headlines from {this.capitalizeFirstLetterString(this.props.category)} category</h2>

          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.totalResults} loader={<h4>Loading...</h4>}>
            <div className="d-flex justify-content-evenly">
            <div className="row">
              {this.state.articles.map((element) =>{ 
                return <div className="col-md-4" key = {element.url}>
                      <NewsItems title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll> 
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button diabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    )
  }
}

export default News