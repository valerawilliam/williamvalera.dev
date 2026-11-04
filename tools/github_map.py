#!/usr/bin/env python3
"""Mapa de repositorios · GitHub → index.html

Lee los repositorios con `gh` (cuenta ya autenticada), aplica a cada uno un
nombre público genérico (sin nombre de empresa, hostnames, proveedores ni
productos internos) y reescribe el bloque de index.html que hay entre los
marcadores <!-- GH-MAP:START --> y <!-- GH-MAP:END -->.

La tabla repo → nombre público y la organización se leen de
tools/github-map.private.json (privado, en .gitignore). Un repo que no esté en
la tabla se avisa y se omite: así nunca se filtra un nombre interno por error.

Uso:  python3 tools/github_map.py          # regenera el bloque
      python3 tools/github_map.py --dry    # solo muestra el resumen
"""
import json, re, subprocess, sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / 'index.html'
PRIVADO = ROOT / 'tools' / 'github-map.private.json'   # {"org": "...", "repos": {nombre: {dom, es, en, caso, tech}}}
REPO_PUBLICO = 'https://github.com/valerawilliam/williamvalera.dev'

# Dominios (orden de salida) ------------------------------------------------
DOMINIOS = {
    'comercio': {'es': 'Comercio y web', 'en': 'Commerce & web'},
    'compras':  {'es': 'Compras y retail', 'en': 'Purchasing & retail'},
    'datos':    {'es': 'Datos y ERP', 'en': 'Data & ERP'},
    'it':       {'es': 'IT, operación y dirección', 'en': 'IT, operations & management'},
    'ia':       {'es': 'IA y método', 'en': 'AI & method'},
}


