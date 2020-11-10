import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';
import { Header } from '@nxegghead/store/ui-shared';
import { formatRating } from '@nxegghead/store/util-formatters';
import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import './app.scss';

export const App = () => {
  const history = useHistory();
  const [state, setState] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });

    fetch('/api/games')
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
  }, []);

  return (
    <>
      <Header />
      <div className="container">
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
