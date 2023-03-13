import React from 'react';
import { v4 } from 'uuid';
import { DataPointType, LegendProps } from "./types";
import {
  Elements
} from './constants';
import classes from './styles.module.scss';

const Legend = (props: LegendProps): JSX.Element => {
  const {
    getStyles,
    data
  } = props;
  return (
    <div
      className={classes.legends}
      style={{ ...getStyles(Elements.LegendContainer)}}
    >
      {data?.map((point: DataPointType) => (
        <div className={classes.legend} key={v4()}>
          <div
            className={classes.legendDot}
            style={{
              backgroundColor: point?.color,
              ...(getStyles(Elements.LegendDot))
            }}
          />
          <div
            className={classes.name}
            style={{ ...getStyles(Elements.LegendName)}}
          >
            {point.name}
          </div>
        </div>
      ))}
    </div>
  )
};

export default Legend;