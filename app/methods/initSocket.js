module.exports = async (redis) => {
    console.log('init')
    await redis.get('pubs').set('clientCount',0)
}