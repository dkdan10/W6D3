const APIUtil = {
  followUser: id => {
    // ...
    return $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: "json"
    });

  },

  unfollowUser: id => {
    // ...
    return $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: "json"
    });
  },

  searchUsers: (queryVal, sucCB) => {
    return $.ajax({
      method: 'GET',
      url: "/users/search",
      data: {
        'query': queryVal
      },
      success: sucCB,
      dataType: 'json'
    });
  }
}

export default APIUtil
