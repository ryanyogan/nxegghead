import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { Game } from '@nxegghead/api/util-interfaces';
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';
import { Header } from '@nxegghead/store/ui-shared';
import { formatRating } from '@nxegghead/store/util-formatters';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import './app.scss';

export const App = () => {
  const history = useHistory();
  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState((s) => ({
      ...s,
      loadingState: 'loading',
    }));

    fetch('/api/games')
      .then((x) => x.json())
      .then((res) => {
        setState((s) => ({
          ...s,
          data: res,
          loadingState: 'success',
        }));
      })
      .catch(() => {
        setState((s) => ({
          ...s,
          loadingState: 'error',
        }));
      });
  }, []);

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className="container" data-testid="app-container">
        <div className="games-layout">
          {state.loadingState === 'loading'
            ? 'Loading...'
            : state.loadingState === 'error'
            ? '<div>Error</div>'
            : state.data.map((x) => (
                <Card
                  key={x.id}
                  className="game-card"
                  onClick={() => history.push(`/games/${x.id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      className="game-card-media"
                      image={x.image}
                      title={x.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {x.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {x.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="game-rating"
                      >
                        <strong>Rating:</strong> {formatRating(x.rating)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
        </div>
      </div>

      <Route path="/games/:id" component={StoreFeatureGameDetail} />
    </>
  );
};

export default App;
