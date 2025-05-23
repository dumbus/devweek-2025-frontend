import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { PostsPage, SinglePostPage, GeneratePostPage } from 'pages';

import 'styles/styles.scss';

// TODO: Header with menu
const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<SinglePostPage />} />
          <Route path="/posts/generate" element={<GeneratePostPage />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
