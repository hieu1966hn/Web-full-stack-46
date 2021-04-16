import React, { Component } from 'react';
import axios from 'axios';

const styleInline = { marginRight: 10 };

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      offset: 0
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }


  handleScroll = () => {
    // check con lan chuot o bottom man hinh
    // get func => de get them du lieu
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      console.log("bottom of page");
      this.setState(prevState => {
        return ({
          offset: prevState.offset + 25
        }
        )
      }, () => {
        this.handleSearchImage(this.state.keyword, this.state.offset)
      })
      // goi function de get data
      // fetchData(keyword, offset)

    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }


  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    // send HTTP request len server Gifphy
    const { keyword } = this.state;
    const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=10&offset=${0}&rating=g&lang=vi`;

    this.props.changeLoading(true);

    const res = await axios.get(urlAPI);
    // NOTE: ket qua tra ve can dung thi nam trong res.data
    console.log(res);
    // POINT: cần thay đổi state của comp cha => cha truyền props dạng function xuống
    const newImages = res.data.data.map(image => ({
      imageUrl: image.images.downsized_medium.url,
      description: image.title
    }));
    // Chạy function changeImages => cha truyền xuống => this.setState của thằng cha
    // this.props.changeLoading(false)
    this.props.changeImages(newImages);
  }


  handleSearchImage = async (keyword, offset =0) => {
    this.props.changeLoading(true);
    const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=10&offset=${0}&rating=g&lang=vi`;
    const res = await axios.get(urlAPI);

    const newImages = res.data.data.map(image => ({
      imageUrl: image.images.downsized_medium.url,
      description: image.title
    }));

    this.props.changeImages(newImages, offset)
  }

  handleChangeForm = (event) => {
    this.setState({ keyword: event.target.value });
  };

  renderButton = () => {
    if (this.state.keyword.trim().length > 0) {
      return (
        <button
          className={
            this.state.keyword.length === 1
              ? 'btn btn-primary'
              : 'btn btn-warning'
          }
        >
          Search
        </button>
      );
    }
    return <button disabled>Disable</button>;
  };

  render() {
    return (
      <form className="form d-flex" onSubmit={this.handleSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={this.state.keyword}
          onChange={this.handleChangeForm}
          style={styleInline}
        />
        {this.renderButton()}
      </form>
    );
  }
}

export default SearchForm;