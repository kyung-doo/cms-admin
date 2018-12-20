
class StringUtils {

    static parsePhoneNumber ( phones ) {
        return phones[0]+"-"+phones[1]+"-"+phones[2]
    }
}


class ObjectUtils {

    static clone ( obj ) {
        if (obj === null || typeof(obj) !== 'object')
        return obj;

        var copy = obj.constructor();

        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
            }
        }

        return copy;
    }
}

export {
    StringUtils,
    ObjectUtils
}
