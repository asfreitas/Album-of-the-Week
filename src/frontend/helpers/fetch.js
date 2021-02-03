// headers should include 'json' or 'form' as the value to the key 'content'
const contentTypes = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded'
}
  export async function getData(url, headers=undefined) {
    let myHeaders = undefined;
    if(headers){
      myHeaders = setHeaders(headers);

    }
    const response = await fetch(url, {
      headers: myHeaders,
      method: 'GET', 
    });
    const data = await response.json();
    return data;
  }
  // 
  export async function postData(url, headers = undefined, body = undefined) {
    const myHeaders = setHeaders(headers);
    const myBody = setBody(body);
    const response = await fetch(url, {
      headers: myHeaders,
      method: 'POST',
      body: myBody
    });
    const data = await response.json();
    return data;

  }

  export async function putData(url, headers=undefined, body=undefined) {
    return 0;
  }

// when setting headers include a dictionary using both 'content' and 'access_token'
  function setHeaders(data) {
    const content = contentTypes[data['content']]
    const token = data['access_token'];
    console.log(content);
    const headers = new Headers({
        'access_token': token,
        'Content-Type': content
    });
    return headers;
  }
  //
  function setBody(data) {
    let formData = "";
    let myData = ""
    let x = "";
    for(x in data) {
      myData = x + "=" + data[x];
      formData += myData;
      formData += "&";
    }
    return formData;
  }