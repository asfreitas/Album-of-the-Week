import { CrossReferenceIcon } from "@primer/octicons-react";

// headers should include 'json' or 'form' as the value to the key 'content'
const contentTypes = {
  'json': 'application/json',
  'form': 'application/x-www-form-urlencoded'
}
let headerDict = {
  'access_token': undefined,
  'content': 'form'
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
    const myBody = setBody(body);

    const response = await fetch(url, {
      headers: myHeaders,
      method: 'POST',
      body: myBody
    });
    if(response.status !== 501) {
      const data = await response.json();
      return data;

    }

  }

  export async function putData(url, headers=headerDict, body=undefined) {
    const myHeaders = setHeaders(headers);
    const myBody = setBody(body);
    console.log(myBody);
    const response = await fetch(url, {
      headers: myHeaders,
      method: 'PUT',
      body: myBody
    });
    const data = await response.json();
    return data;

  }

// when setting headers include a dictionary using both 'content' and 'access_token'
  function setHeaders(data) {
    if(!data) return undefined;
    data['Content-Type'] = contentTypes[data['content']]
    const token = data['access_token'];

    return data;
  }
  //
  function setBody(data) {
    if(!data)
      return undefined;
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