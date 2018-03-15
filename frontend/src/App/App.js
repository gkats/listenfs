import { h } from 'preact';
import router from '../router';

const App = ({ path }) => {
  const { Component, props } = router(path);

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default App;
