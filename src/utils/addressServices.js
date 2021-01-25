async function translateZipCode() {
   if (profile.postCode.length !== 8) {
     return;
 }
 let cepResponse  = axios.get('https://api.postmon.com.br/v1/cep/' + `{{profile.postCode}}`)
 .then(data => data.json())
 console.log(cepResponse)
//   document.getElementById('address').value = cepResponse.logradouro
//   document.getElementById('city').value = cepResponse.cidade
//   document.getElementById('neighborhood').value = cepResponse.bairro
//   document.getElementById('state').value = cepResponse.estado   
 
 }
export default translateZipCode

