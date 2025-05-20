import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { Posts } from 'pages/posts';

import 'styles/styles.scss';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <Posts />
    </Theme>
  );
};

export default App;
