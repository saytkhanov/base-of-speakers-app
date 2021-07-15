const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null,
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "voices/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "voices/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "voices/load/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default: {
      return state
    }
  }
  }

  export const getVoices = () => {
    return async (dispatch) => {
      dispatch({ type: "voices/load/pending" });
      try {
        const response = await fetch(`http://localhost:4001/voice`);
        const json = await response.json();
        if (json.error) {
          dispatch({
            type: "voices/load/rejected",
            error: "При запросе на сервер произошла ошибка",
          });
        } else {
          dispatch({
            type: "voices/load/fulfilled",
            payload: json,
          });
        }
      } catch (e) {
        dispatch({ type: "voices/load/rejected", error: e.toString() });
      }
      }
  }