# Deploy Luna to cPanel with GitHub Actions

This guide explains how to deploy the Vite/React site to cPanel hosting automatically whenever you push to the `main` branch. Deployment uses **FTP/FTPS** with three repository secrets: host, username, and password.

## What happens on each deploy

1. GitHub Actions checks out the code.
2. Dependencies are installed and `npm run build` produces the static site in `dist/`.
3. The contents of `dist/` are uploaded to your cPanel account over FTPS (FTP over TLS).

You can also run the workflow manually from the **Actions** tab → **Deploy to cPanel** → **Run workflow**.

---

## Prerequisites

- A GitHub repository with this project pushed to it.
- cPanel hosting with **FTP** access enabled (standard on most shared hosting plans).
- Your site should be served from `public_html/` (default for the main domain). If you use a subdomain or addon domain, note its document root path (see [Change the remote folder](#change-the-remote-folder) below).

---

## Step 1: Find your cPanel FTP credentials

1. Log in to **cPanel**.
2. Open **FTP Accounts** (under *Files*).
3. Use an existing FTP account or create one:
   - **Log in**: your FTP username (often `cpaneluser@yourdomain.com` or just `cpaneluser`).
   - **Password**: set or reset the password and save it somewhere secure.
   - **Directory**: for the main site, set this to `public_html` (or leave the default that points there).
4. Note your **FTP server hostname**. Common values:
   - `ftp.yourdomain.com`
   - Your server hostname from cPanel (e.g. `server123.hostingprovider.com`)

Do **not** include `ftp://` or `https://` in the hostname—only the host name.

---

## Step 2: Add GitHub repository secrets

1. On GitHub, open your repository.
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret** and add these three secrets:

| Secret name | Value | Example |
|-------------|--------|---------|
| `CPANEL_HOST` | FTP server hostname | `ftp.example.com` |
| `CPANEL_USERNAME` | FTP username | `myuser@example.com` |
| `CPANEL_PASSWORD` | FTP password | *(your FTP password)* |

These are the **only required secrets** for deployment.

### Optional secrets (contact form / reCAPTCHA)

The contact form reads Vite env vars at **build time**. If you use EmailJS or reCAPTCHA, add the same keys from `.env.example` as optional secrets so the production build includes them:

| Secret name | Purpose |
|-------------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key |

If you skip these, the site still deploys; only the contact-related features may not work until you add the secrets and redeploy.

---

## Step 3: Push to `main` to deploy

```bash
git add .
git commit -m "Your changes"
git push origin main
```

1. Open the **Actions** tab on GitHub.
2. Select the **Deploy to cPanel** workflow run.
3. Confirm the **Build site** and **Deploy to cPanel via FTP** steps succeed.

Your site should appear at your domain after the workflow finishes (allow a minute for DNS/cache if needed).

---

## Configuration reference

### Change the remote folder

By default, files upload to `public_html/` (main domain). To deploy elsewhere, edit `.github/workflows/deploy-cpanel.yml`:

```yaml
server-dir: ./public_html/
```

Examples:

- Subdomain folder: `./public_html/subdomain/`
- Addon domain with its own root: path shown in cPanel → **Domains** → document root

### FTP vs FTPS

The workflow uses **FTPS** on port **21** (typical for cPanel). If deployment fails with SSL/TLS errors, switch to plain FTP in the workflow:

```yaml
protocol: ftp
port: 21
```

Some hosts use **SFTP** on port **22** with the same username/password; that requires a different action than this workflow. If FTPS and FTP both fail, check with your host which protocol and port they support.

### Deploy branch

Only pushes to `main` trigger deploys. To use another branch, change `branches` under `on.push` in `deploy-cpanel.yml`.

### Manual deploy

**Actions** → **Deploy to cPanel** → **Run workflow** → choose branch → **Run workflow**.

---

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| `Login authentication failed` | Re-check `CPANEL_USERNAME` and `CPANEL_PASSWORD`. Reset the FTP password in cPanel and update the secret. |
| `getaddrinfo ENOTFOUND` | `CPANEL_HOST` is wrong. Use the exact hostname from cPanel FTP Accounts. |
| Connection timeout | Confirm FTP is enabled; try `protocol: ftp` or ask your host for the correct port. |
| Site is blank or 404 | Wrong `server-dir`; ensure it matches the domain’s document root in cPanel. |
| Old files still showing | Clear browser cache or cPanel cache (e.g. LiteSpeed Cache). |
| Contact form broken in production | Add the optional `VITE_*` secrets and redeploy. |

### View deployment logs

**Actions** → failed or successful run → expand **Deploy to cPanel via FTP** for FTP connection and upload details.

---

## Security notes

- Never commit FTP passwords or API keys to the repository. Use GitHub Actions secrets only.
- Prefer a dedicated FTP account limited to `public_html` instead of your main cPanel password.
- Rotate the FTP password periodically and update `CPANEL_PASSWORD` in GitHub.

---

## Files involved

| File | Role |
|------|------|
| `.github/workflows/deploy-cpanel.yml` | CI/CD workflow: build + FTP upload |
| `dist/` | Build output (generated locally and in CI; not committed) |
| `docs/cpanel-deployment.md` | This setup guide |
