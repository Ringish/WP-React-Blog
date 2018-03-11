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
  },
  posts: {
    listUrl: `${baseUrl}wp/v2/posts`,
     getList(handleResponse) {
      fetch(`${baseUrl}wp/v2/posts`)
      .then(res => res.json());

    },
    singleUrl: `${baseUrl}wp/v2/posts`,
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