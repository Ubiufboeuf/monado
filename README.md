# Monado - docs
(si, como la de xenoblade :P)

## Instalación (Web)

```sh
git clone https://github.com/Ubiufboeuf/monado.git # Clonar repositorio
cd monado # Moverte a la carpeta del proyecto
bun install # Instalar las dependencias del proyecto
bun dev # Levantar la web (:4321)
bun dev --host # Levanta la web (:4321) y habilita el uso de la IP y monado.dev.local (por httpd)
```

<!-- ### Servidor -->
<!-- ```sh
git clone https://github.com/Ubiufboeuf/monado-server.git # Clonar repositorio
cd monado-server # Moverte a la carpeta del proyecto
bun install # Instalar las dependencias del proyecto
bun dev # Levantar la web (:4321)
``` -->

## Conseguir videos

Para poder conseguir los videos para monado creé un proyecto aparte, [`yt-media-kit`](https://github.com/Ubiufboeuf/yt-media-kit).

Este es un set de herramientas que te permite:
- Descargar videos de youtube, además de conseguir información y assets de estos, usando `yt-dlp`.
- Crear diferentes resoluciones de los videos con `ffmpeg`.
- Crear streams de datos con `MP4Box`.

## Instalación ([`yt-media-kit`](https://github.com/Ubiufboeuf/yt-media-kit))

(El proyecto soporta tanto `pnpm` como `bun`.)

```sh
git clone https://github.com/Ubiufboeuf/yt-media-kit.git # Clonar repositorio
cd yt-media-kit # Moverte a la carpeta del proyecto
bun install # Instalar las dependencias del proyecto

bun start # Iniciar el proyecto
bun run build:cli # O compilar el proyecto para conseguir un ejecutable sin Node o Bun
```

### Uso simple

Primer ejecuta el proyecto con `bun start` o compila el proyecto con `bun run build:cli` para crear un ejecutable, y luego simplemente sigue la CLI interactiva.

![Imagen de la primera pantalla de la CLI interactiva de yt-media-kit](/public/repo/image.png)

Si quieres ver más a profundidad cómo usar [`yt-media-kit`](https://github.com/Ubiufboeuf/yt-media-kit), te recomiendo ver el [README del proyecto](https://github.com/Ubiufboeuf/yt-media-kit#yt-media-kit%20docs).
