let TOPIC_ID_INIT = 1
const topics = []
class Topic {
    constructor(params) {
        if(!params.title || !params.content || !params.creator) {
            throw new Error('creator and content and title required')
        }
        console.log(params.creator,'creator')
        this.creator = params.creator
        this.title = params.title
        this.content = params.content
        this._id = TOPIC_ID_INIT++
        this.replyList = []
    }

}
async function createNewTopic(params) {
    const topic = new Topic(params)
    topics.push(topic)
    return topic
}
async function getTopics() {
    return topics
}
async function getTopicById(id) {
    return topics.find(v => v._id === +id)
}
async function updateTopicById({id,newInfo}) {
    let idx = topics.findIndex(v => v._id === +id)
    let newTopic = {
        ...topics[idx],
        ...newInfo
    }
    topics.splice(idx,1,newTopic)
    return newTopic
}
async function reply(userId,params) {
    let topic = topics.find(v => v._id === +params.topicId)
    topic.replyList.push({
        creator: userId,
        content: params.content
    })
    return topic
}
module.exports = {
    model: Topic,
    createNewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    reply
}