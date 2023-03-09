import React from "react";
import { v4 } from 'uuid';
import classes from './styles.module.scss';
import { DotMatrixPropType, DataPointType } from "./types";
import { useDotMatrix } from './custom-hooks/useDotMatrix';
import {
  Elements,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS
} from "./constants";
import { getNumberOfDots, getContainerWidth } from './utils/utils';
const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    dataPoints,
    dimensions = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS
    },
    styles = {}
  } = props;

  const {
    rows = DEFAULT_ROWS,
    columns = DEFAULT_ROWS
  } = dimensions;

  const [data, total, overlappingValues] = useDotMatrix(dataPoints, dimensions);
  const getStyles = (element: Elements): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle();
    }
    return {};
  };


  return (
    <div className={classes.container}>
      <div
        className={classes.dotsContainer}
        style={{
          width: `${getContainerWidth(columns)}rem`,
          ...getStyles(Elements.Container)
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
    </div>
  )
};

export default DotMatrix;