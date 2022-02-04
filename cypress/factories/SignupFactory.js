var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default{
    deliver: function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whastapp: '64996474879',
            address: {
              postalcode: '72897900',
              street: 'Alameda Mamoré',
              number: 'C02',
              details: 'Apt 2004',
              district: 'Alphaville Brasília',
              city_state: 'Cidade Ocidental/GO'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}