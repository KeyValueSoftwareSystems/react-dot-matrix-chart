import React, { useMemo } from 'react';
import { v4 } from 'uuid';
import {
  getNumberOfDots,
  getStyles,
  hasOverlapping
} from './utils/utils';
import {
  Elements,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
  DEFAULT_ROW_WIDTH,
  DEFAULT_ROW_GAP
} from './constants';
import { ChartProps, DataPointType } from './types';
import classes from './styles.module.scss';

const Chart = (props: ChartProps) : JSX.Element => {
  const {
    dimensions = {},
    styles,
    data,
    overlappingValues,
    total,
    width
  } = props;
  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_COLUMNS
  } = dimensions;

  const dotWidth = useMemo(
    () => (width ? width / columns - DEFAULT_ROW_GAP : DEFAULT_ROW_WIDTH),
    [width]
  );
  return (
    <div
      className={classes.dotsContainer}
      style={{
        ...getStyles(Elements.DotsContainer, styles)
      }}
    >
      {data?.map((dataItem: DataPointType, rowIndex: number) => (
        <React.Fragment key={v4()}>
          {dataItem && Array.apply(null, Array(getNumberOfDots(dataItem, rows, columns, total))).map((item: null, columnIndex: number) => (
            <div id="dot-matrix-dots" key={v4()}>
              {(hasOverlapping(overlappingValues, rowIndex, columnIndex) && (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      data[rowIndex - 1].color
                    } 20%, ${dataItem?.color} 50%)`,
                    width: `${dotWidth}px`,
                    height: `${dotWidth}px`,
                    ...getStyles(Elements.Dot, styles)
                  }}
                />
              )) || (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundColor: dataItem?.color,
                    width: `${dotWidth}px`,
                    height: `${dotWidth}px`,
                    ...getStyles(Elements.Dot, styles)
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
  );
};
export default Chart;
