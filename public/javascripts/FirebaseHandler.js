const admin = require('firebase-admin');

let serviceAccount = {
  "type": "service_account",
  "project_id": "hackathonunicef",
  "private_key_id": "7c598e31efeff1188480e8fcc46932466d2a0676",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTPNGaBI+WDfhD\n0iVZMK9apz1TMDF4+ivJ0Vk4RfzHzEDiNtCYFswRzBHuwf3YxHX2H23c046ct4t9\nl20vj3sZCj4uDzJMgE7URnbwasj69omQi9q0anTo0m1EeiuIMIz2qQ7UxqeGFxN7\nLEDKh/ngXUVrWInVAzllYA3WlhaYHHml8aXda/p7StE89LK5ZGghsliXiSredodq\niy7xdsZy6YTs9tVt2lVzRRvP+Lvuok3ZrMJBNcK9IjFUB4v71YfH0A9BwxPcuWmu\np9r+3nGYyoVh2rajI8M5o/OaxXlDWXgHpOPLNT+OEegDlb2PiXhl50WNv+kENp+s\n1T7vqMM1AgMBAAECggEACohVDCivjyQVra4IAjU4/RxrJJ95zAYvUkIPwIxO0RiI\nYK8qgfbbCIUkHMNL+Le9CP9irzjWOs61FBdNkKpHEUXPOWU1FRbtt0xnKFAuwsKx\ns8Uha88GEsjRPXGZA5KmKLNfw7C/ECLM7B6WAXM7vJnx+OsCfl5JiZo7Pmif6kgj\n8yXai8e9NQ5cg+xL1djFojSX87g/EpDhHUVwwOa8gUViU0mk+dm/T4nJ2yh42mGh\nnHWFova5O2xAFxtANXXHrvgketmAM/ZfoapUd/1MP5zWEHJSB/dc47XQfHHbI4sP\nZEr3S+PL4ZFArovb0DjO56HVl+bvx5ftUFlBm7SHoQKBgQD49fDoV9KZwHzz9URx\nC1iGRTvEGinKPOB6kq0r+vppN9oeTOQg64K3XvTBsI5YV5JDixc4pcd9jlvNvD/w\nXZrBg+BLO3sG6Ibx5ZKBkhy/nGXVate/svxWgikW73+ksUTE9d0Lw2n6NhM7mMLs\nlSiJ9NOxUG6xBH4QPkpe007Q4QKBgQDZNdNJgeUOfMCefJpwFf87Tygg31yw4xVS\nOOiG5u+Sj55nznkdpMZ/P84eKBX0q5HaPMpK/nIS9FVrdTRXMKGCB7SpQIKbTZQh\n9Z+cf8rSrkzHhgNgrS4xYxIarO4o6bqwuxFhPK/Pgmf75Ai04ufnVj7TTi2KIzGB\nzGPTXRv41QKBgGJMGPZj1o9GZQ+dw4wuwqEhLNvcyKtFJgy/ZQh8a+qnVsOn8Frf\nIhlssI7ZOxq+WM26WUzQh9eXIcA1l7k7/CJ0A1cxAP5VSRKxZgsquZceFUcSjGTw\nMpmlgru/jFJme5SYztIaMfnM6AMb6bqnmf3+YKcd7taNw4h+T7bpD7GBAoGBAI5D\nfrtqZEf01YP4QH6hKaYC1lmRcfg5A0HzG/kfUFJB1pJO3WzY+1lkxO9jed3icYjq\nv+QWe0iG11umTD2/EElGGsGwCtsFGLyVT5EE8ibDGm6kC5pKUzLtnHH0SZhqXWhb\nXaq+QLg8xTZpyHoRE6qlBkkHrzQGkOpeoBNTrHpxAoGAEz+zTv9WLQ4481WPhD1w\n6yp8g0lWOkdUr8K+OBhssk+zBLSul3fBaQjy76NXNHyEyvoP93EuBcBZauV4uLOa\nkCnbhmuRrKyv3eA3BXYuQtFWhW3DNuy6elXkN8L108srjPZj053M5wvb771ztxEq\nqXMvb3nUiIgJne2x4WfKwA0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-cmehr@hackathonunicef.iam.gserviceaccount.com",
  "client_id": "112367014074918131202",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cmehr%40hackathonunicef.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const firebaseHandler = {

  postCertificate: async (certificate) => {
    try {
      await db.collection('certificates').add(certificate);
      return ({
          code: 200,
          message: certificate
      })
    } catch (error) {
      return ({
          code: 400,
          message: "cannot add certificate"
      })
    }
  },

  getCertificate: async (firstname, middlename, lastname, gender, birthPlace, birthdate) => {
    try {
      const firstnameQuery = db.collection('certificates').where('firstname', '==', firstname);
      const middlenameQuery = firstnameQuery.where('middlename', '==', middlename);
      const lastnameQuery = middlenameQuery.where('lastname', '==', lastname);
      const genderQuery = lastnameQuery.where('gender', '==', gender);
      const birthPlaceQuery = genderQuery.where('birthPlace', '==', birthPlace);
      const birthdateQuery = birthPlaceQuery.where('birthdate', '==', birthdate);
      const snapshot = await birthdateQuery.get();
      if (snapshot.empty) {
        return ({
          code: 404,
          message: "no certificate found"
        })
      } else {
        var certificatesList = []
        var responseString = "Certificate(s) found : "
        await snapshot.forEach(doc => {
          const data = doc.data()
          certificatesList.push(doc.data());
          responseString = responseString.concat(
            "firstname : ",data.firstname,
            ", middlename : ",data.middlename,
            ", lastname : ", data.lastname,
            ", gender : ", data.gender,
            ", birthplace : ", data.birthPlace,
            ", birthdate : ", data.birthdate,
            ", parent 1 : ", data.parent1,
            ", parent 2 : ", data.parent2,
            ", recognition date parent 1 : ", data.dateRecognitionParent1,
            ", recognition date parent 2 : ", data.dateRecognitionParent2, "; ")
        })
        return({ code: 200, message: responseString});
      }
    } catch (error) {
      return ({
          code: 404,
          message: "cannot find certificate"
      })
    }
  },

  getAddress: async (phone) => {
    try {
      const snapshot = await db.collection('users').where('phone', '==', phone).get();
      if (snapshot.empty) {
        return({authorized: false});
      } else {
        var address = "";
        await snapshot.forEach(doc => {
          address = doc.publicAddress;
        })
        return({authorized: true, address: address});
      }
    } catch (error) {
      next(error)
    }
  },
}

module.exports = firebaseHandler;