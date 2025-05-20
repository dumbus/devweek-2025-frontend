import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { Posts, SinglePost } from 'pages';

import 'styles/styles.scss';

// TODO: Routing
// TODO: Header with menu
const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      {/* <Posts /> */}
      <SinglePost postId={1} />
    </Theme>
  );
};

export default App;
