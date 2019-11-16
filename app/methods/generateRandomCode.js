function getRandom (n, m) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
}

function generateRandomCode(){
    let upperCaseStart = 65
    let lowerCaseStart = 97
    const LENGTH = 26 - 1 // 从0计数
    
    let randomCode = Array(8).fill().reduce((sum,_,i) => {
        if((i & 1) == 0){
            let num = getRandom(0,1)
            sum += `${num}`
        }
        else {
           
            let flag = sum[sum.length - 1]
            sum = sum.slice(0,sum.length - 1)
            let randomNum = flag == 0 ? getRandom(upperCaseStart,upperCaseStart + LENGTH) : getRandom(lowerCaseStart,lowerCaseStart + LENGTH)
            sum += String.fromCharCode(randomNum)
        }
        return sum
    },'')

    return randomCode
}

module.exports = generateRandomCode