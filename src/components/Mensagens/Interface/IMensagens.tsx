export default interface IMensagens{
    open: boolean,
    posicao?: IPosicao
    mensagem: string,
    tempo?: number,
    tipo?: 'success' | 'info' | 'warning' | 'error',
    onClose: Function
}

interface IPosicao {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }