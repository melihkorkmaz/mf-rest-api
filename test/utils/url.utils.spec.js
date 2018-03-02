let chai = require('chai');
let expect = chai.expect;

import urlUtils from '../../app/utils/url.utils';

describe('Url Utilities', () => {
    describe('Without HTTP', () => {
        it('should do nothing if no http key in given url is undefined', () => {
            let sample = urlUtils.withoutHTTP();
            expect(sample).to.equal("");
        })

        it('should do nothing if no http key in given url', () => {
            let sample = "www.menufield.com";
            sample = urlUtils.withoutHTTP(sample);
            expect(sample).to.equal("www.menufield.com");
        })

        it('should clear http from given url', () => {
            let sample = "http://www.menufield.com";
            sample = urlUtils.withoutHTTP(sample);
            expect(sample).to.equal("www.menufield.com");
        })
    })

    describe('Without HTTPS', () => {
        it('should do nothing if no https key in given url is undefined', () => {
            let sample = urlUtils.withoutHTTPS();
            expect(sample).to.equal("");
        })

        it('should do nothing if no https key in given url', () => {
            let sample = "www.menufield.com";
            sample = urlUtils.withoutHTTPS(sample);
            expect(sample).to.equal("www.menufield.com");
        })

        it('should clear http from given url', () => {
            let sample = "https://www.menufield.com";
            sample = urlUtils.withoutHTTPS(sample);
            expect(sample).to.equal("www.menufield.com");
        })
    })

    describe('Without HTTP_HTTPS', () => {
        it('should do nothing if no https key in given url is undefined', () => {
            let sample = urlUtils.withoutHTTP_HTTPS();
            expect(sample).to.equal("");
        })

        it('should do nothing if no https key in given url', () => {
            let sample = "www.menufield.com";
            sample = urlUtils.withoutHTTP_HTTPS(sample);
            expect(sample).to.equal("www.menufield.com");
        })

        it('should clear http from given url', () => {
            let sample = "https://www.menufield.com";
            sample = urlUtils.withoutHTTP_HTTPS(sample);
            expect(sample).to.equal("www.menufield.com");
        })
    })

    describe('Host of Url', () => {
        it('should return empty string if given url is undefined', () => {
            let sample = urlUtils.hostOfUrl();
            expect(sample).to.equal("");
        })

        it('should return full hostname of url', ()=> {
            let sample = "http://www.menufield.com/sample";
            sample = urlUtils.hostOfUrl(sample);
            expect(sample).to.equal("www.menufield.com");
        })
    });

    describe('Subname from Url', () => {
        it('should return empty string if given url is undefined', () => {
            let sample = urlUtils.subNameOfUrl();
            expect(sample).to.equal("");
        })

        it('should return full hostname of url', ()=> {
            let sample = "http://www.menufield.com/sample";
            sample = urlUtils.subNameOfUrl(sample);
            expect(sample).to.equal("sample");
        })
    });

    describe('Subdomain', () => {
        it('should return empty string if given url is undefined', () => {
            let sample = urlUtils.subDomain();
            expect(sample).to.equal("");
        })

        it('should return full hostname of url', ()=> {
            let sample = "http://www.menufield.com/sample";
            sample = urlUtils.subDomain(sample);
            expect(sample).to.equal("www");
        })
    });

    describe('Domain', () => {
        it('should return empty string if given url is undefined', () => {
            let sample = urlUtils.domain();
            expect(sample).to.equal("");
        })

        it('should return full hostname of url', ()=> {
            let sample = "http://www.menufield.com/sample";
            sample = urlUtils.domain(sample);
            expect(sample).to.equal("menufield");
        })
    });

    describe('Restaurant Name Key', ()=>{
        it('should return subdomain if restraurant key is a subdomain of menufield', ()=> {
            let sample = "http://dominos.menufield.com";
            let response = urlUtils.restaurantNameKey(sample);
            expect(response).to.equal("dominos");
        })

        it('should return sub path if restraurant key is at after then of menufield domain', ()=> {
            let sample = "http://www.menufield.com/dominos";
            let response = urlUtils.restaurantNameKey(sample);
            expect(response).to.equal("dominos");
        })

        it('should return domain name if url has custom domain name', ()=> {
            let sample = "http://www.dominospizza.com/menu";
            let response = urlUtils.restaurantNameKey(sample);
            expect(response).to.equal("dominospizza");
        })

        it('should return empty string if url doesnt fit above checks', () => {
            let sample = "http://www.menufield.com";
            let response = urlUtils.restaurantNameKey(sample);
            expect(response).to.equal("");
        })
    })

})