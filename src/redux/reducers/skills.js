const initialState = {
  list: {
    error: false,
    data: [],
    message: null,
    currentPage: null,
    pageSize: null,
    totalCount: null,
    totalPages: null,
    isLoading: true
  },
  allBusinessLine: {
    error: false,
    data: [],
    isLoading: true,
    pageSize: null,
    totalCount: null,
    totalPages: null,
  },
  allRequestType: {
    error: false,
    data: [],
    isLoading: true,
    pageSize: null,
    totalCount: null,
    totalPages: null,
  },
  allCustomerType: {
    error: false,
    data: [],
    isLoading: true,
    pageSize: null,
    totalCount: null,
    totalPages: null,
  },
  allProductActionLine: {
    error: false,
    data: [],
    isLoading: true,
    pageSize: null,
    totalCount: null,
    totalPages: null,
  },
  
}

export default function skills(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_SKILLS_SUCCESS':
      return {
        ...state,
        list: {
          error: false,
          data: action.payload.data,
          message: action.payload.message,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          isLoading: false
        }
      }
    case 'FETCH_SKILLS_FAILED':
      return {
        ...state,
        list: {
          ...state.list,
          error: true,
          message: action.payload.message,
          isLoading: false
        }
      }
      case 'FETCH_BUSINESS_LINE_SUCCESS':
        return {
          ...state,
          allBusinessLine: {
            ...state.allBusinessLine,
            error: false,
            data: action.payload.data,
            pageSize: action.payload.pageSize,
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            isLoading: false
          }
        }
      case 'FETCH_BUSINESS_LINE_FAILED':
        return {
          ...state,
          allBusinessLine: {
            ...state.allBusinessLine,
            error: true,
            isLoading: false
          }
        }
        case 'FETCH_REQUEST_TYPE_SUCCESS':
          return {
            ...state,
            allRequestType: {
              ...state.allRequestType,
              error: false,
              data: action.payload.data,
              pageSize: action.payload.pageSize,
              totalCount: action.payload.totalCount,
              totalPages: action.payload.totalPages,
              isLoading: false
            }
          }
        case 'FETCH_REQUEST_TYPE_FAILED':
          return {
            ...state,
            allRequestType: {
              ...state.allRequestType,
              error: true,
              isLoading: false
            }
          }
          case 'FETCH_CUSTOMER_TYPE_SUCCESS':
            return {
              ...state,
              allCustomerType: {
                ...state.allCustomerType,
                error: false,
                data: action.payload.data,
                pageSize: action.payload.pageSize,
                totalCount: action.payload.totalCount,
                totalPages: action.payload.totalPages,
                isLoading: false
              }
            }
          case 'FETCH_CUSTOMER_TYPE_FAILED':
            return {
              ...state,
              allCustomerType: {
                ...state.allCustomerType,
                error: true,
                isLoading: false
              }
            }
            case 'FETCH_PRODUCTACTION_SUCCESS':
            return {
          ...state,
          allProductActionLine: {
            ...state.allProductActionLine,
            error: false,
            data: action.payload.data,
            pageSize: action.payload.pageSize,
            totalCount: action.payload.totalCount,
            totalPages: action.payload.totalPages,
            isLoading: false
          }
        }
      case 'FETCH_PRODUCTACTION_FAILED':
        return {
          ...state,
          allProductActionLine: {
            ...state.allProductActionLine,
            error: true,
            isLoading: false
          }
        }
    default:
      return {
        ...state
      }
  }
}