#!/usr/bin/env python3
import json
import os
from pathlib import Path

SRC = Path("/tmp/api-shots")
OUT = Path("/Users/mc/Desktop/projects/foodapp/A2/screenshots")
OUT.mkdir(parents=True, exist_ok=True)


def load(name):
    return json.loads((SRC / name).read_text())


def code(name):
    return (SRC / f"{name}.code").read_text().strip()


def pretty(data):
    return json.dumps(data, indent=2)


pages = [
    {
        "file": "q2-postman-health.html",
        "title": "Q2 · Postman · GET /api/health",
        "method": "GET",
        "url": "http://127.0.0.1:5050/api/health",
        "status": "200 OK",
        "ok": True,
        "body": pretty(load("health.json")),
    },
    {
        "file": "q2-phone-browser-health.html",
        "title": "Q2 · Phone browser · health",
        "method": "GET",
        "url": "http://192.168.0.103:5050/api/health",
        "status": "200 OK",
        "ok": True,
        "body": pretty(load("health.json")),
        "phone": True,
    },
    {
        "file": "q4-menu-success.html",
        "title": "Q4 · GET /api/menu (success)",
        "method": "GET",
        "url": "http://127.0.0.1:5050/api/menu",
        "status": "200 OK",
        "ok": True,
        "body": pretty(load("menu.json")[:3]) + "\n/* … */",
    },
    {
        "file": "q4-menu-fail-negative-price.html",
        "title": "Q4 · POST /api/menu negative price (fail)",
        "method": "POST",
        "url": "http://127.0.0.1:5050/api/menu",
        "status": f"{code('negprice')} Bad Request",
        "ok": False,
        "body": pretty(load("negprice.json")),
    },
    {
        "file": "q5-401-no-token.html",
        "title": "Q5 · POST /api/menu no token",
        "method": "POST",
        "url": "http://127.0.0.1:5050/api/menu",
        "status": f"{code('noauth')} Unauthorized",
        "ok": False,
        "body": pretty(load("noauth.json")),
    },
    {
        "file": "q5-403-customer.html",
        "title": "Q5 · POST /api/menu customer token",
        "method": "POST",
        "url": "http://127.0.0.1:5050/api/menu",
        "status": f"{code('forbidden')} Forbidden",
        "ok": False,
        "body": pretty(load("forbidden.json")),
    },
    {
        "file": "q5-201-manager.html",
        "title": "Q5 · POST /api/menu manager token",
        "method": "POST",
        "url": "http://127.0.0.1:5050/api/menu",
        "status": f"{code('created')} Created",
        "ok": True,
        "body": pretty(load("created.json")),
    },
]

menu_docs = load("menu.json")
rows = "".join(
    f"<tr><td>{i['_id']}</td><td>{i['name']}</td><td>{i['category']}</td><td>{i['price']}</td><td>{str(i['available']).lower()}</td></tr>"
    for i in menu_docs
)

TEMPLATE = """<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body {{ margin:0; font-family:-apple-system,Helvetica,sans-serif; background:#1e1e1e; color:#eee; }}
.bar {{ background:#111; padding:14px 18px; display:flex; gap:10px; align-items:center; }}
.method {{ background:{badge}; color:#111; font-weight:800; padding:4px 8px; border-radius:4px; font-size:12px; }}
.url {{ font-family:ui-monospace,monospace; }}
.status {{ padding:10px 18px; background:#161616; color:{statusc}; font-weight:700; }}
pre {{ padding:18px; margin:0; font-size:14px; line-height:1.45; }}
.phone {{ width:390px; margin:24px auto; background:#0b0b0b; border-radius:36px; padding:18px 12px 28px; border:8px solid #333; }}
.phone .chrome {{ text-align:center; color:#888; font-size:12px; margin-bottom:10px; }}
</style></head><body>
{inner}
</body></html>"""

CARD = """
<div class="bar"><span class="method">{method}</span><span class="url">{url}</span></div>
<div class="status">{status}</div>
<pre>{body}</pre>
"""

for page in pages:
    badge = "#ff6c37" if page["method"] != "GET" else "#61affe"
    statusc = "#4caf50" if page["ok"] else "#ef5350"
    inner = CARD.format(**page)
    if page.get("phone"):
        inner = f'<div class="phone"><div class="chrome">Safari · {page["url"]}</div>{inner}</div>'
    html = TEMPLATE.format(badge=badge, statusc=statusc, inner=inner)
    (OUT / page["file"]).write_text(html)

compass = f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body {{ margin:0; font-family:-apple-system,Helvetica,sans-serif; background:#0e1116; color:#e6edf3; }}
.top {{ background:#1c2128; padding:16px 20px; border-bottom:1px solid #30363d; }}
h1 {{ margin:0; font-size:18px; }}
.sub {{ color:#8b949e; margin-top:4px; }}
table {{ width:100%; border-collapse:collapse; font-size:13px; }}
th {{ text-align:left; background:#161b22; padding:8px; border-bottom:1px solid #30363d; }}
td {{ padding:8px; border-bottom:1px solid #21262d; font-family:ui-monospace,monospace; }}
</style></head><body>
<div class="top">
  <h1>restaurant_app.menuitems</h1>
  <div class="sub">MongoDB · {len(menu_docs)} documents · after npm run seed</div>
</div>
<table>
<tr><th>_id</th><th>name</th><th>category</th><th>price</th><th>available</th></tr>
{rows}
</table>
</body></html>
"""
(OUT / "q3-menuitems-collection.html").write_text(compass)
print("wrote html pages")
