// reducers.js
const initialState = {
  songs: [],
  favourites: [],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV":
      state.songs.find((item) => item.id === action.data?.id).isFavourite =
        action.data.isFavourite;
      return { favourites: state.favourites.push(action.data) };
    case "REMOVE_FAV":
      state.songs.find((item) => item.id === action.data?.id).isFavourite =
        action.data.isFavourite;
      return {
        favourites: state.favourites.filter((x) => x.id !== action.data?.id),
      };
    case "GET_SONGS":
      return {
        songs: action.data,
        favourites: action.data?.filter((x) => x.isFavourite),
      };
    default:
      return state;
  }
};

export default counterReducer;
