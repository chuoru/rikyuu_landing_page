# rikyuu_landing_page

Static site for 利休ロボティクス (Rikyu Robotics), sourced from a **Claude Design**
project and deployed to Xserver hosting via GitHub Actions. There is no build
step — the pages are plain HTML/CSS/JS served as-is.

- Branch that's live: `html`
- Claude Design project: `038448d0-a2e9-4fd1-b988-b6ffaff375f0` ("Landing page
  recreation") — use the `DesignSync` tool against this `projectId`.
- Live site: https://rikyurobotics.com
- Deploy: `.github/workflows/deploy.yml` runs on every push to `html` — SSHes
  into Xserver (`appleboy/ssh-action`, secrets `SSH_HOSTNAME`/`SSH_USERNAME`/
  `SSH_PRIVATE_KEY`/`DEPLOY_PATH`, port 10022) and runs `git pull origin html`.
  No `workflow_dispatch`, so re-running a failed run needs `gh run rerun <id>`.

## The recurring task: "sync+commit+push"

When asked to sync, pull whatever changed in the Claude Design project into
this repo, verify it locally, commit, and push (which triggers the deploy).
This has been done many times — treat it as a mechanical, repeatable
procedure, not a redesign.

### 1. Check what changed

- `DesignSync list_files` on the project to catch newly added pages/assets.
- `DesignSync get_file` each of the six `.dc.html` pages and diff against
  disk (after applying the rewrites below) — most syncs touch only one or
  two pages.
- Also check `support.js`, `image-slot.js`, `doc-page.js`, the `_ds/` CSS/JS
  bundle, `public/rikyuu_no_text.jpeg`, and `.image-slots.state.json` — these
  are usually unchanged but have broken silently before (see gotchas below).

### 2. Filename/link rewrites

The Design project's pages reference each other by their `.dc.html` name.
Apply these as plain substring replacements (longest/most-specific first)
before writing any page to disk, and to every other page too (nav links,
`<a href>`, JS-embedded hrefs):

| Design project path | Local file |
| --- | --- |
| `Blog Article.dc.html` | `blog-article.html` |
| `Rikyu Robotics.dc.html` | `index.html` |
| `Rikyu Catalog.dc.html` | `rikyu-catalog.html` |
| `Rikyu Lab.dc.html` | `rikyu-lab.html` |
| `Blog.dc.html` | `blog.html` |
| `Product Detail.dc.html` | `product-detail.html` |

After rewriting, `grep -rn "\.dc\.html" *.html` must return nothing.

### 3. Never sync (confirmed unreferenced scratch)

`list_files` always lists a bunch of design-tool scratch that is not part of
the real site. Do not pull these unless you've freshly confirmed (via grep
across all six pages) that something now references them:

- `scraps/`, `screenshots/`, `.thumbnail`, `Mobile Preview.html`
- `Blog Cover A/B/C.dc.html`, `Rikyu Robotics-print-*.dc.html`
- `_ds/.../README.md`, `_ds_manifest.json`, `_adherence.oxlintrc.json`
- `uploads/catalog.pdf`, `uploads/IMG_3794.PNG`,
  `uploads/Rikyu Robotics.backup.html`, and any stray screenshot not
  referenced by a page
- Asset variants with a `-v2`/`-v3` suffix are **not automatically scratch**
  — the page sometimes switches to the versioned file (this has happened:
  `assets/booth-v3.png` is the one actually used, not `booth.png`). Always
  grep the current page content for the exact filename before excluding one.

### 4. Verify before committing

- `node --check` on every JS file.
- `grep -rn "\.dc\.html" *.html` (must be empty).
- Local smoke test: `npx --yes serve -l <port> .` then `curl -L` every
  changed/added path, including non-ASCII ones (see the Unicode gotcha —
  `curl` from bash mangles Japanese filenames typed directly; rely on shell
  glob expansion or percent-encoded URLs instead).

### 5. Commit, push, confirm deploy

Commit message prefix `sync: pull latest design from Claude Design project`
(or a `fix:` prefix for a bug fix), trailer:
```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: <this session's URL>
```
Push to `html`, then `gh run list --branch html --limit 1` and, once it
shows `completed`, `curl` a couple of the changed live URLs to confirm.

