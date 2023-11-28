// actions.js
export const addFav = (data) => ({
    type: 'ADD_FAV',
    data: data
  });
  
  export const removeFav = (data) => ({
    type: 'REMOVE_FAV',
    data: data
  });

  export const getSongs = (data) => ({
    type: 'GET_SONGS',
    data: data
  })
  