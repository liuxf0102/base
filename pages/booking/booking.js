var util = require('../../utils/util.js')

Page({
  data: {

    bookings: [],
    bookingStatus: '',
    buttonDisabled: false,
    isFirst: false,
    selectedTime:'...',
    //calender start
    hasEmptyGrid: false,
    modalHidden: true
    //calendar end
  },
  onLoad(options) {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
  },
  radioChange: function (e) {
    if (e.detail.value == '0') {
      this.setData({
        isFirst: true
      })
    };
    if (e.detail.value == '1') {
      this.setData({
        isFirst: false
      })
    };
    console.log("radio:" + e.detail.value);
  },
  tapNewBooking: function (e) {
    var bookings = wx.getStorageSync('bookings') || [];
    //var bookings =  [];
    // console.log("bookings:" + bookings);
    var bookedItem = {};
    if (this.data.isFirst) {
      bookedItem.isFirst = '0';
    }
    if (!this.data.isFirst) {
      bookedItem.isFirst = '1';
    }
    console.log("bookedItem:" + this.data.isFirst + ":" + bookedItem.isFirst);
    bookedItem.time = util.formatTime(new Date(Date.now()));
    bookings.unshift(bookedItem);

    wx.setStorageSync('bookings', bookings);

    //show booked item info
    this.setData({
      bookingStatus: "预约成功",
      buttonDisabled: !this.data.disabled
      
    });

    wx.navigateTo({
       url: '../calendar/cal',
    })
  },

  tapSelectTime: function (e) {
   
  },

  //start calendar function 
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  selectedDay(e) {
    console.log(e);
    this.setData({

      selectedTime: this.data.cur_year + "-" + this.data.cur_month + "-" + e.currentTarget.dataset.idx_day
    })
  },
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    }
  },
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  //end calendar function


  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //show booked item info
    this.setData({
      bookingStatus: "",
      buttonDisabled: false
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
