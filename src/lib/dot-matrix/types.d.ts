export interface DataPointType {
  name: string;
  count: number;
  color?: string;
}
export interface ChartProps {
  dimensions?: DimensionProp;
  styles: StyleProp;
  dotsToBeMapped: DataPointType[];
  fractionalDots: number[];
  total: number;
  width: number;
  spaceBetweenDots: number;
}

export type DimensionProp = {
  rows?: number;
  columns?: number;
};

export type StyleProp = {
  Dot?: () => {};
  DotsContainer?: () => {};
  Container?: () => {};
  LegendContainer?: () => {};
  LegendName?: () => {};
  LegendDot?: () => {};
};

export interface LegendProps {
  styles: StyleProp;
  data: DataPointType[];
}

export interface DotMatrixPropType {
  dataPoints: DataPointType[];
  dimensions?: DimensionProp;
  spaceBetweenDots?: number;
  showLegend?: boolean;
  legendPosition?:
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  styles?: StyleProp;
}
