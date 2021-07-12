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
    case "speakers/load/rejected":
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
    dispatch({type: "speakers/load/pending"})
    try {
      const response = await fetch(`http://localhost:4001`,
        {method: "POST"},
        {body: JSON.stringify(data)}
        );
      const json = await response.json();
      dispatch({
        type: "students/load/fulfilled",
        payload: json,
      });
    } catch (e) {
      dispatch({ type: 'speakers/load/rejected', error: e.toString() });

    }
  }
}