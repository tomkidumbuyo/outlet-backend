const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9090';
const API_V1_URL = BACKEND_URL + '/api/v1';

export async function getRequest(url) {
	const res = await axios.get(API_V1_URL + url);
	return await res.json();
}

export async function postRequest(url, params) {
	const res = await axios.get(API_V1_URL + url, params);
	return await res.json();
}

// export async function uploadFileToS3(result: any, fileName: string) {
//     const formData = new FormData();
//     for (const field of Object.keys(result.fields)) {
//         formData.append(field, result.fields[field]);
//     }
//     formData.append('file', fs.createReadStream(fileName), {
//         filename: fileName,
//     });
//     await new Promise((resolve, reject) => {
//         formData.submit(result.url, (err, succ) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(succ);
//             }
//         });
//     });
// }
