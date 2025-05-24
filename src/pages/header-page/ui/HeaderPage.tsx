import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { IconEdit } from '@consta/icons/IconEdit';
import { IconHome } from '@consta/icons/IconHome';
import { IconWindow } from '@consta/icons/IconWindow';

import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';

import styles from './HeaderPage.module.scss';

export const HeaderPage = () => {
  return (
    <Layout className={styles.wrapper}>
      <Layout className={classNames('container', styles.header)}>
        <Link to="/posts">
          <Button
            label="ИИ-генератор контента"
            className={classNames(styles.header__button, styles.header__buttonLogo)}
            view="secondary"
            iconLeft={IconWindow}
          />
        </Link>

        <Layout className={styles.header__menu}>
          <Link to="/posts">
            <Button label="Главная" className={styles.header__button} view="secondary" iconLeft={IconHome} />
          </Link>

          <Link to="/posts/generation">
            <Button label="Генерация" className={styles.header__button} view="secondary" iconLeft={IconEdit} />
          </Link>
        </Layout>

        <Layout className={styles.header__menuMobile}>
          <Link to="/posts">
            <Button label="Главная" className={styles.header__button} view="secondary" iconLeft={IconHome} onlyIcon />
          </Link>

          <Link to="/posts/generation">
            <Button label="Генерация" className={styles.header__button} view="secondary" iconLeft={IconEdit} onlyIcon />
          </Link>
        </Layout>
      </Layout>
    </Layout>
  );
};
