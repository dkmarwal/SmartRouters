const intialState={
    selectedIndex:null}
 
const intialstate1={selectedrow:null}
const intialstate2={selecteditrow:[]}
const intialstate3={selectedcolapsedatatrow:[]}
const intialstate4={selectedsearchatatrow:[]}


export const saveindexReducer=(state=intialState,action)=>{
switch (action.type) {
    case "SAVE_INDEX_OF_ROW":
        return{...state,selectedIndex:action.payload} ;
    default: return state
}
}

export const saverowreducer=(state=intialstate1,action)=>{
switch (action.type) {
    case "SAVE_ROW_ID":return {...state,selectedrow:action.payload}

    default:return state
}
}

export const saverowitreducer=(state=intialstate2,action)=>{
    switch (action.type) {
        case "SAVE_ROW":return {...state,selecteditrow:action.payload}
    
        default:return state
    }
    }
    export const savecolapsedatareducer=(state=intialstate3,action)=>{
        switch (action.type) {
            case "SAVE_ROW_COLAPSE":return {...state,selectedcolapsedatatrow:action.payload}
        
            default:return state
        }
        }
        export const saverowsearchreducer=(state=intialstate4,action)=>{
            switch (action.type) {
                case "SAVE_ROWS_SEARCH":return {...state,selectedsearchatatrow:action.payload}
            
                default:return state
            }
            }