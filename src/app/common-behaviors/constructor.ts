
/*
Generic constructor for Regular Classes where-
@param T - represents type of instance that constructor creates
*/

export type Constructor<T = {}> = new (...args: any[]) => T;

/*
Generic constructor for Regular Classes where-
@param T - represents type of instance that constructor creates
*/
export type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;
