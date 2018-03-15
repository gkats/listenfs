import { h } from 'preact';
import Link from '../Link/Link';

const NotFound = () => (
  <div>
    <h1>Oops!</h1>
    <h2>We can't seem to find page you're looking for.</h2>

    <div>Error code: 404</div>
    <div>
      You can try going back to the app's&nbsp;
      <Link href="/" relative={true}>
        Home page
      </Link>
      &nbsp;and navigate your way through there.
    </div>
  </div>
);

export default NotFound;
