import _ from 'lodash'

function safe_parse(tar){
    function _attemptParse(tar){
        return _.attempt(JSON.parse,tar)
    }
    function _judgeResult(result){
        return _.isError(result) ? false : result
    }
    function _handle(result){
        return result ? result : undefined
    }

    return _.flow(_attemptParse,_judgeResult,_handle)(tar)
}

function promiseExecute(cb,...func){
    Promise.all(func,() => cb)
}
export {
    promiseExecute,
    safe_parse
}
