# Release

This document describes the release process.

The release process will publish the artifact, the content of the generated
static site on the release page of the GitHub repository.

The artifact is `site.tar.gz`, a TAR archive. The file contains all the files
under `_site`. When you extract the archive, the content will be extracted
into the current directory. For example, `_site/index.html` will be extracted
as `./index.html`. When you extract the archive on your local machine, be sure
to create `_site` directory and `cd` in it.

```console
> mkdir _site
> cd _site
> tar -xf path/to/site.tar.gz
```

## Release process

The process is implemented as a GitHub Actions, and automated. See
[.github/workflows/release.yml](../.github/workflows/release.yml).

When you are ready to release, or deploy the site content, tag a branch,
usually, `master`. The tag name must be start with `v`, e.g.  `v1.0.0`.

When a branch is tagged, the `release.yml` runs the release process.

The tagged commit is built, and static files under `_site` are archived as
`site.tar.gz`, and the file is published on the release page.

## Deploying the released site

To deploy the static site, simply download the released `site.tar.gz` and
extract the file into document *root* directory of the web server. Note that
the archive does not include `_site` directory.
