import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { Posts, SinglePost } from 'pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'styles/styles.scss';

// TODO: Header with menu
const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
