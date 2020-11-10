import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './store-feature-game-detail.scss';

type TParams = { id: string };

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  return (
    <div className="container">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.match.params.id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default StoreFeatureGameDetail;
