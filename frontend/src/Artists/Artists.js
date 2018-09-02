import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { index } from './actions';
import Link from '../Link/Link';
import Loader from '../Loader/Loader';
import css from './Artists.css';

class Artists extends Component {
  componentDidMount() {
    this.props.index();
  }

  render() {
    return (
      <div class={css.wrapper}>
        {this.props.isLoading ? (
          <Loader visible={this.props.isLoading} />
        ) : this.props.artists.length ? (
          <div class={css.artistList}>
            {this.props.artists.map(a => (
              <div key={a} class={css.artistListItem}>
                <Link
                  href={`#/artists/${a}`}
                  relative={true}
                  className={css.artistsLink}
                >
                  {a}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div class={css.noneFound}>No artists found.</div>
        )}
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
  { index }
)(Artists);
