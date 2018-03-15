import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { show } from './actions';
import Link from '../Link/Link';

class Artist extends Component {
  componentDidMount() {
    this.props.show(this.props.route.name);
  }

  render() {
    return (
      <div>
        <h1>{this.props.route.name}</h1>
        <div>
          {this.props.isLoading ? (
            <div>Loading albums...</div>
          ) : this.props.albums.length ? (
            this.props.albums.map(a => (
              <div>
                <Link
                  href={`#/albums/${this.props.route.name}/${a}`}
                  relative={true}
                >
                  {a}
                </Link>
              </div>
            ))
          ) : (
            <div>No albums found.</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => ({
  isLoading: artists.isLoading,
  albums: artists.albums
});

export default connect(mapStateToProps, { show })(Artist);
