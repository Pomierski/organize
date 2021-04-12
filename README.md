# Organize - CLI for organizing files

Organize moves files into created directories, which are named according to the purpose of the file.  

![enter image description here](https://i.imgur.com/K4ZSKAy.gif)

## How to use
- `npm install -g git+https://github.com/Pomierski/organize.git`
- `organize`

## Categories
 Files which belong to these categories will be organized
- Images `jpg, jpeg, png, jp2, j2k, jpf, jpx, jpm, mj2, heif, heic, arw, cr2, nrw, k25, tiff, tif, bmp, dib, jpe, jif, jfif, jfi, gif, webp`
- Icons `svg, svgz, ico`
- Documents `txt, pdf, doc, docx, docm, dot, dotx, pages, uof, odt, xls, xlsx, xps, ods, ppt, pptx, odp, epub, gslides, key, keynote, pez, pot, pps, ppt, pptx, prz, sdd, show, sti, sxi`
- Music `mp3, wav, m4a, flac, wma, aac, ogg, oga, mogg, opus, 3gp`
- Videos `webm, ogv, gifv, rm, amv, mpeg, mp4, mov`
- Movies `vob, drc, rmvb, mkv, flv, wmv, amv, avi`
- Archives `zip, rar, 7z, bz2, gz, tar`

## Options

- `-i, --ignore [category or categories]` - Ignore files from one or many categories e.g `organize -i 'videos'` or `organize -i 'videos, movies, music'`
- `-o, --only [category]` - Organize files by only one category, e.g `organize -o 'videos'` will organize only files which belong to the category
- `-e, --extension [file extension]` - Organize files with specified extension, e.g `organize -e 'webm'`
- `-c, --custom [new category, file extension]` - Organize files with extension not included in categories, e.g `organize -e 'Javascript, js'`