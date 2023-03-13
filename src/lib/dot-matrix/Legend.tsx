import React from 'react';
import { v4 } from 'uuid';
import { getStyles } from './utils/utils';
import { DataPointType, LegendProps } from "./types";
import {
  Elements
} from './constants';
import classes from './styles.module.scss';

const Legend = (props: LegendProps): JSX.Element => {
  const {
    styles,
    data
  } = props;
  return (
    <div
      className={classes.legends}
      style={{ ...getStyles(Elements.LegendContainer, styles)}}
    >
      {data?.map((point: DataPointType) => (
        <div className={classes.legend} key={v4()}>
          <div
            className={classes.legendDot}
            style={{
              backgroundColor: point?.color,
              ...(getStyles(Elements.LegendDot, styles))
            }}
          />
          <div
            className={classes.name}
            style={{ ...getStyles(Elements.LegendName, styles)}}
          >
            {point.name}
          </div>
        </div>
      ))}
    </div>
  )
};

export default Legend;