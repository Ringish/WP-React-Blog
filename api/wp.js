import wpAuth from '../api/auth/wp.js';

const baseUrl = wpAuth.baseUrl;

const wpAPI = {
  site: {
     getInfo(handleResponse) {
      fetch(baseUrl)
      .then(res => res.json())
      .then(
        (result) => {
          handleResponse(result);
          });

    },
    topMenuUrl: `${baseUrl}wp-api-menus/v2/menu-locations/top`
  },
  posts: {
    listUrl: `${baseUrl}wp/v2/posts&_embed`,
     getList(handleResponse) {
      fetch(`${baseUrl}wp/v2/posts`)
      .then(res => res.json());

    },
    singleUrl: `${baseUrl}wp/v2/posts&_embed=true&slug=`,
     getSingle(id) {
      fetch(`${baseUrl}/wp/v2/posts/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          handleResponse(result);
        });

    },
  },
};

export default wpAPI;