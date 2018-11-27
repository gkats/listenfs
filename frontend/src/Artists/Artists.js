import { h, Component } from 'preact';
import { artistPath } from '../router';
import Link from '../Link/Link';
import Loader from '../Loader/Loader';
import css from './Artists.css';

class Artists extends Component {
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
                  href={artistPath(a)}
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

Artists.defaultProps = {
  isLoading: false,
  artists: []
};

export default Artists;
