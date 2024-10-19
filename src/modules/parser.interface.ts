export interface Parser<T> {
    read() : void
    parse(): T[]
}
