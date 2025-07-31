import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    pageSize: 6,
    category: 'general',
    country: 'in',
    searchQuery: ''
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
    searchQuery: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async updateNews() {
    this.setState({ loading: true });

    let url = '';
    if (this.props.searchQuery.trim() !== '') {
      url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=1f775c34087942ea9fc53aa949dbf054&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f775c34087942ea9fc53aa949dbf054&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false
    });
  }

  componentDidMount() {
    this.updateNews();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country ||
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.setState({ page: 1 }, this.updateNews);
    }
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    const { category, country, searchQuery, pageSize } = this.props;

    return (
      <div className="container my-3">
        <h2 className="text-center mb-4">
          {searchQuery
            ? `Results for "${searchQuery}"`
            : `Top ${category.charAt(0).toUpperCase() + category.slice(1)} News (${country.toUpperCase()})`}
        </h2>

        {loading && <Spinner />}

        <div className="row">
          {!loading && articles.length > 0 && articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title ? element.title.slice(0, 45) : ''}
                description={element.description ? element.description.slice(0, 88) : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>

        {!loading && articles.length === 0 && (
          <div className="text-center text-muted my-5">
            <h5>No articles found.</h5>
          </div>
        )}

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
