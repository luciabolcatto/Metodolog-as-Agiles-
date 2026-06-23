// Generated from: features\iniciar-partida.feature
import { test } from "playwright-bdd";

test.describe('Iniciar partida', () => {

  test('El jugador ve la palabra enmascarada y las vidas al iniciar', async ({ Given, Then, And, page }) => { 
    await Given('una partida con la palabra "GATO"', null, { page }); 
    await Then('se ve la palabra "_ _ _ _"', null, { page }); 
    await And('se ven 6 vidas', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\iniciar-partida.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Dado una partida con la palabra \"GATO\"","stepMatchArguments":[{"group":{"start":27,"value":"\"GATO\"","children":[{"start":28,"value":"GATO","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Entonces se ve la palabra \"_ _ _ _\"","stepMatchArguments":[{"group":{"start":17,"value":"\"_ _ _ _\"","children":[{"start":18,"value":"_ _ _ _","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Y se ven 6 vidas","stepMatchArguments":[{"group":{"start":7,"value":"6"},"parameterTypeName":"int"}]}]},
]; // bdd-data-end