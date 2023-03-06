export interface DataPointType {
  name: string,
  count: number,
  colorPreference?: string,
  partialVal? : number
}

export type IStyleFunction = (point: DataPointType, stepIndex: number) => object
export interface DotMatrixPropType {
  title?: string,
  showCategory?: boolean,
  dataPoints: DataPointType[],
  rows?: number,
  columns?: number,
  styles?: {
    dot: () => {},
    title: () => {},
    container: () => {},
    categoryDisplay: () => {},
    eachCategoryDisplay: () => {}
  }
}

