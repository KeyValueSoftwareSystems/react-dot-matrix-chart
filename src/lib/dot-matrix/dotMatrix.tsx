import React, { useState, useEffect } from "react";
import { v4 } from 'uuid';
import classes from './styles.module.scss';
import { DotMatrixPropType, DataPointType } from "./types";
import { COLOR_PALATTE, Elements } from "./constants";

const DotMatrix = (props: DotMatrixPropType): JSX.Element => {
  const {
    title,
    dataPoints,
    rows = 5,
    columns = 12,
    styles = {}
  } = props;
  const [data, setData] = useState<DataPointType[]>([]);
  const [totalVal, setTotal] = useState<number>(0);

  const [partialVal, setPartialVal] = useState<number[]>([]);
  const getStyles = (element: Elements): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle();
    }
    return {};
  };
  useEffect(() => {
    if (dataPoints) {
      const values = [...(data || [])];
      let total = 0
      let colorIndex = 0;
      dataPoints.map((point: DataPointType, indexVal) => {
        total += point.count;
        if (point.colorPreference) {
          values.push({ ...point});
        } else {
          let randomColor = ''
          do {
            randomColor = COLOR_PALATTE[colorIndex];
            colorIndex++;
          } while (randomColorPresent(randomColor, values))
          values.push({ ...point, colorPreference: randomColor})
        }
        if (indexVal === dataPoints.length - 1) {
          setTotal(total);
          setData(values);
        }
      })
    }
  }, [dataPoints]);

  useEffect(() => {
    const partial: Array<number> = [];
    if (totalVal) {
      data?.map((each: DataPointType, i: number) => {
        partial.push(getPartialDots(each, totalVal));
        if (i === data?.length - 1) setPartialVal(partial);
      })
    }
  }, [totalVal]);
  const randomColorPresent = (color: string, dataValues: DataPointType[] = []): boolean => {
    const findColor = dataPoints?.find((e) => e.colorPreference === color);
    const colorInLocal = dataValues?.find((e) => e.colorPreference === color);
    return Boolean(findColor) || Boolean(colorInLocal);
  }

  const getNumberOfDots = (point: DataPointType): number =>  {
    const percentage = point.count / totalVal;
    const dots = percentage * rows * columns;
    const returnVal = Math.floor(dots);
    return returnVal;
  }
  const getPartialDots = (point: DataPointType, total: number): number => {
    const percentage = point.count / total;
    return percentage * rows * columns - getNumberOfDots(point);
  }

  const getWidth = (): number => columns * 41;

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
            {Array.apply(null, Array(getNumberOfDots(eachPoint))).map((e: null, i: number) => (
              (i === 0 && index > 0 && partialVal[index - 1] < 1 && partialVal[index - 1] !== 0 && (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${data[index - 1].colorPreference} 20%, ${eachPoint?.colorPreference} 50%)`,
                    ...(getStyles(Elements.Dot))
                  }}
                />
              )) || (
                <div
                  className={classes.eachDot}
                  style={{
                    backgroundColor: eachPoint?.colorPreference,
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