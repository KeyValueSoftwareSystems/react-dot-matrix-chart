import React, { useEffect, useState } from "react";
import classes from './styles.module.scss';
import { DotMatrixPropType } from "./types";
import { useDotMatrix } from './custom-hooks/useDotMatrix';
import Chart from './Chart';
import Legend from './Legend';
import { getLegendPosition, getStyles, findContainerWidth } from "./utils/utils";
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

  const [width, setWidth] = useState<number>(0);
  const [data, total, overlappingValues] = useDotMatrix(dataPoints, dimensions);

  useEffect(() => {
    findChartContainerWidth();
  }, []);
  useEffect(() => {
    findChartContainerWidth();
  }, [showLegend, legendPosition]);
  const findChartContainerWidth = (): void => {
    const widthValue = findContainerWidth('dots-container');
    if (widthValue) setWidth(widthValue);
  }
  window.onresize = (): void => {
    findChartContainerWidth();
  };
  return (
    <div
      className={classes.container}
    >
      <div
        className={classes.dotsWithLegend}
        style={{
          ...getStyles(Elements.Container, styles),
          ...(getLegendPosition(legendPosition) as React.CSSProperties)
        }}
      >
        <div id="dots-container">
          <Chart
            styles={styles}
            dimensions={dimensions}
            data={data}
            total={total}
            width={width}
            overlappingValues={overlappingValues}
          />
        </div>
        {showLegend && (
          <div>
            <Legend
              styles={styles}
              data={data}
            />
          </div>
        )}
      </div>
    </div>
  )
};

export default DotMatrix;