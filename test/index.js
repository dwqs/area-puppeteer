const expect = require('chai').expect;

const provinces = require('../provinces');
const pca = require('../pca');
const pcaa = require('../pcaa');

function findElem (arr, val) {
    const t = arr.filter(a => a === val);
    return t.length ? t[0] : -1;
}

describe('中华人民共和国行政区划：', () => {
    it('省级行政区域数据', () => {
        expect(pca['86']).to.deep.equal(provinces['86']);
        expect(pcaa['86']).to.deep.equal(provinces['86']);
        const item = findElem(Object.values(pca['86']), '广东省');
        expect(item === '广东省').to.be.true;
    });

    it('港澳台数据', () => {
        expect(pca['710000']).to.deep.equal(provinces['710100']);
        expect(pca['810000']).to.deep.equal(provinces['810000']);
        expect(pca['820000']).to.deep.equal(provinces['820000']);

        expect(pcaa['710100']).to.deep.equal(provinces['710100']);
        expect(pcaa['810000']).to.deep.equal(provinces['810000']);
        expect(pcaa['820000']).to.deep.equal(provinces['820000']);
    });

    it('市级区域数据', () => {
        const d = {
            '440000': '广东省',
            '650000': '新疆维吾尔自治区',
            '430000': '湖南省'
        }
        let code = findElem(Object.keys(pca['86']), '440000');
        expect(code === '440000').to.be.true;
        expect(Object.values(pca[code]).indexOf('深圳市') > -1).to.be.true;
        expect(Object.values(pcaa[code]).indexOf('深圳市') > -1).to.be.true;

        code = findElem(Object.keys(pca['86']), '650000');
        expect(code === '650000').to.be.true;
        expect(Object.values(pca[code]).indexOf('乌鲁木齐市') > -1).to.be.true;
        expect(Object.values(pcaa[code]).indexOf('乌鲁木齐市') > -1).to.be.true;

        code = findElem(Object.keys(pca['86']), '430000');
        expect(code === '430000').to.be.true;
        expect(Object.values(pca[code]).indexOf('长沙市') > -1).to.be.true;
        expect(Object.values(pcaa[code]).indexOf('长沙市') > -1).to.be.true;
    });

    it('县区数据', () => {
        const d = {
            '440300': '深圳市',
            '650100': '乌鲁木齐市',
            '430100': '长沙市'
        }

        expect(Object.values(pcaa['440300']).indexOf('南山区') > -1).to.be.true;
        expect(Object.values(pcaa['650100']).indexOf('达坂城区') > -1).to.be.true;
        expect(Object.values(pcaa['430100']).indexOf('芙蓉区') > -1).to.be.true;
    });
});

// fix: https://github.com/dwqs/area-data/issues/5
describe('县区数据修复', () => {
    it('139001(定州市)', () => {
        expect(pcaa['139001']).to.not.equal({});
    });

    it('139002(辛集市)', () => {
        expect(pcaa['139001']).to.not.equal({});
    });

    it('419001(济源市)', () => {
        expect(pcaa['419001']).to.not.equal({});
    });

    it('460300(三沙市)', () => {
        expect(pcaa['460300']).to.not.equal({});
    });

    it('460400(儋州市)', () => {
        expect(pcaa['460400']).to.not.equal({});
    });

    it('469001(五指山市)', () => {
        expect(pcaa['469001']).to.not.equal({});
    });

    it('469002(琼海市)', () => {
        expect(pcaa['469002']).to.not.equal({});
    });

    it('469005(文昌市)', () => {
        expect(pcaa['469005']).to.not.equal({});
    });

    it('469006(万宁市)', () => {
        expect(pcaa['469006']).to.not.equal({});
    });

    it('469007(东方市)', () => {
        expect(pcaa['469007']).to.not.equal({});
    });

    it('469021(定安县)', () => {
        expect(pcaa['469021']).to.not.equal({});
    });

    it('469022(屯昌县)', () => {
        expect(pcaa['469022']).to.not.equal({});
    });

    it('469023(澄迈县)', () => {
        expect(pcaa['469023']).to.not.equal({});
    });

    it('469024(临高县)', () => {
        expect(pcaa['469024']).to.not.equal({});
    });

    it('469025(白沙黎族自治县)', () => {
        expect(pcaa['469025']).to.not.equal({});
    });

    it('469026(昌江黎族自治县)', () => {
        expect(pcaa['469026']).to.not.equal({});
    });

    it('469027(乐东黎族自治县)', () => {
        expect(pcaa['469027']).to.not.equal({});
    });

    it('469028(陵水黎族自治县)', () => {
        expect(pcaa['469028']).to.not.equal({});
    });

    it('469029(保亭黎族苗族自治县)', () => {
        expect(pcaa['469029']).to.not.equal({});
    });

    it('469030(琼中黎族苗族自治县)', () => {
        expect(pcaa['469030']).to.not.equal({});
    });

    it('620200(嘉峪关市)', () => {
        expect(pcaa['620200']).to.not.equal({});
    });

    it('659001(嘉峪关市)', () => {
        expect(pcaa['659001']).to.not.equal({});
    });

    it('659002(阿拉尔市)', () => {
        expect(pcaa['659002']).to.not.equal({});
    });

    it('659003(图木舒克市)', () => {
        expect(pcaa['659003']).to.not.equal({});
    });

    it('659004(五家渠市)', () => {
        expect(pcaa['659004']).to.not.equal({});
    });

    it('659006(铁门关市)', () => {
        expect(pcaa['659006']).to.not.equal({});
    });
});