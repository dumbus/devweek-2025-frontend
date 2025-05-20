import { Grid, GridItem } from '@consta/uikit/Grid';
import { Layout } from '@consta/uikit/Layout';
import { Tag } from '@consta/uikit/Tag';
import { Text } from '@consta/uikit/Text';

import { generateSinglePostData } from 'shared/utils';

import { ISinglePost } from '../model/types';

import styles from './SinglePost.module.scss';

// TODO: Button "Generate"
// TODO: Popover with settings for generation
export const SinglePost = ({ postId }: ISinglePost) => {
  const { title, date, source, sourceUrl, description, previewImageUrl } = generateSinglePostData(postId);

  return (
    <Layout className="container">
      <Grid cols={5} colGap="2xl" rowGap="xl" className={styles.post}>
        <GridItem col={2}>
          <img className={styles.post__image} src={previewImageUrl} alt="Картинка для новости" />
        </GridItem>

        <GridItem col={3} className={styles.post__info}>
          <Text view="brand" size="2xl" weight="bold" lineHeight="xs">
            {title}
          </Text>

          <Layout direction="column" className={styles.post__infoAbout}>
            <Layout className={styles.post__date}>
              <Text size="l">Дата публикации новости: </Text>
              <Tag mode="info" size="l" label={date} />
            </Layout>

            <Layout className={styles.post__source}>
              <Text size="l">Источник: </Text>
              <Tag mode="info" size="l" label={source} />
            </Layout>

            <Layout direction="column">
              <Text size="l">Полный текст новости доступен по ссылке:</Text>
              <Text size="l">
                <a href={sourceUrl} className={styles.post__link} target="_blank" rel="noreferrer">
                  {sourceUrl}
                </a>
              </Text>
            </Layout>
          </Layout>
        </GridItem>

        <GridItem col={5}>
          <Text size="l">{description}</Text>
        </GridItem>
      </Grid>
    </Layout>
  );
};
