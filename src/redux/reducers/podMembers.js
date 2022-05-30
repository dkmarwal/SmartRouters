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
}

export default function podMembers(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_POD_MEMBERS_SUCCESS':
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
    case 'FETCH_POD_MEMBERS_FAILED':
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