import { LitElement } from 'lit';
export declare class TokyoLorem extends LitElement {
    word: number;
    paragraph: number;
    language: string;
    generateLorem(): string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tokyo-lorem': TokyoLorem;
    }
}
