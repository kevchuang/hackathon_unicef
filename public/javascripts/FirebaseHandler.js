const admin = require('firebase-admin');

let serviceAccount = require({
  "type": "service_account",
  "project_id": "hackathonunicef",
  "private_key_id": "36ca304a98012eae961e30763eaa27e9e00d5067",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDPH8GS4HuSnXds\nT1VeNBRwGS6SNgWMAdCB49+CPjQIfQm3NNXfDzAPhzCTwb6Qp014t/wygTPV91Zx\ncFcIC1Mf4DzkJv+JEGy+bnHOiVrkhiHZjhowiydDCTJ/j4/8tNtdG7dI1VEYimGv\nq82igSqUqZWHnjpkVuGNrfw64leesa0Z6Nzq4UkcBmzNLZbZD3NVmPhqJaX127p6\nKJxWFxBG1jPdOwWm4bAI/UHSa0sVHUi96BrQOrQm4G9bsvu4vlmmxIpo1+gtDhGM\nJGNAD2QY5jdY4/otFfmpPfk5OEQMIIwQVVr02mDIKKs1YD0Q/qh7OQoimHnR2eMs\n220dp2fLAgMBAAECggEAMvYwTbA4F2nxIVAfxA7yXGaFw+nQ0ZL8t4jWzJf7e38w\nbchtOvXksF1mAWTxO2w+ro4uWkrZ8zJpLX4jm9IVgMlOkiBaTWIiL3TDQbsgBwxN\ntda18O28Gk1gBGzRU684Lh+MqDn8OxqJUIzoCqzXSj6zkOvImDmcQ5zka6SXRG8n\nkLyZi+BgezR6RJJ4PRa3WbEjHvIarv6e7WDCKyR1UUVWWdHf2mmPTohf8kgXZ64I\nQ6j9ZKjNK5JVr65bCSPHzIKPQKLlUbzv/t7fGziZcgmRlJZHmBFlk+q40/0wtC8k\nDxHLWNR/dDVbC2z+wWHqFmbnGh4aMpLbzzjCznkO4QKBgQD0eM4U5+kAUUS5bxoF\n4u5pKLuSWXbPYcnxZ2QlygxWlXSxh3xaBeg08Gg+JRcany8MyB+SoSuHtl4C3cnr\nqjid5CCVnD2vtM4PVj+d0JfSeGEeAjsYRYTTczdPV1lTrDeR4F2E6gYHaJMh6W9b\nQLiNwhwnMzCdwf0vqBptrw1D8QKBgQDY5Bk8oQAfE5yzv2qJrm8UO/Bz7G8+tRIe\nvXR4pOzrOu+OsyfKWCEIR5BrKX6FBQunPShbxLgMies7nAbFanqa+MmmShl/uhVm\n2fEvxWyaljtopwKcTH2cj7hyXl6yoIcZHESzcEuWyUoS5arVnWWIBizJQ28YFAle\nwWgr2WrzewKBgQC624tI12l0YKmSwqS1Uxq/Le8QkWkKYcgkx834RFLh6yJifxhB\nBrrRm99RgLAEHR+tOVlIjf/jnzSEJFmt01Gq/S8aq21K23uUpWvCiClDKdexRCs/\nBgPcSvg/oJgaKEvhKAjTCrzI9Nlg1jfTG8j0MSWroKjMK/YFcwugQmh1QQKBgQCA\nkLVk+wrXYQjCg/TjKEMv+1fNX5mR0kOrdSJVYW4PAiB+tjQf/Z2XCtTQsQgOUa9W\nsyn5O+Ldi+OkshhRbYy/0Dm4GLSEwgltrkMJzj1SZTtSDa2+eJj89TSgltALkpyC\nhf8zXp1wBGGkUf+yIFrPBtoFc7Om0jm7sWnOlFKRgQKBgQCy9e2JMR2x64kKm4P8\n+jZ2GrEr4tVePNbCM6rVwb6PnEB1+H7yOogGLBYhyMZc9aGDe8VkWroo8C8vIXIM\nDW3ysgRnwQ3Te/v9UbJJl/C6y7lei9gjYWCK0VGToX6ujHQ1CXH9NjZScvZV/Te2\nbouVX3cEkQiz6N7ihb+JC2J8Mg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-cmehr@hackathonunicef.iam.gserviceaccount.com",
  "client_id": "112367014074918131202",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cmehr%40hackathonunicef.iam.gserviceaccount.com"
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const firebaseHandler = {

  postCertificate: async (certificate) => {
    try {
      await db.collection('certificates').add(certificate);
      console.log('Added document');
    } catch (error) {
      next(error)
    }
  },

  getCertificate: async (firstname, lastname, birthdate) => {
    
  },

  getAddress: async (phone) => {
    try {
      const snapshot = await db.collection('users').where('phone', '==', phone).get();
      if (snapshot.empty) {
        const err = new error;
        return(err);
      } else {
        snapshot.forEach(doc => {
          return(doc.publicAddress);
        })
      }
    } catch (error) {
      next(error)
    }
  },
}

module.exports = firebaseHandler;