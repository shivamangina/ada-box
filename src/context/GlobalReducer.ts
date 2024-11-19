export const GlobalReducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                appLoading: action.payload,
            }

        default:
            return state
    }
}
