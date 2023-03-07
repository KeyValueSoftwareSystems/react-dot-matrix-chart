import React, { useState, useEffect } from "react";
import { v4 } from 'uuid';
import classes from './styles.module.scss';
import { DotMatrixPropType, DataPointType } from "./types";
import { useDotMatrix } from './custom-hooks/useDotMatrix';
import { Elements } from "./constants";

const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    title,
    dataPoints,
    dimensions = {
      rows: 5,
      columns: 12
    },
    styles = {}
  } = props;

  const [data, total] = useDotMatrix(dataPoints);

  const [partialVal, setPartialVal] = useState<number[]>([]);
  const getStyles = (element: Elements): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle();
    }
    return {};
  };

  useEffect(() => {
    const partial: Array<number> = [];
    if (total) {
      data?.forEach((each: DataPointType, i: number) => {
        partial.push(getPartialDots(each, total));
        if (i === data?.length - 1) setPartialVal(partial);
      })
    }
  }, [total]);

  const getNumberOfDots = (point: DataPointType): number =>  {
    const { rows, columns } = dimensions;
    const percentage = point.count / total;
    const dots = percentage * rows * columns;
    const returnVal = Math.floor(dots);
    return returnVal;
  }
  const getPartialDots = (point: DataPointType, total: number): number => {
    const { rows, columns } = dimensions;
    const percentage = point.count / total;
    return percentage * rows * columns - getNumberOfDots(point);
  }

  const getWidth = (): number => dimensions.columns * 41;

  return (
    <div className={classes.container}>
      {title && (
        <div
          className={classes.title}
          style={getStyles(Elements.Title)}
        >
          {title}
        </div>
      )}
      <div
        className={classes.dotsContainer}
        style={{
          width: `${getWidth()}px`,
          ...getStyles(Elements.Container)
        }}
      >
        {data.map((eachPoint: DataPointType, index: number) => (
          <React.Fragment key={v4()}>
            {Array.apply(null, Array(getNumberOfDots(eachPoint))).map((item: null, columnIndex: number) => (
              (columnIndex === 0 && index > 0 && partialVal[index - 1] < 1 && partialVal[index - 1] !== 0 && (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${data[index - 1].color} 20%, ${eachPoint?.color} 50%)`,
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
                />
              )
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};

export default DotMatrix;