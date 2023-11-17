import React, { useMemo } from "react";

import { getNumberOfDots, getStyles, hasOverlapping } from "./utils/utils";
import {
  DEFAULT_COLUMNS,
  DEFAULT_DOT_WIDTH,
  DEFAULT_ROWS,
  Elements
} from "./constants";
import { ChartProps, DataPointType } from "./types";
import classes from "./styles.module.scss";

const Chart = (props: ChartProps): JSX.Element => {
  const {
    dimensions = {},
    styles,
    dotsToBeMapped,
    fractionalDots,
    total,
    width,
    spaceBetweenDots
  } = props;

  const { rows = DEFAULT_ROWS, columns = DEFAULT_COLUMNS } = dimensions;

  const dotWidth = useMemo(
    () => (width ? width / columns - spaceBetweenDots : DEFAULT_DOT_WIDTH),
    [width]
  );

  return (
    <div
      className={classes.dotsContainer}
      style={{
        gap: `${spaceBetweenDots}px`,
        ...getStyles(Elements.DotsContainer, styles)
      }}
    >
      {dotsToBeMapped?.map((dataItem: DataPointType, rowIndex: number) => (
        <React.Fragment key={`${dataItem.name}-${rowIndex}`}>
          {dataItem &&
            [...Array(getNumberOfDots(dataItem, rows, columns, total))].map(
              (item: null, columnIndex: number) => (
                <div id="dot-matrix-dots" key={`${dataItem.name}-${rowIndex}-${columnIndex}`}>
                  {hasOverlapping(fractionalDots, rowIndex, columnIndex) ? (
                    <div
                      className={classes.eachDot}
                      style={{
                        backgroundImage: `linear-gradient(to right, ${
                          dotsToBeMapped[rowIndex - 1].color
                        } 20%, ${dataItem?.color} 50%)`,
                        width: `${dotWidth}px`,
                        height: `${dotWidth}px`,
                        ...getStyles(Elements.Dot, styles)
                      }}
                    />
                  ) : (
                    <div
                      className={classes.eachDot}
                      style={{
                        backgroundColor: dataItem?.color,
                        width: `${dotWidth}px`,
                        height: `${dotWidth}px`,
                        ...getStyles(Elements.Dot, styles)
                      }}
                      id={`each-category-${rowIndex}-${columnIndex}`}
                    />
                  )}
                </div>
              )
            )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default Chart;
