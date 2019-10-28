export default IntervalTime = (oldTime) => {
  let now = new Date().getTime()
  let old = new Date(oldTime).getTime()
  var diffValue = parseInt(now - old),
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    month = day * 30,
    year = month * 12,

    _year = diffValue / year,
    _month = diffValue / month,
    _week = diffValue / (7 * day),
    _day = diffValue / day,
    _hour = diffValue / hour,
    _min = diffValue / minute;

  if (_year >= 1) { interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日'; }
  else if (_month >= 1) { interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日'; }
  else if (_week >= 1) { interT = new Date(oldTime).getFullYear() + '年' + (new Date(oldTime).getMonth() + 1) + '月' + new Date(oldTime).getDate() + '日'; }
  else if (_day >= 1) { interT = parseInt(_day) + "天前"; }
  else if (_hour >= 1) { interT = parseInt(_hour) + "小时前"; }
  else if (_min >= 1) { interT = parseInt(_min) + "分钟前"; }
  else { interT = "刚刚"; }
  return interT;
}
