import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Money from '../../selectors/money';
import KrFlag from './KrFlag';
import moment from 'moment';
import ReactPixel from 'react-facebook-pixel';
ReactPixel.init('383410062281822');
// ReactPixel.pageView();
moment.locale('th');
export class PopPage extends React.Component {
  constructor(props) {
    super(props);

    // console.log(queryString.parse(props.location.search))
    this.state = {
      ppu: 690,
      product: { amount: 1, percent: 0, price1: 0, price2: 0 },
      customer: {
        name: { value: '', msg: 'ต้องมีอย่างน้อย 2 ตัวอักษร' },
        tel: { value: '', msg: 'ต้องเป็นเบอร์มือถือเท่านั้น' },
        addr: { value: '', msg: 'ต้องมีรหัสไปรษณีย์' },
        // email: { value: '', msg: undefined },
      },
      // params: queryString.parse(props.location.search),
      time: {}, seconds: 600, interest: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.amountChange = this.amountChange.bind(this);
    this.startTimer();
  }
  // componentWillReceiveProps(nextProps) {
  //   // if (nextProps.searchList != this.state.searchList) {
  //   //   this.setState({ searchList: nextProps.searchList });
  //   // }
  // }
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.amountChange(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.seconds > prevState.seconds) {
      this.startTimer();
      this.amountChange(this.state.product.amount);
    }
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }


  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.amountChange(this.state.product.amount);
    }
  }
  krFlag = () => {
    return <img src="http://flags.fmcdn.net/data/flags/w580/kr.png" width="36" />
  }
  onCustomerChange = (e) => {
    const k = e.target.name;
    const value = e.target.value;
    const msg = this.onValid(k, value);

    this.setState({
      customer: {
        ...this.state.customer,
        [k]: {
          value,
          msg
        }
      },
    })
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    this.amountChange(amount);
  }
  onInjuryTime = () => {
    this.timer = 0;
    this.setState({ seconds: 300 });
  }
  amountChange = (amount) => {
    const amountCheck = isNaN(amount) || Number(amount) <= 0;
    // console.log(amountCheck)
    const price1 = amount * this.state.ppu;
    let percent = 0;
    let price2 = 0;
    if (!amountCheck) {
      if (this.state.seconds > 0) {
        if (amount >= 10) {
          percent = 50;
        } else if (amount >= 5) {
          percent = 40;
        } else {
          percent = 30;
        }
      }
      price2 = price1 - (price1 * (percent / 100))
    }
    this.setState({
      product: {
        amount, percent, price1, price2
      }
    })
  }
  onValid = (k, v) => {
    switch (k) {
      case 'name':
        return v.length < 2 ? 'ต้องมีอย่างน้อย 2 ตัวอักษร' : undefined;
      case 'tel':
        return v.replace(/-/g, '').match(/[0-9]{10}/g) == null ? 'ต้องเป็นเบอร์มือถือเท่านั้น' : undefined;
      case 'addr':
        return v.match(/[0-9]{5}/g) == null ? 'ต้องมีรหัสไปรษณีย์' : undefined;
      case 'email':
        return !ValidateEmail(v) && v != '' ? 'Email ไม่ถูกต้อง' : undefined;
      default:
        return undefined;
    }

    function ValidateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
      // alert("You have entered an invalid email address!")
      return (false)
    }

  }
  onInterestClick = () => {
    ReactPixel.trackCustom('interest', { product: 'pop' })
    this.setState({ interest: true });
    setTimeout(() => {
      this.formSale.focus();
    }, 300)
  }
  onCancelForm = () => {
    this.setState({ interest: false })
  }
  onSubmitForm = (e) => {
    e.preventDefault();
    const cus = this.state.customer;
    const pd = this.state.product;
    const message = `รายการสั่งซื้อจาก ${this.state.from}
    ชื่อลูกค้า: ${cus.name.value}
    เบอร์โทร: ${cus.tel.value}
    ที่อยู่: ${cus.addr.value}
    จำนวนสินค้า: ${pd.amount} (${pd.percent}%)
    ยอดเก็บเงิน: ${pd.price2}
    `
    fetch('https://notify-api.line.me/api/notify', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer 936TgN16SDMyffpP5Nsk2Dp4asHvbZ3RRQvdXeEXDxp'
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({message}), // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(result => console.log(reulst))
  }
  disableSubmit = () => {
    const err = Object.keys(this.state.customer)
      .filter(key => this.state.customer[key].msg != undefined)
    return err.length > 0 || this.state.product.amount <= 0
  }
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
                เวลาโปรโมชั่น {this.state.time.m}:{this.state.time.s} นาที
                &nbsp;
                {this.state.seconds > 0
                  ? <a className="button is-success is-rounded" href="#interest">รับส่วนลด!</a>
                  : <a className="button is-danger is-rounded" onClick={this.onInjuryTime}>ต่อเวลา!</a>
                }

              </span>
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
              <div className="columns is-centered">
                <div className="column is-6-desktop is-8-tablet is-12-mobile">
                  <img src="../../images/pop/10.jpg" />
                </div>
              </div>
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
                  <iframe width="90%" height="350" src="https://www.youtube.com/embed/UK-QKPTMc9w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column">
                  <iframe width="90%" height="350" src="https://www.youtube.com/embed/PEPXwUsf0Zw" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <a className="button is-large is-link" disabled={this.state.interest} onClick={this.onInterestClick} id="interest">สั่งซื้อสินค้า กดปุ่มนี้!</a>
                </div>
              </div>
              {this.state.interest &&
                <div className="columns" style={{ marginTop: 20 }}>
                  <div className="column" >
                    <h2 className="title is-spaced" >ข้อมูลสำหรับจัดส่งสินค้า</h2>
                    <form className="container has-text-left" style={{ marginTop: 30 }} >
                      <div className="columns">
                        <div className="column">
                          <div className="field">
                            <label className="label">จำนวนสินค้า(ขวด)<span className="has-text-danger">*</span></label>
                            <div className="control">
                              <input className={`input ${this.state.product.amount <= 0 ? 'is-danger' : 'is-success'}`}
                                type="number" placeholder="จำนวน" name="amount"
                                value={this.state.product.amount} onChange={this.onAmountChange}
                                ref={(input) => { this.formSale = input; }} />
                            </div>
                            <p className={`help ${this.state.product.amount <= 0 ? 'is-danger' : 'is-success'}`}>
                              {this.state.product.amount <= 0 && 'จำนวนต้องมากกว่า 1 ขวด'}
                            </p>
                          </div>
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">ราคาเต็ม</label>
                            {this.state.product.price1 > 0
                              ? <del className="control title has-text-weight-bold has-text-danger"> {' ' + Money(this.state.product.price1, 0) + ' '}</del>
                              : <div className="control title has-text-weight-bold">0</div>
                            }
                          </div>
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">ส่วนลด</label>
                            <div className="control title has-text-success has-text-weight-bold">
                              {this.state.product.percent}%
                          </div>
                          </div>
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">ยอดเก็บเงินปลายทาง</label>
                            <div className="control title has-text-weight-bold has-text-primary">
                              {Money(this.state.product.price2, 0)} บาท
                          </div>
                          </div>
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">ชื่อผู้รับ<span className="has-text-danger">*</span></label>
                        <div className="control">
                          <input className={`input ${this.state.customer.name.msg ? 'is-danger' : 'is-success'}`}
                            type="text" placeholder="ชื่อ - นามสกุล" name="name"
                            value={this.state.customer.name.value} onChange={this.onCustomerChange} />
                        </div>
                        <p className={`help ${this.state.customer.name.msg ? 'is-danger' : 'is-success'}`}>{this.state.customer.name.msg}</p>
                      </div>
                      <div className="field">
                        <label className="label">เบอร์มือถือผู้รับ<span className="has-text-danger">*</span></label>
                        <div className="control">
                          <input className={`input ${this.state.customer.tel.msg ? 'is-danger' : 'is-success'}`}
                            type="text" placeholder="เบอร์มือถือ" name="tel" maxLength="12"
                            onChange={this.onCustomerChange} value={this.state.customer.tel.value} />
                        </div>
                        <p className={`help ${this.state.customer.tel.msg ? 'is-danger' : 'is-success'}`}>{this.state.customer.tel.msg}</p>
                      </div>
                      {/* <div className="field">
                        <label className="label">อีเมล์ (ถ้ามี)</label>
                        <div className="control">
                          <input className={`input ${this.state.errors.email ? 'is-danger' : 'is-success'}`} type="text" placeholder="Email" name="email"
                            onChange={this.onCustomerChange} value={this.state.customer.email} />
                        </div>
                        <p className={`help ${this.state.errors.email ? 'is-danger' : 'is-success'}`}>{this.state.errors.email}</p>
                      </div> */}

                      <div className="field">
                        <label className="label">ที่อยู่สำหรับจัดส่งสินค้า<span className="has-text-danger">*</span></label>
                        <div className="control">
                          <textarea className={`textarea ${this.state.customer.addr.msg ? 'is-danger' : 'is-success'}`}
                            placeholder="ที่อยู่สำหรับจัดส่งสินค้า" name="addr"
                            onChange={this.onCustomerChange} defaultValue={this.state.customer.addr.value}></textarea>
                        </div>
                        <p className={`help ${this.state.customer.addr.msg ? 'is-danger' : 'is-success'}`}>{this.state.customer.addr.msg}</p>
                      </div>

                      {/* <div className="field">
                        <div className="control">
                          <label className="checkbox">
                            <input type="checkbox" />
                            &nbsp;ฉันยอมรับ <a href="#" className="has-text-link">ข้อกำหนด และเงื่อนไข</a> ในการสั่งสินค้าแบบเก็บเงินปลายทาง
                          </label>
                        </div>
                      </div> */}


                      <div className="field is-grouped">
                        <div className="control">
                          <button className="button is-link"
                            disabled={this.disableSubmit()}
                            onClick={this.onSubmitForm}>สั่งซื้อสินค้า</button>
                        </div>
                        <div className="control">
                          <button className="button is-text" onClick={this.onCancelForm}>ยกเลิก</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section >
    )
  }
}
const mapStateToProps = (state, props) => ({
  params: props.params
});
const mapDispatchToProps = (dispatch, props) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(PopPage);