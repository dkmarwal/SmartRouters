import { combineReducers } from 'redux'
import request from './request';
import podMembers from './podMembers';
import skills from "./skills";
import products from './products';
import requestCount from './requestCount';
import filterby from './filterby'
import viewAuditTrail from './viewAuditTrail';
import {saveindexReducer,saverowreducer,saverowitreducer,savecolapsedatareducer,saverowsearchreducer} from './saveIndexReducer'

const reducer = combineReducers({
    request,
    podMembers,
    skills,
    products,
    requestCount,
    filterby,
    viewAuditTrail,
    indexSelected:saveindexReducer,
    rowIdSelected : saverowreducer,
    rowISelected : saverowitreducer,
    collapseSelecteddata:savecolapsedatareducer,
    searchSelectedData:saverowsearchreducer,


})

export default reducer