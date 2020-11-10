import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { Game } from '@nxegghead/api/util-interfaces';
import { formatRating } from '@nxegghead/store/util-formatters';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './store-feature-game-detail.scss';

type TParams = { id: string };

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  const [state, setState] = useState<{
    data: Game;
    loadingState: 'loading' | 'error' | 'success';
  }>({
    data: null,
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });

    const gameId = props.match.params.id;
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch(() => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  if (state.loadingState === 'loading') {
    return <h1>Loading..</h1>;
  }

  if (state.loadingState === 'error') {
    return <h1>Error</h1>;
  }

  if (state.data == null) {
    return null;
  }

  return (
    <div className="container">
      <Card>
        <CardActionArea>
          <CardMedia
            className="game-card-media"
            image={state.data.image}
            title={state.data.name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.data.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="game-rating"
            >
              <strong>Rating:</strong> {formatRating(state.data.rating)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StoreFeatureGameDetail;
