export interface IStats {
  [key: string]:
    | {
        [key: string]: number | [number, number]
      }
    | number
}
