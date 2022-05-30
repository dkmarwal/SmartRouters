const initialState = {
    auditTrail: {
      error: false,
      data: [],
      message: null,
      pageSize: null,
      pageNum: null,
      totalPages: null,
      isLoading: true,
    },
  }
  
  export default function viewAuditTrail(state = initialState, action = {}) {
    switch (action.type) {
      case 'FETCH_AUDIT_TRAIL_SUCCESS':
        return {
          ...state,
          auditTrail: {
            error: false,
            data: action.payload.data,
            message: action.payload.message,
            pageSize: action.payload.pageSize,
            pageNum: action.payload.pageNum,
            totalPages: action.payload.totalPages,
            isLoading: false
          }
        }
      case 'FETCH_AUDIT_TRAIL_FAILED':
        return {
          ...state,
          auditTrail: {
            ...state.auditTrail,
            error: true,
            message: action.payload.message,
            pageSize: action.payload.pageSize,
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            isLoading: false
          }
        }
      default:
        return {
          ...state
        }
    }
  }