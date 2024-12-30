# napi-cli
> Image compress cli.

## usage
```shell
# png compress
nci .tmp/01.png -o .tmp/01-compressed.png

# output webp with quality 70(.tmp/01.webp)
nci .tmp/01.jpeg -f webp -q 70 -v

# same naming
nci .tmp/01.png -q 70 -v
```