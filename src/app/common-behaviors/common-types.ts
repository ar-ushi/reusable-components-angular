export type Color = {
    color: string;
    type: 'text' | 'background';
    fill?: 'clear' | 'outline' | 'solid';
    variant? : 'lighter' | 'darker'
}
