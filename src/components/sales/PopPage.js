import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import Money from '../../selectors/money';
import KrFlag from './KrFlag';
import { FaHandPointRight, FaHandPointLeft } from 'react-icons/fa'
import moment from 'moment';
import ReactPixel from 'react-facebook-pixel';
ReactPixel.init('383410062281822');
ReactPixel.pageView();
// ReactPixel.trackCustom('web', { product: 'HR', type: 'view', seconds: 0 })
moment.locale('th');
export class PopPage extends React.Component {
  constructor(props) {
    super(props);

    // console.log(queryString.parse(props.location.search))
    this.state = {
      // ppu: 690,
      // product: { amount: 1, percent: 0, price1: 0, price2: 0 },
      // customer: {
      //   name: { value: '', msg: 'ต้องมีอย่างน้อย 2 ตัวอักษร' },
      //   tel: { value: '', msg: 'ต้องเป็นเบอร์มือถือเท่านั้น' },
      //   addr: { value: '', msg: 'ต้องมีรหัสไปรษณีย์' },
      //   // email: { value: '', msg: undefined },
      // },
      // params: queryString.parse(props.location.search),
      // params: this.queryString(props.location.search),
      // time: {}, seconds: 600, interest: false, buy: false, loading: false
    };
    this.timer = 0;
    // this.startTimer = this.startTimer.bind(this);
    // this.countDown = this.countDown.bind(this);
    // this.amountChange = this.amountChange.bind(this);
    // this.startTimer();
  }
  // queryString(string) {
  //   let query = {};
  //   const keys = string.replace('?', '').split('&');
  //   if (keys.length > 0) {
  //     for (let i = 0; i < keys.length; i++) {
  //       if (!query.hasOwnProperty(keys[i].split('=')[0]))
  //         query[keys[i].split('=')[0]] = keys[i].split('=')[1]
  //     }
  //   }
  //   // console.log(query)
  //   return query;
  // }
  // // componentWillReceiveProps(nextProps) {
  // //   // if (nextProps.searchList != this.state.searchList) {
  // //   //   this.setState({ searchList: nextProps.searchList });
  // //   // }
  // // }
  // componentDidMount() {
  //   let timeLeftVar = this.secondsToTime(this.state.seconds);
  //   this.setState({ time: timeLeftVar });
  //   this.amountChange(1);
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.seconds > prevState.seconds) {
  //     this.startTimer();
  //     this.amountChange(this.state.product.amount);
  //   }
  // }

  // secondsToTime(secs) {
  //   let hours = Math.floor(secs / (60 * 60));

  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);

  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }

  // startTimer() {
  //   if (this.timer == 0 && this.state.seconds > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  // }

  // countDown() {
  //   // Remove one second, set state so a re-render happens.
  //   let seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });
  //   // if (600 - seconds == 15) {
  //   //   ReactPixel.trackCustom('web', { product: 'HR', type: 'view', seconds: 15 })
  //   // }
  //   // if (600 - seconds == 30) {
  //   //   ReactPixel.trackCustom('web', { product: 'HR', type: 'view', seconds: 30 })
  //   // }
  //   // if (600 - seconds == 60) {
  //   //   ReactPixel.trackCustom('web', { product: 'HR', type: 'view', seconds: 60 })
  //   // }
  //   // Check if we're at zero.
  //   if (seconds == 0) {
  //     clearInterval(this.timer);
  //     this.amountChange(this.state.product.amount);
  //   }
  // }
  // // krFlag = () => {
  // //   return <img src="http://flags.fmcdn.net/data/flags/w580/kr.png" width="36" />
  // // }
  // onCustomerChange = (e) => {
  //   const k = e.target.name;
  //   const value = e.target.value;
  //   const msg = this.onValid(k, value);

  //   this.setState({
  //     customer: {
  //       ...this.state.customer,
  //       [k]: {
  //         value,
  //         msg
  //       }
  //     },
  //   })
  // }
  // onAmountChange = (e) => {
  //   const amount = e.target.value;
  //   this.amountChange(amount);
  // }
  // onInjuryTime = () => {
  //   this.timer = 0;
  //   this.setState({ seconds: 300 });
  // }
  // amountChange = (amount) => {
  //   const amountCheck = isNaN(amount) || Number(amount) <= 0;
  //   // console.log(amountCheck)
  //   const price1 = amount * this.state.ppu;
  //   let percent = 0;
  //   let price2 = 0;
  //   if (!amountCheck) {
  //     if (this.state.seconds > 0) {
  //       if (amount >= 10) {
  //         percent = 50;
  //       } else if (amount >= 5) {
  //         percent = 40;
  //       } else {
  //         percent = 30;
  //       }
  //     }
  //     price2 = price1 - (price1 * (percent / 100))
  //   }
  //   this.setState({
  //     product: {
  //       amount, percent, price1, price2
  //     }
  //   })
  // }
  // onValid = (k, v) => {
  //   switch (k) {
  //     case 'name':
  //       return v.length < 2 ? 'ต้องมีอย่างน้อย 2 ตัวอักษร' : undefined;
  //     case 'tel':
  //       return v.replace(/-/g, '').match(/[0-9]{10}/g) == null ? 'ต้องเป็นเบอร์มือถือเท่านั้น' : undefined;
  //     case 'addr':
  //       return v.match(/[0-9]{5}/g) == null ? 'ต้องมีรหัสไปรษณีย์' : undefined;
  //     case 'email':
  //       return !ValidateEmail(v) && v != '' ? 'Email ไม่ถูกต้อง' : undefined;
  //     default:
  //       return undefined;
  //   }

  //   function ValidateEmail(mail) {
  //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //       return (true)
  //     }
  //     // alert("You have entered an invalid email address!")
  //     return (false)
  //   }

  // }
  onInterestClick = () => {
    ReactPixel.track('ViewContent', { content_name: 'POP', content_ids: ['HR'], content_type: 'REVIEW' })
    window.location.href = 'https://line.me/R/ti/p/%40pop02';
    // this.setState({ interest: true, buy: false });
    // setTimeout(() => {
    //   this.formSale.focus();
    // }, 300)
  }
  // onCancelForm = () => {
  //   this.setState({ interest: false, buy: false })
  // }
  // onSubmitForm = (e) => {
  //   e.preventDefault();
  //   const cus = this.state.customer;
  //   const pd = this.state.product;
  //   const message = `รายการสั่งซื้อจาก ${this.state.params.from}\nลูกค้า: ${cus.name.value}\nโทร: ${cus.tel.value}\nที่อยู่: ${cus.addr.value}\nจำนวน: ${pd.amount} ขวด\nยอดเงิน: ${pd.price2} บาท\nPercent: ${pd.percent}`;
  //   if (confirm('ลูกค้ายืนยันการสั่งซื้อสินค้า')) {
  //     this.setState({ interest: false, buy: true, loading: true })
  //     // ReactPixel.trackCustom('purchase', { product: 'HR', amount: pd.amount })
  //     // ReactPixel.trackCustom('web', { product: 'HR', type: 'buy', amount: pd.amount })
  //     axios({
  //       method: 'post',
  //       url: 'https://cors-anywhere.herokuapp.com/https://notify-api.line.me/api/notify',
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //         'authorization': 'Bearer NJq2DB5ADW5tNibORABisTnBkE5SPDp1V4uW5sThfQv'
  //       },
  //       data: 'message=' + message
  //     }).then(result => {
  //       if (result.status == 200) { //success
  //         this.setState({
  //           loading: false,
  //           msg: ''
  //         })
  //       } else {
  //         this.setState({
  //           loading: false,
  //           buy: false,
  //           interest: true,
  //           msg: result.message
  //         })
  //       }
  //     }).catch(err => {
  //       this.setState({
  //         loading: false,
  //         buy: false,
  //         interest: true,
  //         msg: err.message
  //       })
  //     })
  //   }



  // }
  // disableSubmit = () => {
  //   const err = Object.keys(this.state.customer)
  //     .filter(key => this.state.customer[key].msg != undefined)
  //   return err.length > 0 || this.state.product.amount <= 0
  // }

  render() {
    return (
      <section className="fontGG">
        <nav className="navbar is-fixed-top" style={{ padding: 10 }}>
          <div className="container">
            <div className="navbar-brand">
              <span className="navbar-item" href="/product/pop">
                <img src="../../images/popp.png" width="50" alt="P.O.P." />
              </span>
              <span className="navbar-item">
                มูสกำจัดขนสูตรอ่อนโยน
                 &nbsp;<a className="button is-success is-rounded" onClick={this.onInterestClick}>สนใจ!</a>
              </span>
              {/* <span className="navbar-item">
                 เวลาโปรโมชั่น {this.state.time.m}:{this.state.time.s} นาที
                 &nbsp;
                 {this.state.seconds > 0
                   ? <a className="button is-success is-rounded" href="#interest"><FaHandPointRight />รับส่วนลด!</a>
                   : <a className="button is-danger is-rounded" onClick={this.onInjuryTime}>ต่อเวลา!</a>
                 }

               </span> */}
            </div>
          </div>
        </nav>
        <div className="hero is-white has-text-centered" style={{ marginTop: 30 }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column">
                  <h2 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-4-mobile">ผลิตภัณฑ์โฟมกำจัดขน P.O.P.</h2>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">นวัตกรรมใหม่จากเกาหลี<KrFlag width="36" /> ใช้งานง่าย</h4>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">แค่พ่นโฟม 10-15 นาที แล้วล้างน้ำออก</h4>
                </div>
              </div>
              {/* <div className="columns is-centered">
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/10.jpg" />
                </div>
              </div> */}
              <div className="columns is-centered">
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/1.jpg" />
                </div>
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/2.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 10 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-danger">คุณสมบัติ</h1>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">1.สินค้ามี อย. ปลอดภัย 100%</h4>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">2.เนื้อโฟมอ่อนโยน ผิวชุ่มชื้น ไม่ระคายเคือง</h4>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">3.ขนขึ้นใหม่ 3-4 สัปดาห์ ไม่เป็นตอ</h4>
                  <h4 className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">4.ขนาดบรรจุ 180 ml. ใช้ได้ 10-20 ครั้งคุ้มสุดๆ</h4>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/3.jpg" />
                </div>
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/4.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h2 className="title is-spaced is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-danger">วิธีการใช้ และ VDO รีวิว</h2>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/5.jpg" />
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column">
                  <iframe width="640" height="480" src="https://www.youtube.com/embed/UK-QKPTMc9w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column">
                <iframe width="640" height="480" src="https://www.youtube.com/embed/PEPXwUsf0Zw" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
            <div className="columns is-centered" style={{ marginTop: 30 }}>
              <div className="column">
                <h2 className="title is-spaced is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-danger">รีวิวจากลูกค้าที่ใช้จริง</h2>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-6-desktop is-8-tablet is-12-mobile">
                <img src="../../images/pop/rv1.jpg" />
                <img src="../../images/pop/rv2.jpg" />
                <img src="../../images/pop/rv3.jpg" />
                <img src="../../images/pop/rv4.jpg" />
              </div>
              <div className="column is-6-desktop is-8-tablet is-12-mobile">
                <img src="../../images/pop/rv5.jpg" />
                <img src="../../images/pop/rv6.jpg" />
                <img src="../../images/pop/rv7.jpg" />
                <img src="../../images/pop/rv8.jpg" />
              </div>
            </div>
            <div className="columns is-centered" style={{ marginTop: 30 }}>
              <div className="column">
                <h2 className="title is-spaced is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-danger">จัดส่งสินค้าโดย เคอรี่ฯ</h2>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-6-desktop is-8-tablet is-12-mobile">
                <img src="../../images/pop/6.jpg" />
                <img src="../../images/pop/7.jpg" />
              </div>
              <div className="column is-6-desktop is-8-tablet is-12-mobile" >
                <img src="../../images/pop/8.jpg" />
                <img src="../../images/pop/9.jpg" />
              </div>
            </div>
            {(this.state.interest == false && this.state.buy == false) &&
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <a className="button is-large is-link" onClick={this.onInterestClick} id="interest">
                    <FaHandPointRight />สนใจสอบถามคลิกที่นี่!<FaHandPointLeft />
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

    )
  }
}
const mapStateToProps = (state, props) => ({
  params: props.params
});
const mapDispatchToProps = (dispatch, props) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(PopPage);