import { useState, useEffect } from "react";
import { DataPointType } from '../types';
import { COLOR_PALATTE } from '../constants';

export const useDotMatrix = (dataPoints: DataPointType[]): [DataPointType[], number] => {
  const [data, setData] = useState<DataPointType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const isColorPresent = (color: string, dataValues: DataPointType[] = []): boolean => {
    const findColor = dataPoints?.find((e) => e.color === color);
    const colorInLocal = dataValues?.find((e) => e.color === color);
    return Boolean(findColor) || Boolean(colorInLocal);
  }

  useEffect(() => {
    if (dataPoints) {
      const values = [...(data || [])];
      let totalVal = 0
      let colorIndex = 0;
      dataPoints.forEach((point: DataPointType, index: number) => {
        totalVal += point.count;
        if (point.color) {
          values.push({ ...point});
        } else {
          let randomColor = ''
          do {
            randomColor = COLOR_PALATTE[colorIndex];
            colorIndex++;
          } while (isColorPresent(randomColor, values))
          values.push({ ...point, color: randomColor})
        }
        if (index === dataPoints.length - 1) {
          setData(values);
          setTotal(totalVal);
        }
      })
    }
  }, [dataPoints]);

  return [data, total];
}