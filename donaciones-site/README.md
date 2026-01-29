# Donaciones - Sitio independiente

Este folder contiene una versión independiente de la página de donaciones para YAG3R.

Instrucciones rápidas:

1. Crea un nuevo repositorio en GitHub (por ejemplo `yag3r-donaciones`).
2. Copia el contenido de este folder al nuevo repositorio:

```bash
git init
git add .
git commit -m "Initial donaciones site"
git remote add origin git@github.com:TU_USUARIO/yag3r-donaciones.git
git push -u origin main
```

3. En el repositorio nuevo, ve a `Settings → Pages` y verifica que GitHub Pages publique desde la rama `gh-pages` (la action `deploy.yml` creará/actualizará `gh-pages`).

4. Configura DNS: añade un registro CNAME para `donaciones` apuntando a `TU_USUARIO.github.io` o sigue las instrucciones del proveedor de dominios. El archivo `CNAME` ya contiene `donaciones.yag3r.cm`.

5. Si quieres que la página use `styles.css` y `script.js`, copia `styles.css`, `script.js` y `YAG3R_Gaming.ico` al mismo folder antes de push.

Notas:
- GitHub Pages solamente permite un dominio personalizado por repositorio. Mantener `donaciones.yag3r.cm` en un repo separado evita conflictos con tu dominio principal.
