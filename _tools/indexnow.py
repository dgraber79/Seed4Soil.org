"""Tell Bing and the other IndexNow search engines which pages changed.

Usage (run from the site root, after the push has deployed, about a minute):
    python -I -X utf8 _tools/indexnow.py                 pages changed in the last commit
    python -I -X utf8 _tools/indexnow.py --since abc123  pages changed since commit abc123
    python -I -X utf8 _tools/indexnow.py --all           every page in sitemap.xml
    python -I -X utf8 _tools/indexnow.py about faq       just these pages

The key file <KEY>.txt in the site root proves to the engines that we own the domain.
"""
import json, re, subprocess, sys, urllib.request, urllib.error

HOST = "www.seed4soil.org"
KEY = "7d3b27d0f058bf9de85d0b258b7c9939"
ENDPOINT = "https://api.indexnow.org/indexnow"  # shared by Bing, Yandex, Seznam, Naver
UA = {"User-Agent": "curl/8.0"}


def url_for(page):
    page = page.strip("/")
    if page.endswith(".html"):
        page = page[:-5]
    return f"https://{HOST}/" + ("" if page == "index" else page)


def sitemap_urls():
    req = urllib.request.Request(f"https://{HOST}/sitemap.xml", headers=UA)
    return re.findall(r"<loc>(.*?)</loc>", urllib.request.urlopen(req).read().decode())


def changed_urls(since):
    files = subprocess.run(["git", "diff", "--name-only", since, "HEAD"],
                           capture_output=True, text=True, check=True).stdout.split()
    pages = [f for f in files if f.endswith(".html") and "/" not in f and f != "404.html"]
    # a change to the shared nav/footer, stylesheet or images touches every page
    if any(f in ("nav.js", "styles.css") or f.startswith("images/") for f in files):
        return sitemap_urls()
    return [url_for(p) for p in pages]


args = sys.argv[1:]
if args[:1] == ["--all"]:
    urls = sitemap_urls()
elif args[:1] == ["--since"]:
    urls = changed_urls(args[1])
elif args:
    urls = [url_for(a) for a in args]
else:
    urls = changed_urls("HEAD~1")

if not urls:
    sys.exit("No page changes to report.")

body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt",
                   "urlList": urls}).encode()
req = urllib.request.Request(ENDPOINT, data=body, method="POST",
                             headers={**UA, "Content-Type": "application/json; charset=utf-8"})
try:
    status = urllib.request.urlopen(req).status
except urllib.error.HTTPError as e:
    status = e.code
meaning = {200: "accepted", 202: "accepted (key check pending)", 400: "bad request",
           403: "key not valid / key file not found", 422: "URLs don't match the host", 429: "too many requests"}
print(f"IndexNow: {status} {meaning.get(status, '')} for {len(urls)} URL(s)")
for u in urls:
    print("  " + u)
