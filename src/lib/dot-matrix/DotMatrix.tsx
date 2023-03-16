import React from 'react';
import classes from './styles.module.scss';
import { DotMatrixPropType } from './types';
import { useDotMatrix } from './custom-hooks/useDotMatrix';
import useChartContainerWidth from './custom-hooks/useChartContainerWidth';
import Chart from './Chart';
import Legend from './Legend';
import { getLegendPosition, getStyles } from './utils/utils';
import {
  Elements,
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
  DEFAULT_LEGEND_POSITION
} from './constants';
const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    dataPoints,
    dimensions = {
      rows: DEFAULT_ROWS,
      columns: DEFAULT_COLUMNS
    },
    styles = {},
    showLegend = false,
    legendPosition = DEFAULT_LEGEND_POSITION
  } = props;

  const width = useChartContainerWidth('dots-container', [
    showLegend,
    legendPosition
  ]);
  const [data, total, overlappingValues] = useDotMatrix(dataPoints, dimensions);

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
            data={data}
            total={total}
            width={width}
            overlappingValues={overlappingValues}
          />
        </div>
        {showLegend && (
          <div>
            <Legend styles={styles} data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DotMatrix;
