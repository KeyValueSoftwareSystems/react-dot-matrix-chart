import React from "react";

import { useDotMatrix } from "./custom-hooks/useDotMatrix";
import { getLegendPosition, getStyles } from "./utils/utils";
import {
  DEFAULT_COLUMNS,
  DEFAULT_GAP,
  DEFAULT_LEGEND_POSITION,
  DEFAULT_ROWS,
  Elements
} from "./constants";
import { DotMatrixPropType } from "./types";
import Chart from "./Chart";
import Legend from "./Legend";
import useChartContainerWidth from "./custom-hooks/useChartContainerWidth";
import classes from "./styles.module.scss";

const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    dataPoints,
    dimensions = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS
    },
    spaceBetweenDots = DEFAULT_GAP,
    styles = {},
    showLegend = false,
    legendPosition = DEFAULT_LEGEND_POSITION
  } = props;

  const width = useChartContainerWidth("dots-container", [
    showLegend,
    legendPosition,
    dimensions.rows,
    dimensions.columns,
    spaceBetweenDots
  ]);

  const [dotsToBeMapped, totalDots, fractionalDots] = useDotMatrix(
    dataPoints,
    dimensions
  );

  return (
    <div className={classes.container}>
      <div
        className={classes.dotsWithLegend}
        style={{
          ...getStyles(Elements.Container, styles),
          ...(getLegendPosition(legendPosition) as React.CSSProperties)
        }}
      >
        <div className={classes.chartContainer} id="dots-container">
          <Chart
            styles={styles}
            dimensions={dimensions}
            dotsToBeMapped={dotsToBeMapped}
            total={totalDots}
            width={width}
            fractionalDots={fractionalDots}
            spaceBetweenDots={spaceBetweenDots}
          />
        </div>
        {showLegend && <Legend styles={styles} data={dotsToBeMapped} />}
      </div>
    </div>
  );
};

export default DotMatrix;
