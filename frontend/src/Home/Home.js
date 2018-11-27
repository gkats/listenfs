import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { index as indexArtists } from '../Artists/actions';
import Search from '../Search/Search';
import Artists from '../Artists/Artists';

const searchShortcut = '/';

class Home extends Component {
  constructor() {
    super();
    this.state = { isSearchFocused: false };
    this.keyPressed = this.keyPressed.bind(this);
  }

  componentDidMount() {
    this.props.indexArtists();
    document.addEventListener('keydown', this.keyPressed);
  }

  componentWillUmount() {
    document.removeEventListener('keydown', this.keyPressed);
  }

  keyPressed(e) {
    if (e.key && e.key === searchShortcut && !this.state.isSearchFocused) {
      e.preventDefault();
      this.setState({ isSearchFocused: true });
    }
  }

  render() {
    return (
      <div onKeyPress={this.keyPressed}>
        <Search
          action={this.props.indexArtists}
          isFocused={this.state.isSearchFocused}
        />
        <Artists
          isLoading={this.props.isLoading}
          artists={this.props.artists}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => ({
  isLoading: artists.isLoading,
  artists: artists.artists
});

export default connect(
  mapStateToProps,
  { indexArtists }
)(Home);
