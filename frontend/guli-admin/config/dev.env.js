'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""', // empty => same-origin; dev server proxies /admin/edu -> 8110 and /admin/sysuser -> 8120 (see config/index.js proxyTable)
  OSS_PATH: '"https://guli-file-sz190105.oss-cn-beijing.aliyuncs.com"'
})
