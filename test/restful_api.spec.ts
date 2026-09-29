import { request, spec } from 'pactum';

request.setBaseUrl('https://api.restful-api.dev');

describe('Testes de integração - RESTful API', () => {

  test('GET - Deve consultar um objeto existente', async () => {
    await spec()
      .get('/objects/7')
      .expectStatus(200)
      .expectJsonLike({
        id: '7',
        name: 'Apple MacBook Pro 16',
      });
  });

  test('GET - Deve listar os objetos', async () => {
    await spec()
      .get('/objects')
      .expectStatus(200);
  });

  test('POST - Deve cadastrar um novo objeto', async () => {
    await spec()
      .post('/objects')
      .withJson({
        name: 'Produto Teste Isabel',
        data: {
          year: 2026,
          price: 100
        }
      })
      .expectStatus(200)
      .expectJsonLike({
        name: 'Produto Teste Isabel'
      });
  });

  test('PUT - Deve atualizar um objeto', async () => {
    const resposta = await spec()
      .post('/objects')
      .withJson({
        name: 'Produto para atualizar',
        data: {
          price: 100
        }
      })
      .expectStatus(200)
      .returns('id');

    await spec()
      .put(`/objects/${resposta}`)
      .withJson({
        name: 'Produto Atualizado Isabel',
        data: {
          price: 150
        }
      })
      .expectStatus(200)
      .expectJsonLike({
        name: 'Produto Atualizado Isabel'
      });
  });

  test('GET - Deve retornar erro para objeto inexistente', async () => {
    await spec()
      .get('/objects/999999999')
      .expectStatus(404);
  });

});