const companies = ["_11BIT", "ALIOR", "ALLEGRO", "AMREST", "ASBIS", "ASSECOPOL", "AUTOPARTN", "BENEFIT", "BOGDANKA", "BUDIMEX", "BUMECH", "CCC", "CDPROJEKT", "CIECH", "COMARCH", "CYFRPLSAT", "DATAWALK", "DEVELIA", "DINOPL", "DOMDEV", "ENEA", "EUROCASH", "FAMUR", "GPW", "GRUPAAZOTY", "GRUPRACUJ", "HANDLOWY", "HUUUGE", "INGBSK", "INTERCARS", "JSW", "KERNEL", "KETY", "KGHM", "KRUK", "LIVECHAT", "MABION", "MBANK", "MERCATOR", "MILLENNIUM", "MOBRUK", "NEUCA", "ORANGEPL", "PEKAO", "PEP", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PKPCARGO", "PZU", "SANPL", "SELVITA", "STSHOLDING", "TAURONPE", "TSGAMES", "WIRTUALNA", "XTB", "ZEPAK"];

const prices = {};

companies.forEach(company => {
  prices[company] = document.querySelector(`#${company} .price`);
});

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    companies.forEach(company => {
      prices[company].innerHTML = data[company] + "zł";
    });
  })
  .catch(error => {
    console.error('Error while retrieving or processing JSON data:', error);
  });