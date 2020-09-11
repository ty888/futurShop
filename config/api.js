const apiMap = {
  hdk: `https://v2.api.haodanku.com/`,
  dtk: `https://openapi.dataoke.com/`,
}

const genApi = prefix => {
  return apiMap[prefix]
}

module.exports = genApi
