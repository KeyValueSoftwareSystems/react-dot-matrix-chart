import React from "react";
import classes from './styles.module.scss';
import { DotMatrixPropType } from "./types";
import { useDotMatrix } from './custom-hooks/useDotMatrix';
import Chart from './Chart';
import Legend from './Legend';
import {
  Elements,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
  DEFAULT_LEGEND_POSITION
} from "./constants";
const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    dataPoints,
    dimensions = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS
    },
    styles = {},
    showLegend,
    legendPosition = DEFAULT_LEGEND_POSITION
  } = props;

  const [data, total, overlappingValues] = useDotMatrix(dataPoints, dimensions);
  const getStyles = (element: Elements): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle();
    }
    return {};
  };


  const getLegendPosition = (): {flexDirection: string, alignItems: string} => {
    let flexDirection = '';
    let alignItems = 'end';
    switch (legendPosition) {
    case 'left':
      flexDirection = 'row-reverse';
      break;
    case 'right':
      flexDirection = 'row';
      break;
    case 'top':
      flexDirection = 'column-reverse';
      alignItems = 'center';
      break;
    case 'bottom':
      flexDirection = 'column';
      alignItems = 'center';
      break;
    default:
      flexDirection = 'row'
      break;
    }
    return { flexDirection, alignItems};
  }
  return (
    <div className={classes.container}>
      <div
        className={classes.dotsWithLegend}
        style={{
          ...getStyles(Elements.Container),
          ...(getLegendPosition() as React.CSSProperties)
        }}
      >
        <Chart
          getStyles={getStyles}
          dimensions={dimensions}
          data={data}
          total={total}
          overlappingValues={overlappingValues}
        />
        {showLegend && (
          <Legend
            getStyles={getStyles}
            data={data}
          />
        )}
      </div>
    </div>
  )
};

export default DotMatrix;