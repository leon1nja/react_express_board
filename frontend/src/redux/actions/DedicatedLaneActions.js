import axios from "axios";

export const EditSheduleAction =
  (state, id, token, truck, prevtruck) => async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}shedule?id=${id}&truck=${truck}&prevtruck=${prevtruck}`,
        { ...state },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch({ type: "EDIT_SHEDULE", payload: data });
    } catch (error) {
      dispatch({ type: "EDIT_SHEDULE", payload: { msg: error.message } });
    }
  };

export const EditLocationAction = (state, id, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}location?id=${id}`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_SHEDULE", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_SHEDULE", payload: { msg: error.message } });
  }
};

export const GetShedulesAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}shedule`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_SHEDULES", payload: data });
  } catch (error) {
    dispatch({ type: "GET_SHEDULES", payload: error.message });
  }
};

export const GetIllinoisesAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}illinois`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_ILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ILLINOIS", payload: error.message });
  }
};
export const GetTIllinoisesAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}tillinois`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_TILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_TILLINOIS", payload: error.message });
  }
};

export const AddIllinoisAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}illinois`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_ILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_ILLINOIS", payload: error.message });
  }
};
export const EditIllinoisAction = (state, id, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}illinois?id=${id}`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_ILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_ILLINOIS", payload: error.message });
  }
};
export const AddTIllinoisAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}tillinois`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_TILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_TILLINOIS", payload: error.message });
  }
};

export const editTIllinoisAction = (id, state, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}tillinois`,
      { ...state, id },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_TILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_TILLINOIS", payload: error.message });
  }
};

export const DeleteIllinoisAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}illinois?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_ILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_ILLINOIS", payload: { msg: error.message } });
  }
};

export const DeleteTIllinoisAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}tillinois?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_TILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_TILLINOIS", payload: { msg: error.message } });
  }
};

export const AddNewIllinoisAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_ILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_ILLINOIS", payload: data });
  }
};
export const AddNewTIllinoisAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_TILLINOIS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_TILLINOIS", payload: data });
  }
};

//colorado

export const AddColoradoAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}colorado`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_COLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_COLORADO", payload: error.message });
  }
};
export const EditColoradoAction = (state, id, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}colorado?id=${id}`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_COLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_COLORADO", payload: error.message });
  }
};

export const AddNewColoradoAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_COLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_COLORADO", payload: data });
  }
};

export const GetColoradosAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}colorado`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_COLORADOSES", payload: data });
  } catch (error) {
    dispatch({ type: "GET_COLORADOSES", payload: error.message });
  }
};

export const DeleteColoradoAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}colorado?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_COLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_COLORADO", payload: { msg: error.message } });
  }
};

export const AddTColoradoAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}tcolorado`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_TCOLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_TCOLORADO", payload: error.message });
  }
};

export const EditTColoradoAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}tcolorado/editTruck`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_TCOLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_TCOLORADO", payload: error.message });
  }
};

export const AddNewTColoradoAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_TCOLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_TCOLORADO", payload: data });
  }
};

export const GetTColoradosesAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}tcoloradoses`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const tcoloradoses = data.msg.map((_item, _key) => {
      return {
        id: _key + 1,
        ..._item,
      };
    });
    dispatch({ type: "GET_TCOLORADOSES", payload: {msg: tcoloradoses} });
  } catch (error) {
    dispatch({ type: "GET_TCOLORADOSES", payload: error.message });
  }
};

export const DeleteTColoradoAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}tcolorado?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_TCOLORADO", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_TCOLORADO", payload: { msg: error.message } });
  }
};

//midwest

export const AddMidwestAction = (state, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}midwest`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "ADD_MIDWEST", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_MIDWEST", payload: error.message });
  }
};
export const EditMidwestAction = (state, id, token) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}midwest?id=${id}`,
      { ...state },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: "EDIT_MIDWEST", payload: data });
  } catch (error) {
    dispatch({ type: "EDIT_MIDWEST", payload: error.message });
  }
};

export const AddNewMidwestAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_NEW_MIDWEST", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_NEW_MIDWEST", payload: data });
  }
};

export const GetMidwestsAction = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}midwest`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "GET_MIDWESTES", payload: data });
  } catch (error) {
    dispatch({ type: "GET_MIDWESTES", payload: error.message });
  }
};

export const DeleteMidwestAction = (id, token) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API}midwest?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: "DELETE_MIDWEST", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_MIDWEST", payload: { msg: error.message } });
  }
};
