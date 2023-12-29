import React from "react";

import { getStyles } from "./utils/utils";
import { DotsType, LegendProps } from "./types";
import { Elements } from "./constants";
import classes from "./styles.module.scss";

const Legend = (props: LegendProps): JSX.Element => {
  const { styles, data } = props;

  return (
    <div
      id="legend-container"
      className={classes.legends}
      style={{ ...getStyles(Elements.LegendContainer, styles) }}
    >
      {data?.map((point: DotsType, index) => (
        <div className={classes.legend} key={`${point.name}-${index}`}>
          <div
            className={classes.legendDot}
            style={{
              backgroundColor: point.color || (point.gradientColors && point.gradientColors[0]),
              ...getStyles(Elements.LegendDot, styles)
            }}
          />
          <div
            className={classes.name}
            style={{ ...getStyles(Elements.LegendName, styles) }}
          >
            {point.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
