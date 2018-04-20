var app = getApp();
const Api = require("./api/api.js");
Page({
  data: {
    //图片地址
    imagePath: "../../images",
    userInfo: "",
    planId:0,
    inputShowed: false, //搜索框
    showModal: false,  //模态框
    //主页记录 头像暂时用自己的头像代替
    messageList: {
      id: "1", headPic: "", name: "余鸿靖", date: "04-06", time: "19:42", address: "重庆师范大学", content: "每天都要坚持跑步呀",
      contentPic: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1903028679,3782879263&fm=27&gp=0.jpg",
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2285804361,334155081&fm=27&gp=0.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      ],
      message: "566", attention: [false, 666]
    },
    // 评论内容
    commentNumber:0,
    comment:[
      {id: "1",headPic:"",name:"Alice",time:"",address:"重庆师范大学",content:"加油一起跑步吧",commentBody:[false]},
      { id: "2", headPic: "", name: "Jack", time: "", address: "哈佛大学", content: "每天都要坚持跑步啊", commentBody: [false]},
      { id: "3", headPic: "", name: "Lucy", time: "", address: "山东蓝翔学院", content: "我就是不爱跑步", commentBody: [true, "Jack", "每天都要坚持跑步啊"]}
    ],
    showModal: false,  //模态框
    inputFocus:false //input键盘焦点
  },
  //预览图片
  viewPic: function (e) {
    var picUrl = e.currentTarget.dataset.src; //获得图片地址
    wx.previewImage({
      current: picUrl, // 当前显示图片的http链接
      urls: this.data.messageList.contentPic
    })
  },
  //留言
  haveComment:function(){
    this.setData({
      inputFocus:true
    })
  },
  //回复其他人
  havePersonComment:function(e){
    // var id = e.currentTarget.dataset.id;//回复人的ID
    this.showDialogBtn();
  },
  //回复按钮
  haveCommentOk: function () {
    this.hideModal();
    this.setData({
      inputFocus:true
    })
  },
  //复制按钮
  copyContent:function(){
    this.hideModal();
    wx.showToast({
      title: '复制成功',
      icon: 'success',
      duration: 1000
    });
  },
  hateIt:function(){
    this.hideModal();
    wx.showToast({
      title: '举报成功',
      icon: 'success',
      duration: 1000
    });
  },
  // 关注按钮
  attentionPerson: function () {
    let attentionIcon = "messageList.attention[0]";
    let attentionNumber = "messageList.attention[1]";
    if (this.data.messageList.attention[0]) {
      this.setData({
        [attentionIcon]: false,
        [attentionNumber]: this.data.messageList.attention[1] - 1
      })
    } else {
      this.setData({
        [attentionIcon]: true,
        [attentionNumber]: this.data.messageList.attention[1] + 1
      })
    }
  },
  onShow: function () {
    const _this = this
    this.setData({ userInfo: app.globalData.userInfo })
    let data = { "token": app.globalData.userInfo.token, 'id': app.globalData.userInfo.id,"planId":this.data.planId}
    Api.generalPost("showMessage",data,function(res){
      _this.setData({
        messageList:res.data
      })
    })
  },
  onLoad: function (options){
    this.setData({
      planId:options.planId
    })
  },
  //模态框两个事件
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
})
 // 关注按钮
  // goodPlan:function(e){
  //   let _this = this;
  //   let id = e.currentTarget.dataset.id;//获取本动态的id
  //   let status = e.currentTarget.dataset.status;//获取本动态的点赞状态
  //   let index = e.currentTarget.dataset.index;//获取本动态数组下标
  //   let messageListStatus = "messageList[" + index + "].status";
  //   let messageListNumber = "messageList[" + index + "].goodNumber";
  //   let data = { "token": app.globalData.userInfo.token, 'id': app.globalData.userInfo.id ,"planId":id,"status":status}
  //   Api.generalPost("goodPlan", data, function (res){
  //     _this.setData({
  //       [messageListStatus]:res.data.status,
  //       [messageListNumber]:res.data.goodNumber
  //     })
  //   })
  // },