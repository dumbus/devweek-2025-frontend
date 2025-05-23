import { Layout } from '@consta/uikit/Layout';
import { Loader } from '@consta/uikit/Loader';

import styles from './CustomLoader.module.scss';

export const CustomLoader = () => {
  return (
    <Layout className={styles.wrapper}>
      <Loader type="circle" size="m" />
    </Layout>
  );
};
