let chai = require('chai');
let expect = chai.expect;

import itemsData from './data/productItems.json';
import menufieldCommon from '../../app/utils/menufield.common';

describe('Common', () => {

    describe('Replace', () => {
        it('Should replace all text with given key', () => {
            let fakeText = "this is a fake text of fake";
            fakeText = menufieldCommon.replace(fakeText)('fake')('replaced');
            expect(fakeText).to.equal("this is a replaced text of replaced");
        });
    });

    describe('Render product props', () => {
        it('Should render empty object for undefined props', () => {
            const res = menufieldCommon.setProductPropsForRender();
            expect(res).to.be.empty;
        })

        it('Should render standard props', () => {
            const res = menufieldCommon.setProductPropsForRender(itemsData.items[0].properties);
            expect(res).has.property('Pieces', '12 Pieces ($10.49)');
            expect(res).has.property('Wing Sauce', 'Mild');
            expect(res).has.property('Extra Blue Cheese', 'Yes');
        });

        it('Should render checkbox props', () => {
            const res = menufieldCommon.setProductPropsForRender(itemsData.items[1].properties);
            expect(res).has.property('Dressing Options', 'Bleu Cheese');
            expect(res).has.property('Add Extra', 'Gorgonzola, Feta Cheese, Goat Cheese');
            expect(res).has.property('Add Extra Dressing', 'Yes');
            expect(res).has.property('No Onion', 'Yes');
        });

        it('Should render pizza product props', () => {
            const res = menufieldCommon.setProductPropsForRender(itemsData.items[2].properties);
            
            expect(res).has.property('Size', 'Medium 14" ($9.49)');
            expect(res).has.property('Crust Options', 'Thick Crust');
            expect(res).has.property('Additional Topping for Whole Pizza', 'Onion, Hot Oil, Green Peppers');
            expect(res).has.property('Additional Topping for 1st Half', 'Bacon, Artichokes, Anchovies');
            expect(res).has.property('Additional Topping for 2nd Half', 'Sun-Dried Tomatoes, Zucchini, Shrimp');
            
        })
    })

})