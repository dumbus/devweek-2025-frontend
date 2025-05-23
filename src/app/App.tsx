import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { PostsPage, SinglePostPage, GeneratePostPage, HeaderPage, Page404 } from 'pages';

import 'styles/styles.scss';

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <BrowserRouter>
        <HeaderPage />

        <Routes>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<SinglePostPage />} />
          <Route path="/posts/generation" element={<GeneratePostPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  );
};

export default App;
