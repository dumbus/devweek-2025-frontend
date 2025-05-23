import { useNavigate } from 'react-router-dom';

import { Button } from '@consta/uikit/Button';
import { Layout } from '@consta/uikit/Layout';
import { ResponsesConnectionError } from '@consta/uikit/ResponsesConnectionError';
import { ResponsesEmptyBox } from '@consta/uikit/ResponsesEmptyBox';
import { Responses404 } from '@consta/uikit/Responses404';
import { IconHome } from '@consta/icons/IconHome';

import {
  DEFAULT_ERROR_TITLE,
  DEFAULT_ERROR_MESSAGE,
  EMPTY_DATA_ERROR_MESSAGE,
  GENERATION_ERROR_TITLE,
  GENERATION_ERROR_MESSAGE
} from '../model/constants';
import { ICustomError } from '../model/types';

import styles from './CustomError.module.scss';

export const CustomError = ({ errorType, message, hasReturnButton = true, customButton }: ICustomError) => {
  const navigate = useNavigate();

  const returnButton = hasReturnButton ? (
    <Button
      className={styles.post__button}
      label="Вернуться на главную"
      iconLeft={IconHome}
      onClick={() => navigate('/posts')}
    />
  ) : (
    <></>
  );

  return (
    <Layout className={styles.wrapper}>
      {errorType === 'default' && (
        <ResponsesConnectionError
          title={DEFAULT_ERROR_TITLE}
          description={message || DEFAULT_ERROR_MESSAGE}
          actions={returnButton}
        />
      )}

      {errorType === 'empty-data' && (
        <ResponsesEmptyBox description={message || EMPTY_DATA_ERROR_MESSAGE} actions={returnButton} />
      )}

      {errorType === 'not-found' && <Responses404 actions={returnButton} />}

      {errorType === 'generation-error' && (
        <ResponsesConnectionError
          title={GENERATION_ERROR_TITLE}
          description={GENERATION_ERROR_MESSAGE}
          actions={customButton}
        />
      )}
    </Layout>
  );
};
