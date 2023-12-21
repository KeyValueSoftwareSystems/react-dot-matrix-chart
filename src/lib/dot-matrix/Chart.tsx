import React, { useMemo } from "react";

import { getGradient, getStyles } from "./utils/utils";
import { DEFAULT_COLUMNS, DEFAULT_DOT_WIDTH, Elements } from "./constants";
import { ChartProps, DotsType } from "./types";
import classes from "./styles.module.scss";

const Chart = (props: ChartProps): JSX.Element => {
  const {
    dimensions = {},
    styles,
    dotsToBeMapped,
    width,
    spaceBetweenDots
  } = props;

  const { columns = DEFAULT_COLUMNS } = dimensions;

  const dotWidth = useMemo(
    () => (width ? width / columns - spaceBetweenDots : DEFAULT_DOT_WIDTH),
    [width, columns, spaceBetweenDots]
  );

  return (
    <div
      className={classes.dotsContainer}
      style={{
        gap: `${spaceBetweenDots}px`,
        ...getStyles(Elements.DotsContainer, styles)
      }}
    >
      {dotsToBeMapped?.map((dataItem: DotsType, rowIndex: number) => (
        <React.Fragment key={`${dataItem.id}-${rowIndex}`}>
          {[...Array(dataItem.count)].map((item: null, columnIndex: number) => (
            <div
              id="dot-matrix-dots"
              key={`${dataItem.id}-${rowIndex}-${columnIndex}`}
            >
              <div
                className={classes.eachDot}
                style={{
                  backgroundColor: dataItem?.color,
                  backgroundImage:
                    Array.isArray(dataItem.gradientColors) &&
                    Array.isArray(dataItem.gradientPercentage)
                      ? getGradient(
                        dataItem.gradientColors,
                        dataItem.gradientPercentage
                      )
                      : "",
                  width: `${dotWidth}px`,
                  height: `${dotWidth}px`,
                  ...getStyles(Elements.Dot, styles)
                }}
                id={`each-category-${rowIndex}-${columnIndex}`}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
export default Chart;
