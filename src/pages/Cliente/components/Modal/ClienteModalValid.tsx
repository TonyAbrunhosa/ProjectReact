export function ValidLengthField(valor:string, length:number){
    let retorno: boolean = false;

    if(valor.length < length){
      retorno = true;
    }
    return retorno;
  }

export function ValidEmail(valor:string){
    let retorno: boolean = false;
    
    if(valor !== '') {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if(!regexp.test(valor)){
        retorno = true
      }
    }
    return retorno
  }