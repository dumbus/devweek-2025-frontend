import classNames from 'classnames';

import { Layout } from '@consta/uikit/Layout';

import { CustomError } from 'features';

import styles from './Page404.module.scss';

export const Page404 = () => {
  return (
    <Layout className={classNames('container', 'containerBlock', styles.wrapper)}>
      <CustomError errorType="not-found" />
    </Layout>
  );
};
