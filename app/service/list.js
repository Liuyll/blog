const Service = require('egg').Service
const _ = require('lodash')

module.exports = class List extends Service {

    async getLists() {

        const {
            ctx,
            app
        } = this

        const redis = await app.redis.get('work')
        var lists = await ctx.model.Menu.aggregate().project({ id: '$_id', group: 1, pid: 1 })

        var listNewFlag = await redis.get('listNewFlag')
        var cachedLists

        if(listNewFlag === '0'){

            cachedLists = await redis.get('lists')
            if(cachedLists){
                return cachedLists
            }
            
        }
       
        // if(cachedLists) return JSON.parse(cachedLists)

        // eslint-disable-next-line
        return sort(lists)

        function sort(lists) {
            var helpMap = {} //映射id到二元组

            var currentTuple
            // console.log('emit')
            var parent = {}
            var listmap = {}
            var reallyKey //parent really key(currentTupleKey)
            listmap = new Proxy(listmap, {
                get(target, key) {
                    var newkey = helpMap[key]
                    return Reflect.get(target, newkey)
                }
            })

            _.map(lists, (list) => {
                currentTuple = JSON.stringify({ name: list.group, id: list.id })
                if (!listmap[currentTuple]) {

                    helpMap[list.id] = currentTuple
                    listmap[currentTuple] = {}
                }

                if (list.pid) {
                    // console.log('pid='+list.pid)
                    if (!(reallyKey = helpMap[list.pid])) {
                        reallyKey = _.map(lists, (v) => {
                            if (v.id == list.pid) {
                                reallyKey = JSON.stringify({ name: v.group, id: v.id })
                            }
                        })
                        helpMap[list.pid] = reallyKey
                        listmap[list.pid] = { [currentTuple]: listmap[list.pid] }
                    } else {
                        listmap[list.pid][currentTuple] = listmap[list.id]
                    }
                }
                else {
                    if (!helpMap[list.id]) {
                        currentTuple = JSON.stringify({ name: list.group, id: list.id })
                        helpMap[list.id] = currentTuple
                        listmap[currentTuple] = {}
                        parent[currentTuple] = listmap[list.id]
                    }
                    else {
                        parent[currentTuple] = listmap[list.id]
                    }
                }
            })

            redis.set('lists', JSON.stringify(parent))
            redis.set('listNewFlag',0)

            return parent

        }

    }

    async addList({ pid, group }) {
        const { ctx, logger ,app } = this
        const { model: {
            Menu
        } } = ctx

        const redis = app.redis.get('work')
        try {
            if (pid != 'null') {
                await new Menu({
                    pid, group
                }).save()
            }

            else {
                await new Menu({
                    group
                }).save()
            }

            await redis.set('listNewFlag',1)
            return true
        } catch (error) {
            console.log(error)
            logger.error(error)
        }
    }
}