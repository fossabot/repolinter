#!/usr/bin/env node
// Copyright 2017 TODO Group. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

const path = require('path')
const repolinter = require('..')

if (process.argv[2] === '--git') {
  const git = require('simple-git')()
  const { v4: uuidv4 } = require('uuid');
  const rimraf = require('rimraf')
  const tmpDir = path.resolve(process.cwd(), 'tmp', uuidv4())

  git.clone(process.argv[3], tmpDir, (error) => {
    if (!error) {

      if (process.argv[4] === '--rulefile') {
        const jsonfile = require('jsonfile')
        var jsonRuleset = jsonfile.readFileSync(process.argv[5])
        repolinter.lint(tmpDir, [],  jsonRuleset)
      }
      else {
        repolinter.lint(tmpDir)
      }

    }
    rimraf(tmpDir, function () {})
  })
} else  if (process.argv[2] === '--rulefile') {

  const jsonfile = require('jsonfile')
  var jsonRuleset = jsonfile.readFileSync(process.argv[3])
  repolinter.lint(process.cwd(), [],  jsonRuleset)

} else {
  repolinter.lint(path.resolve(process.cwd(), process.argv[2] || '.'))
}
