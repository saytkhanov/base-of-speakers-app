const initialState = {
  items: [],
  loading: false,
  deleting: false,
  error: null
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case "speakers/create/pending":
      return {
        ...state,
        loading: true,
      };
    case "speakers/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    case "speakers/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.error,
      }


    default:
      return state
  }
}


export const registerSpeaker = () => {
  return async dispatch => {
    dispatch({type: "speakers/create/pending"})
    try {
      const response = await fetch(`http://localhost:4001`,
        {method: "POST"},
        {body: JSON.stringify(data)}
        );
      const json = await response.json();
      dispatch({
        type: "speakers/create/fulfilled",
        payload: json,
      });
    } catch (e) {
      dispatch({ type: 'speakers/create/rejected', error: e.toString() });

    }
  }
}