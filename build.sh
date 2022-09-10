#!/bin/bash

source build-details.sh

buildCommonApi
echo API_PACKAGE: $API_PACKAGE

buildNodeJsDemo
buildNestJsDemo
buildBrowserDemo
buildAngularDemo
buildReactDemo
