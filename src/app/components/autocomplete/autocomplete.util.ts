import { HttpHeaders } from "@angular/common/http"

export enum keyCode {
    Tab = 'Tab',
    Enter = 'Enter',
    Shift = 'Shift',
    Escape = 'Escape',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    ArrowUp = 'ArrowUp',
    ArrowDown = 'ArrowUp'
}

export type autocompleteAPIConfig = {
    apiType: 'http' | 'json'
    httpMethod: 'get' | 'post' | 'patch' | 'put' 
    headers? : HttpHeaders,
    resultLimit?: number,
    payload?: Record<string, any>,
}