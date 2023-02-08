async function searchAddress(cep) {
  var errorMessage = document.getElementById("erro");
  errorMessage.innerHTML = "";
  try {
    // debugger;
    var CEPConsult = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var CEPConsultConverted = await CEPConsult.json();
    if (CEPConsultConverted.erro) {
      throw Error("CEP inexistente!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");
    var bairro = document.getElementById("bairro");

    cidade.value = CEPConsultConverted.localidade;
    logradouro.value = CEPConsultConverted.logradouro;
    estado.value = CEPConsultConverted.uf;
    bairro.value = CEPConsultConverted.bairro;

    return CEPConsultConverted;
  } catch (error) {
    errorMessage.innerHTML = `<p>CEP inválido. Tente novamente</p>`;
    console.log(error);
  }
}

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => searchAddress(cep.value));
