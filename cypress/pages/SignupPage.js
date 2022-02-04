class SignupPage {
  go() {
    cy.visit('/');
    cy.get('a[href="/deliver"]').click();
    cy.get("#page-deliver form h1").should(
      "have.text",
      "Cadastre-se para  fazer entregas"
    );
  }

  // A função fillForm() irá preencher todo o formulário de cadastro de entregador
  fillForm(deliver) {
    //Preenchendo dados pessoais
    cy.get('input[name="fullName"]').type(deliver.name);
    cy.get('input[name="cpf"]').type(deliver.cpf);
    cy.get('input[name="email"]').type(deliver.email);
    cy.get('input[name="whatsapp"]').type(deliver.whastapp);

    //Preenchendo endereço
    cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
    cy.get('input[type="button"][value="Buscar CEP"]').click();
    cy.get('input[type="text"][name="address-number"]').type(
      deliver.address.number
    );
    cy.get('input[type="text"][name="address-details"]').type(
      deliver.address.details
    );

    //Validando que o endereço que foi preenchido automaticamente está correto
    cy.get('input[type="text"][name="address"]').should(
      "have.value",
      deliver.address.street
    );
    cy.get('input[type="text"][name="district"]').should(
      "have.value",
      deliver.address.district
    );
    cy.get('input[type="text"][name="city-uf"]').should(
      "have.value",
      deliver.address.city_state
    );

    //Selecionando metodo de entrega
    cy.contains(".delivery-method li", deliver.delivery_method).click();

    //Upload arquivo
    cy.get('input[accept^="image"]').attachFile("/images/" + deliver.cnh);
  }

  submit() {
    cy.get('form button[type="submit"][class="button-success"]').click();
  }

  modalContentShouldBe(expectedMessage) {
    cy.get(".swal2-container .swal2-html-container").should(
      "have.text",
      expectedMessage
    )
  }

    alertMessageShouldBe(expectedMessage) {
        //cy.get(".alert-error").should("have.text", expectedMessage);
        cy.contains('.alert-error' , expectedMessage).should('be.visible')
    }
}

//Informando a exportação com o new antes do nome da classe significa que exportamos a classe já criando nova instância. Logo, não será preciso na página de cadastro
//inserir a instancia: var signup = new SignupPage();
export default new SignupPage;
