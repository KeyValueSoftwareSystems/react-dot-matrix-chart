import React from 'react';
import { v4 } from 'uuid';
import {
  getNumberOfDots,
  getContainerWidth,
  getStyles
} from './utils/utils';
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
    styles,
    data,
    overlappingValues,
    total
  } = props;
  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_COLUMNS
  } = dimensions;

  const hasOverlapping = (values: number[], indexRow: number, indexColumn: number): boolean => (
    indexColumn === 0 && indexRow > 0 && values[indexRow - 1] < 1 && values[indexRow - 1] !== 0
  );
  return (
    <div
      className={classes.dotsContainer}
      style={{
        width: `${getContainerWidth(columns)}rem`,
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
                    backgroundImage: `linear-gradient(to right, ${data[rowIndex - 1].color} 20%, ${dataItem?.color} 50%)`,
                    ...(getStyles(Elements.Dot, styles))
                  }}
                />
              )) || (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundColor: dataItem?.color,
                    ...(getStyles(Elements.Dot, styles))
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