If the Action fails with `dial tcp ...: i/o timeout` — this is a known
transient Xserver connectivity blip, not a config problem. Just
`gh run rerun <run-id>` once.

## Gotchas (all discovered the hard way — read before touching sync)

### `DesignSync get_file` caps at 256KB — check `truncated` before writing

`get_file` silently returns a **truncated** `content` when the real file is
bigger than ~256KB (large images, videos, and the `.image-slots.state.json`
sidecar all hit this). Truncation corrupts base64 mid-stream, so writing it
to disk unchecked produces an invalid/corrupt file that silently breaks
things (this happened once: it corrupted `.image-slots.state.json` and broke
*every* `<image-slot>` on the site until it was restored from git history).

**Always check the `truncated` field** in the tool result (or on the
persisted-to-file wrapper JSON when the output is too large to show inline)
before writing fetched content to disk. If `truncated: true`, you cannot
recover the file through this tool — ask the user to export/download the
file from the Claude Design project themselves and drop it into the repo
(same folder it belongs in: `uploads/`, `assets/`, or repo root for
`.image-slots.state.json`). This has worked reliably every time it's been
asked.

### `.image-slots.state.json` — what it is and how to shrink the risk

`<image-slot id="...">` is a drag-and-drop image placeholder used inside the
Claude Design canvas; the dropped image is stored as a base64 data URL in
this one sidecar JSON file, keyed by slot id. It is real content (not
scratch) and must be synced — but because it's a single growing file, it's
the thing most likely to hit the 256KB cap above.

When a slot's data is present and NOT truncated (check via a bounded grep
like `grep -oE '"myId":\{[^}]{0,60}'` rather than loading the whole file —
see below), consider **converting it to a static `<img>`** instead of
leaving it as an `<image-slot>`:
1. Extract the slot's base64 payload from `.image-slots.state.json` (decode,
   detect the mime type from the `data:image/<ext>;base64,` prefix, write
   to `assets/<name>.<ext>`).
2. Replace `<image-slot id="X" ...></image-slot>` in the page with a plain
   `<img src="assets/<name>.<ext>" ...>` using the same
   `position:absolute;inset:0;width:100%;height:100%;object-fit:cover`
   styling the page already applies to filled image-slots.
3. Delete that key from `.image-slots.state.json` to shrink it.

This has already been done for `rdImg`/`customImg` (now
`assets/rd-research.webp`/`assets/custom-product.webp`) and the design
project itself later did the same for `lab4`/`lab7` (now
`assets/booth-v3.png`/`assets/exhibit-deburring.png`, still pending because
those two source files are themselves over the 256KB cap and need a manual
add from the user).

**Never load `.image-slots.state.json` (or any file with embedded base64)
into a shell command or `console.log` without redirecting to a file first.**
The embedded base64 is huge and the harness will echo/dump it back into your
context. Use `grep -o` with a bounded quantifier (`{0,80}`) to peek at a
specific key, or write a node script that only prints short
summaries/lengths, never the payload itself, to a file you then `Read`.

### Japanese filenames: NFC vs NFD (dakuten/handakuten characters)

Files uploaded through Claude Design with a dakuten/handakuten kana in the
name (e.g. グ, デ, ボ, ド, プ) are stored **NFD-normalized** (decomposed:
base kana + a separate combining U+3099/U+309A mark), not the NFC form you'd
normally type. Any filename you type directly — in a tool call, in bash, in
an `<img src>` you author by hand — gets NFC-normalized somewhere in the
pipeline, so it silently doesn't match the real file and `get_file`/`fetch`
404s even though `list_files` displays what looks like the identical string.

