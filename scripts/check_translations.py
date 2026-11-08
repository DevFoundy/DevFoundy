"""Check every HTML page for shared controls and complete Japanese copy.
Run from any directory: python3 scripts/check_translations.py
Code syntax, proper names and email addresses keep their original spelling.
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'assets/language.js').read_text()
start = source.index('{', source.index('const translations'))
translations, _ = json.JSONDecoder().raw_decode(source[start:])
KEEP = {'DevFoundy', 'DevFoundy.', 'Kenta.', 'Dani', 'Danidev',
        'StageWrite Studio', 'KineticForm', 'JARVIS', 'DebateAI', 'Midpoint',
        'Little World / AI Town', 'KineticPeak', 'SiteDoctor', 'CuePilot', 'RepoLens'}
VOID = {'meta', 'link', 'img', 'input', 'br', 'hr', 'source', 'wbr'}
IGNORE = {'script', 'style', 'svg', 'code', 'pre'}

class Copy(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.missing = set()

    def check(self, value):
        text = re.sub(r'\s+', ' ', value).strip()
        if not re.search('[A-Za-z]', text) or '@' in text or text in KEEP:
            return
        if text not in translations:
            self.missing.add(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        if not IGNORE.intersection(self.stack):
            for name in ('aria-label', 'title', 'placeholder', 'alt'):
                if attrs.get(name): self.check(attrs[name])
            if tag == 'meta' and (attrs.get('name') == 'description' or attrs.get('property') in ('og:title', 'og:description')):
                self.check(attrs.get('content', ''))

    def handle_endtag(self, tag):
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack) - self.stack[::-1].index(tag) - 1]

    def handle_data(self, text):
        if not IGNORE.intersection(self.stack): self.check(text)

errors = []
pages = sorted(ROOT.rglob('*.html'))
for page in pages:
    html = page.read_text()
    parser = Copy()
    parser.feed(html)
    relative = page.relative_to(ROOT)
    if parser.missing: errors.append(f'{relative}: missing {sorted(parser.missing)}')
    if html.count('assets/language.js?v=3') != 1: errors.append(f'{relative}: missing shared language script')
    if html.count('class="language-toggle"') != 1: errors.append(f'{relative}: missing language button')
    if 'assets/language.css?v=3' not in html: errors.append(f'{relative}: missing Japanese styles')
    prefix = '../' if page.parent.name == 'blog' else ''
    if f'src="{prefix}assets/language.js?v=3"' not in html: errors.append(f'{relative}: broken script path')
assert not errors, '\n'.join(errors)
print(f'PASS: all {len(pages)} pages have complete Japanese copy, language controls, and valid shared script paths ({len(translations)} translations).')
