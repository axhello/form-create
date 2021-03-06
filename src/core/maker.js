import {creatorFactory} from "../factory/creator";
import componentList from './componentList';
import {extend, isUndef, uniqueId} from "./util";

const maker = (() => {

    let _m = {};

    Object.keys(componentList).forEach(key => {
        const component = componentList[key];

        const undef = isUndef(component.maker);

        if (undef || component.maker[component.name] === undefined)
            _m[component.name] = creatorFactory(component.name);

        if (!undef)
            extend(_m, component.maker);
    });

    const commonMaker = creatorFactory('');

    extend(_m, {
        create(type, field) {
            let make = commonMaker('', field);
            make.rule.type = type;
            return make;
        },
        createTmp(template, vm, field) {
            let make = commonMaker('', field);
            make.rule.type = 'template';
            make.rule.template = template;
            make.rule.vm = vm;
            return make;
        }
    });
    _m.template = _m.createTmp;

    return _m;
})();

export default maker;
