/* global Chart */

function getRelation(relation) {
  const matrix = ['現役メンバー', '元メンバー', 'メンバーの家族', 'メンバーの知人', 'その他'];
  return matrix[relation];
}

function getFavorite(favorite) {
  const matrix = ['好意的', 'どちらでもない', '否定的'];
  return matrix[favorite];
}

function getGender(gender) {
  const matrix = ['男性', '女性'];
  return matrix[gender];
}

document.querySelector('main h1').innerHTML = sessionStorage.getItem('name');
document.querySelector('.relation').innerHTML = getRelation(sessionStorage.getItem('relation'));
document.querySelector('.favorite').innerHTML = getFavorite(sessionStorage.getItem('favorite'));
document.querySelector('.gender').innerHTML = getGender(sessionStorage.getItem('gender'));
document.querySelector('.age').innerHTML = sessionStorage.getItem('age');

const answers = [
  ['name', 'favorite', 'relation', 'gender', 'age'],
  ['q001', 'q002', 'q003', 'q004', 'q005', 'q006', 'q007', 'q008', 'q009', 'q010', 'q011', 'q012', 'q013', 'q014', 'q015'],
  ['q016', 'q017', 'q018', 'q019', 'q020', 'q021', 'q022', 'q023', 'q024', 'q025'],
  ['q026', 'q027', 'q028', 'q029', 'q030', 'q031', 'q032'],
  ['q033', 'q034', 'q035', 'q036', 'q037', 'q038', 'q039', 'q040', 'q041', 'q042'],
  ['q043', 'q044', 'q045', 'q046', 'q047', 'q048', 'q049', 'q050', 'q051', 'q052', 'q053', 'q054', 'q055', 'q056', 'q057', 'q058', 'q059', 'q060'],
  ['q061', 'q062', 'q063', 'q064', 'q065', 'q066', 'q067', 'q068', 'q069', 'q070'],
  ['q071', 'q072', 'q073', 'q074', 'q075', 'q076', 'q077', 'q078', 'q079', 'q080', 'q081', 'q082', 'q083', 'q084', 'q085', 'q086', 'q087'],
  ['q088', 'q089', 'q090', 'q091', 'q092', 'q093'],
  ['q094', 'q095', 'q096', 'q097', 'q098', 'q099', 'q100', 'q101', 'q102', 'q103', 'q104', 'q105', 'q106', 'q107', 'q108', 'q109', 'q110', 'q111', 'q112', 'q113', 'q114'],
];

const indicator = [];
indicator[0] = 0;
for (let i = 1; i < answers.length; i += 1) {
  indicator[i] = 0;
  for (let j = 0; j < answers[i].length; j += 1) {
    const value = sessionStorage.getItem(answers[i][j]);
    if (value) {
      indicator[i] += parseInt(value, 10);
    } else {
      indicator[i] += 0;
    }
  }
  indicator[0] += indicator[i];
}

// 得点を調整
const favorite = parseInt(sessionStorage.getItem('favorite'), 10);
const regulation = [37, 5, 3, 2, 3, 6, 3, 6, 2, 7];
for (let i = 0; i < regulation.length; i += 1) {
  if (favorite === 0) {
    indicator[i] += regulation[i];
  } else if (favorite === 2) {
    indicator[i] -= regulation[i];
  }
}

// スコア
const scores = [
  {
    check: 50, warning: 79, danger: 109, max: 342,
  },
  {
    check: 15, warning: 22, danger: 30, max: 45,
  },
  {
    check: 10, warning: 15, danger: 20, max: 30,
  },
  {
    check: 7, warning: 11, danger: 14, max: 21,
  },
  {
    check: 10, warning: 15, danger: 20, max: 30,
  },
  {
    check: 18, warning: 27, danger: 35, max: 54,
  },
  {
    check: 10, warning: 15, danger: 20, max: 30,
  },
  {
    check: 17, warning: 26, danger: 34, max: 51,
  },
  {
    check: 6, warning: 10, danger: 12, max: 18,
  },
  {
    check: 17, warning: 26, danger: 34, max: 63,
  },
];

for (let i = 0; i < indicator.length; i += 1) {
  let evaluation = 'ふつう';
  let color = 'bg-primary';
  if (indicator[i] > scores[i].danger) {
    evaluation = '非常に不健康';
    color = 'bg-danger';
  } else if (indicator[i] > scores[i].warning) {
    evaluation = '不健康';
    color = 'bg-warning';
  } else if (indicator[i] > scores[i].check) {
    evaluation = 'やや不健康';
    color = 'bg-success';
  }

  const pv = Math.round((indicator[i] / scores[i].max) * 100, 1);
  const elements = document.querySelectorAll(`.evaluation-${i}`);
  elements.forEach((element) => {
    element.innerHTML = evaluation;
  });

  const indicatorElements = document.querySelectorAll(`.indicator-${i}`);
  indicatorElements.forEach((indicatorElement) => {
    indicatorElement.innerHTML = `${indicator[i]}点`;
  });

  const progressValueElements = document.querySelectorAll(`.progress-value-${i}`);
  progressValueElements.forEach((progressValueElement) => {
    progressValueElement.setAttribute('valuenow', pv);
    progressValueElement.classList.add(color);
    progressValueElement.style.width = `${pv}%`;
  });
}

const ctx = document.getElementById('hagaChart');
const myChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['入脱会', '信教・思想', '通信・居住', '性・子ども', '健康・文化的生活', '民主教育', '組織の民主制', 'プライバシー', 'その他'],
    datasets: [
      {
        data: [
          100, 100, 100, 100, 100, 100, 100, 100, 100,
        ],
        label: '非常に不健康',
        backgroundColor: 'rgba(255, 0, 0, 0.03)',
        borderColor: 'rgba(255, 0, 0, 0.03)',
        fill: true,
        order: 40,
      },
      {
        data: [
          69, 70, 71, 70, 67, 70, 69, 72, 56,
        ],
        label: '不健康',
        backgroundColor: 'rgba(255, 255, 0, 0.1)',
        borderColor: 'rgba(255, 255, 0, 0.1)',
        fill: true,
        order: 30,
      },
      {
        data: [
          51, 53, 57, 53, 52, 53, 53, 61, 43,
        ],
        label: 'やや不健康',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
        order: 20,
      },
      {
        data: [
          36, 37, 38, 37, 35, 37, 36, 39, 29,
        ],
        label: 'ふつう',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        borderColor: 'rgba(0, 0, 255, 0.2)',
        fill: true,
        order: 10,
      },
      {
        data: [
          Math.round((indicator[1] / scores[1].max) * 100),
          Math.round((indicator[2] / scores[2].max) * 100),
          Math.round((indicator[3] / scores[3].max) * 100),
          Math.round((indicator[4] / scores[4].max) * 100),
          Math.round((indicator[5] / scores[5].max) * 100),
          Math.round((indicator[6] / scores[6].max) * 100),
          Math.round((indicator[7] / scores[7].max) * 100),
          Math.round((indicator[8] / scores[8].max) * 100),
          Math.round((indicator[9] / scores[9].max) * 100),
        ],
        label: '回答',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderCapStyle: 'butt',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 3,
        fill: false,
        order: 0,
      },
    ],
  },
  options: {
    scales: {
      r: {
        min: 0,
        max: 100,
        backgroundColor: 'white',
        grid: {
          color: 'grey',
        },
        angleLines: {
          color: 'green',
        },
        pointLabels: {
          color: 'black',
        },
      },
    },
  },
});
