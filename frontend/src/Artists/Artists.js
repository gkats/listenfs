import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { index } from './actions';
import Link from '../Link/Link';

class Artists extends Component {
  componentDidMount() {
    this.props.index();
  }

  render({ artists, isLoading }) {
    return (
      <div>
        {isLoading ? (
          <div>Loading artists...</div>
        ) : artists.length ? (
          artists.map(a => (
            <div>
              <Link href={`#/artists/${a}`} relative={true}>
                {a}
              </Link>
            </div>
          ))
        ) : (
          <div>No artists found.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => ({
  isLoading: artists.isLoading,
  artists: artists.artists
});

export default connect(mapStateToProps, { index })(Artists);
