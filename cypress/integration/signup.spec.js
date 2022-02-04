import signup from "../pages/SignupPage";
import SignupFactory from "../factories/SignupFactory";
import SignupPage from "../pages/SignupPage";
describe("SignUp", () => {
  /*    beforeEach(function()  {
        cy.fixture("deliver").then((massa)=> {
            this.deliver = massa
        })
    }); */

  it("User should be deliver", function () {
    var deliver = SignupFactory.deliver();

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    const expectedMessage =
      "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.";
    signup.modalContentShouldBe(expectedMessage);
  });

  it("Incorrect document", function () {
    var deliver = SignupFactory.deliver();
    deliver.cpf = "005987251xx";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe("Oops! CPF inválido");
  });

  it("Incorrect email", function () {
    var deliver = SignupFactory.deliver();
    deliver.email = "abc.com.br";

    signup.go();
    signup.fillForm(deliver);
    signup.submit();
    signup.alertMessageShouldBe("Oops! Email com formato inválido.");
  });

  context("Required fields", function () {
    const messages = [
      { field: "name", output: "É necessário informar o nome" },
      { field: "cpf", output: "É necessário informar o CPF" },
      { field: "email", output: "É necessário informar o email" },
      { field: "postalcode", output: "É necessário informar o CEP" },
      { field: "number", output: "É necessário informar o número do endereço" },
      { field: "delivery_method", output: "Selecione o método de entrega" },
      { field: "cnh", output: "Adicione uma foto da sua CNH" },
    ];

    before(function () {
      SignupPage.go();
      SignupPage.submit();
    });

    messages.forEach(function (msg) {
      it(`${msg.field} is required`, function () {
        SignupPage.alertMessageShouldBe(msg.output);
      });
    });
  });


});

/*  before(() => {
        cy.log('Tudo é executado uma única vez ANTES de TODOS os casos de testes')
        
    });

    after(() => {
        cy.log('Tudo é executado uma única vez DEPOIS de TODOS os casos de testes')
    });

    beforeEach(() => {
        cy.log('Tudo é executado sempre ANTES de CADA caso de teste')
    });

    afterEach(() => {
        cy.log('Tudo é executado sempre DEPOIS de CADA caso de teste')
    }); */
