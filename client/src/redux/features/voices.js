const initialState = {
  items: [],
  loading: false,
  deleting: false,
  creating: false,
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
      };
    case "voice/create/pending":
      return {
        ...state,
          creating: true
      }
    case "voice/create/fulfilled":
      return {
        ...state,
        creating: false,
        items: [...state.items, action.payload]
      }
    case "voice/create/rejected":
      return {
        ...state,
        creating: false,
        error: action.error,
      }
    case "voice/delete/pending":
      return {
        ...state,
        deleting: true
      }
    case "voice/delete/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((voice) => voice._id !== action.payload)
      }
    case "voice/delete/rejected":
      return {
        ...state,
        deleting: true
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

export const uploadVoice =(file) => {
  return async (dispatch, getState) => {
    dispatch({type: "voice/create/pending"})
    const state = getState()
    try {
      const formData = new FormData()
      formData.append('file', file)
      await fetch(`http://localhost:4001/voice`, {
        method: 'POST',
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`
        },
        body: formData
      })
      dispatch({type: "voice/create/fulfilled", payload: file})
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const deleteVoice =(id) => {
  return async (dispatch, getState) => {
    const state = getState()
    try {
      await fetch(`http://localhost:4001/voice/${id}`, {
        method: 'DELETE',
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${state.speakers.token}`
        }
      })
      dispatch({type: "voice/delete/fulfilled", payload: id})
    } catch (e) {
      console.log(e.message)
    }
  }
}