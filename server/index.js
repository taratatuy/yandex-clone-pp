const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 10260;
const app = express();

app.get('/', express.static('./dist'));

app.get('/fakeData', (req, res) => {
  res.json({
    avatarLink:
      'https://avatars.mds.yandex.net/get-zen-logos/212539/pub_59354892e3cda85cf4157022_5b339863b5782000a9bb3bcc/36x36_2x',
    cardName: 'Some Fake Name',
    imgLink:
      'https://avatars.mds.yandex.net/get-zen_doc/4355093/pub_60a58ab9ece43e0c8e0c162a_60a5f8902b5fbd2cdf669802/scale_1200',
    cardTitle: 'Some Fake Title',
    cardText:
      'В России заработали новые правила для перевозчиков: теперь неоплативших штрафы ГИБДД иностранных водителей не выпустят из России до погашения долгов',
    cardTimepast: '9 дней назад',
  });
});

app.use(cors());

app.listen(port, () => {
  console.log(`App start on port ${port}`);
});
