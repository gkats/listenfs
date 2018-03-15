import { h } from 'preact';
import { relativePath } from '../router';

const Link = ({ className, children, href, relative }) => (
  <a href={relative ? relativePath(href) : href} className={className}>
    {children}
  </a>
);

export default Link;
