import { useMemo} from "react";
import { DataPointType } from '../types';
import { COLOR_PALATTE } from '../constants';

export const useDotMatrix = (dataPoints: DataPointType[], dimensions: { rows?: number, columns?: number }): [DataPointType[], number, number[]] => {

  const isColorPresent = (color: string, dataValues: DataPointType[] = []): boolean => {
    const findColor = dataPoints?.find((e) => e.color === color);
    const colorInLocal = dataValues?.find((e) => e.color === color);
    return Boolean(findColor) || Boolean(colorInLocal);
  }

  const [data, total] = useMemo(() => {
    const values: DataPointType[] = [];
    let totalVal = 0
    if (dataPoints) {
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
      })
    }
    return [values, totalVal]
  }, [dataPoints]);

  const partialVal: number[] = useMemo(() => {
    const partial: Array<number> = [];
    if (total) {
      data?.forEach((each: DataPointType) => {
        const { rows = 5, columns = 12 } = dimensions;
        const percentage = each.count / total;
        const partialDots = percentage * rows * columns;
        const value = partialDots - Math.floor(partialDots);
        partial.push(value);
      })
    }
    return partial;
  }, [total]);
  return [data, total, partialVal];
}