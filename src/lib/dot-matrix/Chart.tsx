import React from 'react';
import { v4 } from 'uuid';
import { getNumberOfDots, getContainerWidth } from './utils/utils';
import {
  Elements,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS
} from "./constants";
import { ChartProps, DataPointType } from './types';
import classes from './styles.module.scss';

const Chart = (props: ChartProps) : JSX.Element => {
  const {
    dimensions = {},
    getStyles,
    data,
    overlappingValues,
    total
  } = props;
  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_COLUMNS
  } = dimensions;
  return (
    <div
      className={classes.dotsContainer}
      style={{
        width: `${getContainerWidth(columns)}rem`,
        ...getStyles(Elements.DotsContainer)
      }}
    >
      {data?.map((eachPoint: DataPointType, rowIndex: number) => (
        <React.Fragment key={v4()}>
          {eachPoint && Array.apply(null, Array(getNumberOfDots(eachPoint, rows, columns, total))).map((item: null, columnIndex: number) => (
            <div id="dot-matrix-dots" key={v4()}>
              {(columnIndex === 0 && rowIndex > 0 && overlappingValues[rowIndex - 1] < 1 && overlappingValues[rowIndex - 1] !== 0 && (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${data[rowIndex - 1].color} 20%, ${eachPoint?.color} 50%)`,
                    ...(getStyles(Elements.Dot))
                  }}
                />
              )) || (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundColor: eachPoint?.color,
                    ...(getStyles(Elements.Dot))
                  }}
                  key={v4()}
                  id={`each-category-${rowIndex}-${columnIndex}`}
                />
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
};
export default Chart;