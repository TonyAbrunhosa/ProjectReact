export default interface ITextFieldMask{
    id: string;
    valor: string;
    mask: any;
    label: string;
    type: string;
    required: boolean;
    error?: boolean;
    onBlurValid: Function;
    GetValor: Function;
    helperText?: string;
  }