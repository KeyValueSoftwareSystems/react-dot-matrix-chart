export interface DataPointType {
  name: string,
  count: number,
  colorPreference?: string,
  partialVal? : number
}

export interface DotMatrixPropType {
  title?: string,
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

