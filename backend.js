const axios = require('axios');
const fs = require('fs');

async function fetchData() {
  try {
    const contents = fs.readFileSync('data.txt', 'utf-8').split('\n');

    const tel = {};

    for (let l = 0; l < contents.length; l++) {
      const url = `https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=${contents[l]}`;
      const response = await axios.get(url);
      const html = response.data;

      const title_index = html.indexOf('profilLast">');
      const start_index = title_index + 'profilLast">'.length;
      const end_index = html.indexOf("zł</div>", start_index);
      const title = html.slice(start_index, end_index);

      tel[contents[l].trim()] = parseFloat(title.trim().replace(',', '.').replace('1&nbsp;', ''));
    }

    fs.writeFileSync('data.json', JSON.stringify(tel, null, 2), 'utf-8');

    const posortowane = Object.entries(tel).sort((a, b) => a[1] - b[1]);

    for (const [symbol, price] of posortowane) {
      console.log(`${symbol} price: ${price} zł`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

setInterval(fetchData, 60000);