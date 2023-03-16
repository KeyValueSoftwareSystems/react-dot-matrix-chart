import { useState, useEffect } from 'react';
import { findContainerWidth } from '../utils/utils';

const useChartContainerWidth = (
  id: string,
  dependencyArray: Array<boolean | string>
): number => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    updateContainerWidth();
  }, []);

  useEffect(() => {
    updateContainerWidth();
  }, [...dependencyArray]);

  window.onresize = (): void => {
    updateContainerWidth();
  };

  const updateContainerWidth = (): void => {
    const widthValue = findContainerWidth(id);
    if (widthValue) setWidth(widthValue);
  };
  return width;
};

export default useChartContainerWidth;
