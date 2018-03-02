import R from 'ramda';

import menufieldCommon from './menufield.common';

const urlUtils = {
  withoutHTTP: url => (url
    ? menufieldCommon.replace(url)('http://')('')
    : ''),

  withoutHTTPS: url => (url
    ? menufieldCommon.replace(url)('https://')('')
    : ''),

  withoutHTTP_HTTPS: url => R.compose(urlUtils.withoutHTTP, urlUtils.withoutHTTPS)(url),

  hostOfUrl: url => urlUtils.withoutHTTP_HTTPS(url).split('/')[0],

  subNameOfUrl: url => urlUtils.withoutHTTP_HTTPS(url).split('/')[1] || '',

  subDomain: url => urlUtils.hostOfUrl(url).split('.')[0],
  domain: url => urlUtils.hostOfUrl(url).split('.')[1] || '',

  restaurantNameKey: (url) => {
    const domain = urlUtils.domain(url);
    const subDomain = urlUtils.subDomain(url);
    return (domain === 'menufield')
      ? (subDomain === 'www' ? urlUtils.subNameOfUrl(url) : subDomain)
      : domain;
  },

};

export default urlUtils;
