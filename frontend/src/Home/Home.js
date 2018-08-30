import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { index as indexArtists } from '../Artists/actions';
import Search from '../Search/Search';
import Artists from '../Artists/Artists';

class Home extends Component {
  componentDidMount() {
    this.props.indexArtists();
  }

  render() {
    return (
      <div>
        <Search action={this.props.indexArtists} />
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
