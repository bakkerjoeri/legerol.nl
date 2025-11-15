#!/bin/bash

if ! command -v exiftool >/dev/null 2>&1
then
    echo "exiftool could not be found. Did you install it?"
    exit 1
fi


exiftool src/**/*.JPEG -ext JPEG -d "%Y%m%d_%H%M%S%%-c.%%e" "-filename<CreateDate"
exiftool -all= -tagsFromFile @ -DateTimeOriginal -ColorSpaceTags -Orientation -overwrite_original src/**/*JPEG
