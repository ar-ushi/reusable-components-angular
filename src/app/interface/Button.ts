export interface Button{
    styles : ButtonStyles,
    label? : string,
}

export interface ButtonStyles{
    position?: string,
    width?: string,
    height?: string,
    backgroundColor?: string,
    color? : string,
    fontFamily?: string,
    fontSize?: string,
    borderRadius?: string,
    padding?: string,
    border?:string
}