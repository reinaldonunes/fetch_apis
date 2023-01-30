import './style.css'

// CÓDIGO DO LEO
async function searchCep() {
    const cep = document.getElementById('input-search').value;  //atribui o valor do input-search à constante cep
    const url = `http://viacep.com.br/ws/${cep}/json/`; //consulta o cep e atribui as informações na constante url
    
    const data = await fetch(url);  //utiliza-se await para receber os dados da url sem necessidade de aguardar retorno da promessa
    const address = await data.json();  //acessa os dados json da url
    console.log(data)

    document.querySelector("#cep_result_leo").innerHTML = JSON.stringify(address)

    //fetch(url).then(response => response.json().then(console.log))  //outro jeito de acessar os dados da url sem utilizar o await
}

document.getElementById('search').addEventListener('click', searchCep); //ao clicar no botão "search" executa a função searchCep

// => ponto positivo: faz a consulta de modo assíncrona.
// => ponto negativo: não há como tratar os erros e exceções.



// BLOCO THEN THEN
function searchCep2() {
    const cep = document.getElementById('input-search_2').value;  //atribui o valor do input-search à constante cep
    const url = `http://viacep.com.br/ws/${cep}/json/`; //consulta o cep e atribui as informações na constante url
    
    const data = fetch(url)
      .then(response => response.json()
        .then((data) => console.log(data))
        .then(data)) 

      console.log(data)
    
    document.querySelector("#cep_result_fetch").innerHTML = JSON.stringify(data)
}

document.getElementById('search2').addEventListener('click', searchCep2); //ao clicar no botão "search" executa a função searchCep

// => ponto positivo: faz a consulta de modo síncrono, ou padrão
// => ponto negativo: pode crashar a aplicação caso a api demore ou não dê o retorno esperado. Também não há tratamento de erros e exceções



// BLOCO TRY CATCH
document.querySelector('#submitCep').addEventListener('click', getCep);

async function getCep(){
  const cep = document.querySelector("#cep").value

  const endpoint = `http://viacep.com.br/ws/${cep}/json/`


  try{  
    console.log("Executo na tentativa.")

    let request =  await fetch(endpoint)
    let response =  await request.json()

    document.querySelector("#cep_result").innerHTML = "Buscando o Cep..."

    console.log(request)

     if(request.status === 201){
      document.querySelector("#cep_result").innerHTML = JSON.stringify(response)
     }else{
      console.log("Deu certo não..")
      return
     }

  }catch(error){
    console.log(error)
    console.log("Executo no erro.")
    alert("Não foi possível consultar este formato de CEP..")
  }
}

// => ponto positivo: faz a consulta de modo assíncrona e trata os erros previsíveis, como o status 422.
// => ponto positivo: faz tratamento de execeções, como Tempo Limite do Servidor, que são erros que nossa aplicação não tem como prever.
