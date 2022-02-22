let env = process.env.NODE_ENV
let server = ''
if (env == 'test') { // test 环境
  server = 'http://testtranspay.ouyeelf.com'
} else if (env == 'pre') { // pre 环境

} else if (env == 'pro') { // pro 环境
  
}
const base = {
  env,
  server
}

export default base