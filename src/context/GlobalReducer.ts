export const GlobalReducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                appLoading: action.payload,
            }
        case "SET_FILETREE":
            return {
                ...state,
                fileTree: action.payload,
            }

        default:
            return state
    }
}
