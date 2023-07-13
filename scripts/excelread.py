import pandas as pd
from jinja2 import Template, Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('./', encoding='utf8'))
tmpl = env.get_template('templates/index.html')

df = pd.read_excel('data/haga.xlsx')
df = df.fillna('')
for index, row in df.iterrows():
  record = dict()
  record['current'] = row['ファイル名']
  record['next'] = row['次のファイル名']
  record['type'] = row['type']
  record['name'] = row['名称']
  if len(record['name']) > 0:
    record['title'] = record['name'] + ' | 集団健康度チェック'
  else:
    record['title'] = '集団健康度チェック'
  record['header'] = row['ヘッダー']
  if len(row['選択肢']) > 0:
    record['choices'] = row['選択肢'].split(',')
  else:
    record['choices'] = ''

  rendered = tmpl.render(record)

  with open(f'docs/{record["current"]}.html', 'w') as f:
    f.write(rendered)
