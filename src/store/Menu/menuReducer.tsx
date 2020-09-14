const ESTADO_INICIAL = {
    mostrarMenuLateral: false,
    nomePrograma: 'Agenda'
}

export const ACTIONS = {
    MOSTRAR_OCULTAR_MENU: 'MENU_MOSTRAR_OCULTAR',
    NOME_PROGRAMA: 'NOME_PROGRAMA'
}

export function menuReducer(state = ESTADO_INICIAL, action:any){
    switch(action.type){
        case ACTIONS.MOSTRAR_OCULTAR_MENU:
            return {...state, mostrarMenuLateral: action.mostrarMenuLateral}
        case ACTIONS.NOME_PROGRAMA:
            return {...state, nomePrograma: action.nomePrograma}
        default:
            return state;
    }
}

export function mostrarOcultarMensagem(habilitar:boolean){
    return{
        type: ACTIONS.MOSTRAR_OCULTAR_MENU,
        mostrarMenuLateral: habilitar
    }
}

export function nomeProgramaTopBar(nomePrograma:string){
    return{
        type: ACTIONS.NOME_PROGRAMA,
        nomePrograma: nomePrograma
    }
}