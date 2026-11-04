#!/usr/bin/env python3
"""Copia el contenido de la web principal (index.html) a la versión System OS (blackbox/bb-data.js).

Una sola fuente de verdad: capacidades, proyectos y puesto actual se editan en index.html
y este script los publica para el cubo. Ejecutar tras cada cambio de contenido:

    python3 tools/sync_system_os.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = (ROOT / 'index.html').read_text(encoding='utf-8')


def bi(fragment):
    """Extrae el par ES/EN de un fragmento con spans l-es / l-en."""
    es = re.search(r'<span class="l-es">(.*?)</span><span class="l-en">', fragment, re.S)
    en = re.search(r'<span class="l-en">(.*?)</span>', fragment, re.S)
    clean = lambda t: html.unescape(re.sub(r'<[^>]+>', '', t)).strip()
    if es and en:
        return {'es': clean(es.group(1)), 'en': clean(en.group(1))}
    t = clean(fragment)
    return {'es': t, 'en': t}


def items(block):
    return [bi(li) for li in re.findall(r'<li>(.*?)</li>', block, re.S)]


caps = []
for block in re.findall(r'<article class="cap[" ].*?</article>', SRC, re.S):
    caps.append({
        'n': re.search(r'class="cap-n mono">(\d+)<', block).group(1),
        'title': bi(re.search(r'<h3>(.*?)</h3>', block, re.S).group(1)),
        'lead': bi(re.search(r'<p class="cap-l">(.*?)</p>', block, re.S).group(1)),
        'items': items(re.search(r'<ul>(.*?)</ul>', block, re.S).group(1)),
        'tech': html.unescape(re.search(r'<p class="cap-t mono">(.*?)</p>', block).group(1)),
    })

projects = []
for block in re.findall(r'<article class="pc reveal"[^>]*>.*?</article>', SRC, re.S):
    projects.append({
        'tag': bi(re.search(r'<p class="pc-tag mono">\d+ · (.*?)</p>', block, re.S).group(1)),
        'title': bi(re.search(r'<h3>(.*?)</h3>', block, re.S).group(1)),
        'desc': bi(re.search(r'<p class="pc-d">(.*?)</p>', block, re.S).group(1)),
        'result': bi(re.search(r'<p class="pc-r">(.*?)</p>', block, re.S).group(1)),
        'details': [{'k': bi(k), 'v': bi(v)} for k, v in re.findall(r'<summary class="mono">(.*?)</summary><p>(.*?)</p>', block, re.S)],
        'tech': html.unescape(re.search(r'<p class="pc-t mono">(.*?)</p>', block).group(1)),
    })

# Puesto actual: áreas con sus puntos
job = re.search(r'<article class="job reveal">(.*?)</article>', SRC, re.S).group(1)
areas = []
for h, ul in re.findall(r'<h4 class="mono">(.*?)</h4>\s*<ul>(.*?)</ul>', job, re.S):
    areas.append({'h': bi(h), 'items': items(ul)})
current = {
    'title': bi(re.search(r'<h3>(.*?)</h3>', job, re.S).group(1)),
    'summary': bi(re.search(r'<p class="summary">(.*?)</p>', job, re.S).group(1)),
    'areas': areas,
}

# Trayectoria completa: los dos puestos en Arte Regal y los anteriores
jobs = []
for block in re.findall(r'<article class="job reveal">(.*?)</article>', SRC, re.S):
    yrs = re.search(r'<span class="years">(.*?)</span></div>', block, re.S) or re.search(r'<span class="years">(.*?)</span>', block, re.S)
    lis = re.findall(r'<li>(.*?)</li>', block, re.S)
    jobs.append({'years': bi(yrs.group(1)), 'title': bi(re.search(r'<h3>(.*?)</h3>', block, re.S).group(1)),
                 'org': html.unescape(re.search(r'<p class="job-org">(.*?)</p>', block).group(1)),
                 'summary': bi(re.search(r'<p class="summary">(.*?)</p>', block, re.S).group(1)),
                 'items': [bi(li) for li in lis]})
past = []
for block in re.findall(r'<li class="pj">(.*?)</li>\s*(?=<li class="pj">|</ol>)', SRC, re.S):
    when = re.search(r'<div class="pj-when mono">(.*?)<small>(.*?)</small>', block, re.S)
    past.append({'years': when.group(1).strip(), 'place': html.unescape(when.group(2)),
                 'title': bi(re.search(r'<h4>(.*?)</h4>', block, re.S).group(1)),
                 'org': html.unescape(re.search(r'<p class="pj-org">(.*?)</p>', block).group(1)),
                 'items': items(re.search(r'<ul>(.*)</ul>', block, re.S).group(1))})

data = {'caps': caps, 'projects': projects, 'current': current, 'jobs': jobs, 'past': past}
out = ROOT / 'blackbox' / 'bb-data.js'
out.write_text('// Generado por tools/sync_system_os.py a partir de index.html. No editar a mano.\n'
               'window.BB_DATA = ' + json.dumps(data, ensure_ascii=False, indent=1) + ';\n', encoding='utf-8')
print(f'{len(caps)} capacidades · {len(projects)} proyectos · {len(jobs)} puestos + {len(past)} anteriores → {out.relative_to(ROOT)}')
