import React from 'react'
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
    inputRef: (ref: HTMLInputElement | null) => void;
  }
  
  export default function MascaraCPF(props: TextMaskCustomProps) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref: any) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[1-9]/,/\d/,/\d/, '.', /\d/, /\d/,/\d/,'.', /\d/, /\d/,/\d/,'-',/\d/, /\d/]}
      />
    );
  }