#!/bin/bash
# Registers the "ours" merge driver used by .gitattributes to protect our
# Axion Communications Platform branding assets from being overwritten when
# merging updates from upstream (irontec/ivozprovider). Run once per clone.
set -e
git config merge.ours.driver true
echo "merge.ours.driver registered for this clone."
