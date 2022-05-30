const initialState = {
  list: {
    error: false,
    data: [],
    message: null,
    isLoading: true,
    currentPage: 0,
    pageSize: null,
    totalCount: 0,
    totalPages: 0,
  },
}

export default function request(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_REQUESTS_SUCCESS':
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
    case 'FETCH_REQUESTS_FAILED':
      return {
        ...state,
        list: {
          ...state.list,
          error: true,
          message: action.payload.message,
          isLoading: false
        }
      }
    default:
      return {
        ...state
      }
  }
}