MESES_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
MESES_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def gh_repos(org):
    out = subprocess.run(
        ['gh', 'repo', 'list', org, '--limit', '200', '--json',
         'name,isPrivate,isArchived,primaryLanguage,pushedAt'],
        check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def bi(es, en):
    return f'<span class="l-es">{esc(es)}</span><span class="l-en">{esc(en)}</span>'


def main():
    dry = '--dry' in sys.argv
    if not PRIVADO.exists():
        sys.exit(f'Falta {PRIVADO.name}: la tabla repo → nombre público es privada y no está en el repositorio.')
    priv = json.loads(PRIVADO.read_text(encoding='utf-8'))
    PUBLICO = {k: (v['dom'], v['es'], v['en'], v['caso'], v['tech']) for k, v in priv['repos'].items()}
    repos = [r for r in gh_repos(priv['org']) if not r['isArchived']]
    by_name = {r['name']: r for r in repos}

    desconocidos = sorted(set(by_name) - set(PUBLICO))
    ausentes = sorted(set(PUBLICO) - set(by_name))
    for n in desconocidos:
        print(f'AVISO: repo sin nombre público, se omite: {n}')
    for n in ausentes:
        print(f'AVISO: repo de la tabla que ya no existe en GitHub: {n}')

    hoy = datetime.now(timezone.utc)
    hace30 = hoy - timedelta(days=30)
    items = []
    for name, (dom, t_es, t_en, caso, tech) in PUBLICO.items():
        r = by_name.get(name)
        if not r:
            continue
        lang = (r.get('primaryLanguage') or {}).get('name') or ''
        pushed = datetime.fromisoformat(r['pushedAt'].replace('Z', '+00:00'))
        items.append({
            'dom': dom, 'es': t_es, 'en': t_en, 'caso': caso,
            'tech': tech or lang or '—', 'lang': lang,
            'activo': pushed >= hace30, 'private': r['isPrivate'],
        })

    n_repos = len(items)
    n_activos = sum(1 for i in items if i['activo'])
    langs = sorted({i['lang'] for i in items if i['lang']})
    from collections import Counter
    top_lang, top_n = Counter(i['lang'] for i in items if i['lang']).most_common(1)[0]
    n_doms = len({i['dom'] for i in items})
    assert all(i['private'] for i in items), 'Todos los repos deben ser privados'

    print(f'{n_repos} repos · {n_doms} dominios · {len(langs)} lenguajes ({", ".join(langs)}) · {n_activos} activos en 30 días')
    if dry:
        for i in items:
            print(f"  [{i['dom']:8}] {i['es']:55} {i['tech']:22} {i['caso'] or ''}")
        return

    d = date.today()
    f_es = f'{d.day} {MESES_ES[d.month - 1]} {d.year}'
    f_en = f'{d.day} {MESES_EN[d.month - 1]} {d.year}'

    # Cifras
    cifras = [
        (str(n_repos), 'repositorios privados', 'private repositories'),
        (str(n_doms), 'dominios de negocio', 'business domains'),
        (top_lang, f'lenguaje principal ({top_n} de {n_repos})', f'main language ({top_n} of {n_repos})'),
        (f'{n_activos}/{n_repos}', 'con cambios en los últimos 30 días', 'changed in the last 30 days'),
    ]
    h = ['<!-- GH-MAP:START · generado por tools/github_map.py · no editar a mano -->',
         '    <div class="ghmap reveal" id="ghmap">',
         '      <div class="ghmap-head">',
         '        <p class="ghmap-k mono">' + bi('Mapa de repositorios · GitHub', 'Repository map · GitHub') + '</p>',
         '        <h3>' + bi('Lo que hay detrás de los casos: el código, por dominio.', 'What sits behind the cases: the code, by domain.') + '</h3>',
         '        <p class="ghmap-l">' + bi(
             'Todos los proyectos viven en repositorios privados con historial, documentación y despliegue reproducible. Aquí se listan con nombres genéricos; los nombres internos no se publican.',
             'Every project lives in a private repository with history, documentation and reproducible deployment. They are listed here under generic names; internal names are not published.') + '</p>',
         '      </div>',
         '      <div class="ghmap-stats" role="list">']
    for v, es, en in cifras:
        h.append(f'        <div class="ghmap-stat" role="listitem"><b>{esc(v)}</b><span>{bi(es, en)}</span></div>')
    h.append('      </div>')
    h.append('      <div class="ghmap-grid">')
    for key, nombre in DOMINIOS.items():
        grupo = [i for i in items if i['dom'] == key]
        if not grupo:
            continue
        h.append('        <div class="ghmap-dom">')
        h.append(f'          <p class="ghmap-dn mono">{bi(nombre["es"], nombre["en"])} <i>{len(grupo)}</i></p>')
        h.append('          <ul>')
        for i in grupo:
            link = ''
            if i['caso']:
                num = i['caso'].split('-')[1]
                link = f' <a class="ghmap-go mono" href="#{i["caso"]}" aria-label="Caso {num} / Case {num}">→ {num}</a>'
            h.append(f'            <li><span class="ghmap-t">{bi(i["es"], i["en"])}</span><span class="ghmap-x mono">{esc(i["tech"])}</span>{link}</li>')
        h.append('          </ul>')
        h.append('        </div>')
    h.append('      </div>')
    h.append('      <p class="ghmap-f mono">' + bi(
        f'Sincronizado desde GitHub el {f_es}. Repositorios privados: se muestran dominio, propósito y tecnología, nunca el contenido.',
        f'Synced from GitHub on {f_en}. Private repositories: domain, purpose and technology are shown, never the contents.') + '</p>')
    h.append(f'    <p class="ghmap-f mono ghmap-src">' + bi('Código de esta web, público:', 'The code of this site, public:') + f' <a href="{REPO_PUBLICO}" target="_blank" rel="noopener">github.com/valerawilliam/williamvalera.dev</a></p>')
    h.append('    </div>')
    h.append('    <!-- GH-MAP:END -->')
    bloque = '\n'.join(h)

    src = INDEX.read_text(encoding='utf-8')
    pat = re.compile(r'<!-- GH-MAP:START.*?<!-- GH-MAP:END -->', re.S)
    if pat.search(src):
        nuevo = pat.sub(lambda m: bloque, src, count=1)
    else:
        # Primera vez: justo después del desplegable «Ver N sistemas más» de #casos
        ancla = '    </details>\n  </div>\n</section>\n\n<div class="seam"'
        assert ancla in src, 'No encuentro el final de #casos para insertar el bloque'
        nuevo = src.replace(ancla, '    </details>\n' + bloque + '\n  </div>\n</section>\n\n<div class="seam"', 1)
    if nuevo != src:
        INDEX.write_text(nuevo, encoding='utf-8')
        print(f'index.html actualizado ({n_repos} repos en el mapa)')
    else:
        print('index.html sin cambios')


if __name__ == '__main__':
    main()
