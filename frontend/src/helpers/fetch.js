
// headers should include 'json' or 'form' as the value to the key 'content'
const contentTypes = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded'
}
let headerDict = {
  'access_token': undefined,
  'content': 'json'
};
  export async function getData(url, headers=undefined) {
    let myHeaders = undefined;

    if(headers){
      myHeaders = setHeaders(headers);
    }

    try {
      const response = await fetch(url, {
        headers: myHeaders,
        mode:'cors',
        method: 'GET',
      });
      const data = await response.json();
      return data;
    }
    catch(error) {
      console.log(error);
    }

  }
  // 
  export async function postData(url, headers = headerDict, body = undefined) {
    const myHeaders = setHeaders(headers);
    const response = await fetch(url, {
      headers: myHeaders,
      method: 'POST',
      body: JSON.stringify(body)
    });
    if(response.status !== 501) { // needs to be fixed
      const data = await response.json();
      return data;

    }
  }

  export async function putData(url, headers=headerDict, body=undefined) {
    const myHeaders = setHeaders(headers);

    const response = await fetch(url, {
      headers: myHeaders,
      method: 'PUT',
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;

  }

// when setting headers include a dictionary using both 'content' and 'access_token'
  function setHeaders(data) {
    if(!data) return undefined;
    data['Content-Type'] = contentTypes['json']

    return data;
  }