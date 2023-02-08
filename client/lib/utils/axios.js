const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  body: null,
  cache: 'no-cache',
  credential: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export const axios = async (options = {}) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...options.headers },
  };

  let response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }

  // console.log(response);

  return response;
};

axios.get = async (url, options) => {
  return axios({
    url,
    ...options,
  });
};

axios.post = (url, body, options) => {
  return axios({
    method: 'POST',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

axios.put = (url, body, options) => {
  return axios({
    method: 'PUT',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

axios.delete = (url, options) => {
  return axios({
    method: 'DELETE',
    url,
    ...options,
  });
};
