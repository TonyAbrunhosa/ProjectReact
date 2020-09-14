const ESTADO_INICIAL = {
    openModal: false
}

export const ACTIONS = {
    MOSTRAR_OCULTAR_MODAL: 'MODAL_MOSTRAR_OCULTAR'
}

export function clienteReducer(state = ESTADO_INICIAL, action:any){
    switch(action.type){
        case ACTIONS.MOSTRAR_OCULTAR_MODAL:
            console.log(action.openModal)

            return {...state, openModal: action.openModal}        
        default:
            return state;
    }
}

export function mostrarOcultarModal(habilitar:boolean){
    console.log(habilitar)
    return{
        type: ACTIONS.MOSTRAR_OCULTAR_MODAL,
        openModal: habilitar
    }
}