Symptom: `get_file` (or a live `curl`) 404s on a filename that's clearly
right there in `list_files`. Fix: build the path with explicit `\uXXXX`
escapes for the NFD-decomposed form and pass that as the `path` argument —
JSON `\u` escapes survive where typed/copied Japanese text doesn't:
```js
// figure out the exact NFD codepoints once, e.g.:
node -e "console.log([...'展示会ワインロボ.mp4'.normalize('NFD')].map(c=>c.codePointAt(0).toString(16)))"
// then hand-build: 'uploads/\u5c55\u793a\u4f1a\u30ef\u30a4\u30f3\u30ed\u30db\u3099.mp4'
```
Same issue affects `<img src>`/`<video src>` values authored in the HTML
itself when a page is regenerated from freshly-fetched design content — the
raw fetch may come back with a literal (NFC) Japanese filename in the
markup while the actual uploaded file on disk is NFD. **After writing any
page, verify every `uploads/...`/`assets/...` reference resolves to an
exact on-disk filename** (byte-for-byte, not just visually) before
committing — a small node script comparing `fs.readdirSync()` entries
against the extracted references catches this immediately. Where it
mismatches, rewrite the reference as a percent-encoded exact-byte path
(`encodeURIComponent` of the real on-disk name), which is immune to further
normalization.

### Large binaries break `git push` — use scp instead

GitHub's push endpoint has timed out (`HTTP 408`) uploading ~50MB of pack
data dominated by a couple of video files, even after raising
`http.postBuffer`/`http.lowSpeedLimit`/forcing HTTP/1.1 — this connection's
upload bandwidth just can't finish the transfer before GitHub's server-side
timeout. Retrying doesn't help once the payload is large.

**Fix**: don't put large media through git at all.
1. Add the file pattern to `.gitignore` (see the existing `uploads/*.mp4`
   entry).
2. `git rm --cached` it if it was already staged/committed-but-unpushed
   (`git commit --amend` is fine here since the commit was never pushed —
   confirm with `git rev-parse origin/html` first).
3. `scp` it directly to the server instead, using the credentials below.
4. Push the now-small commit normally; the deployed file and the
   git-tracked files end up in the same directory on the server, so the
   site works identically even though the video never went through git.

SSH/scp to Xserver (private key `xb922489.key` lives at repo root,
gitignored — ask the user for it if missing, never commit it):
```
ssh -i ./xb922489.key -p 10022 xb922489@xb922489.xbiz.jp
scp -i ./xb922489.key -P 10022 <local-file(s)> xb922489@xb922489.xbiz.jp:<DEPLOY_PATH>/uploads/
```
`DEPLOY_PATH` = `/home/xb922489/rikyurobotics.com/public_html` (same value as
the `DEPLOY_PATH` GitHub secret). Use shell glob expansion
(`uploads/*.mp4`) rather than typing the Japanese filename, for the same
NFC/NFD reason as above.

### `bash`/`node -e` and Windows paths

Use forward slashes in file paths passed to `node -e`/scripts, even on
Windows (`C:/Users/...` not `C:\Users\...`) — backslash-letter sequences
inside a JS string literal (`\U`, `\p`, `\t`...) get interpreted as escape
characters and corrupt the path.

## Repository layout notes

- `index.html`, `blog.html`, `blog-article.html`, `product-detail.html`,
  `rikyu-lab.html`, `rikyu-catalog.html` — the six pages, one per
  `.dc.html` design file (see rewrite table above).
- `support.js` — generated `dc-runtime` bundle, required by every page.
- `image-slot.js`, `doc-page.js` — required custom-element runtimes (drag-
  drop image placeholders; paged-document shell used by
  `rikyu-catalog.html`). Not scratch, despite living outside `_ds/`.
- `_ds/design-system-65c02697-ef27-46be-8e5a-6373ad35a1d7/` — design-system
  CSS/JS, loaded by every page's `<head>`. Has been stable across many
  syncs; still worth a quick diff check each time.
- `.image-slots.state.json` — see gotcha above.
- `.design-sync-state.json` — a small manually-maintained note (not consumed
  by any automation); update `lastSyncedAt` and `knownGaps` after each sync.
- `scripts/setup-github-secrets.ps1` — one-time helper for setting the four
  GitHub secrets via `gh secret set`.

`DesignSync` needs interactive authorization per session (`/design-login`) —
this only works in an interactive session with the user present, not in an
unattended/scheduled context. A previous attempt at a scheduled sync routine
was abandoned for this reason; sync is manual, on request, every time.
