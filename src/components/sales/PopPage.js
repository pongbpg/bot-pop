import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Money from '../../selectors/money';
import KrFlag from './KrFlag';
import moment from 'moment';
import ReactPixel from 'react-facebook-pixel';
ReactPixel.init('383410062281822');
moment.locale('th');
export class PopPage extends React.Component {
  constructor(props) {
    super(props);

    // console.log(queryString.parse(props.location.search))
    this.state = {
      ppu: 690,
      product: { amount: 0, percent: 0, price1: 0, price2: 0 },
      customer: { name: '', tel: '', addr: '', email: '', amount: 0, percent: 0, price1: 0, price2: 0 },
      errors: { name: undefined, tel: undefined, addr: undefined, email: undefined, amount: undefined },
      // params: queryString.parse(props.location.search),
      time: {}, seconds: 300
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.amountChange = this.amountChange.bind(this);
    this.startTimer();
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.searchList != this.state.searchList) {
    //   this.setState({ searchList: nextProps.searchList });
    // }
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

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
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
    const v = e.target.value;
    const msg = this.onValid(k, v);
    this.setState({
      customer: {
        ...this.state.customer,
        [k]: v
      },
      errors: {
        ...this.state.errors,
        [k]: msg
      }
    })
  }
  onAmountChange = (e) => {
    const amount = e.target.value;
    this.amountChange(amount);
  }
  amountChange = (amount) => {
    const amountCheck = isNaN(amount) || Number(amount) <= 0;
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
      this.setState({
        product: {
          amount, percent, price1, price2
        }, errors: {
          ...this.state.errors,
          amount: undefined
        }
      })
    } else {
      this.setState({
        product: {
          amount, percent, price1, price2
        }, errors: {
          ...this.state.errors,
          amount: 'จำนวนสินค้าต้องมากกว่า 0 ขวด'
        }
      })
    }
  }
  onValid = (k, v) => {
    switch (k) {
      case 'name':
        return v.length < 2 ? 'ชื่อผู้รับต้องมีอย่างน้อย 2 ตัวอักษร' : undefined;
      case 'tel':
        return v.replace(/-/g, '').match(/[0-9]{10}/g) == null ? 'เบอร์โทรต้องมีเพียงเลข 10 หลัก' : undefined;
      case 'addr':
        return v.match(/[0-9]{5}/g) == null ? 'ที่อยู่ต้องมีรหัสไปรษณีย์' : undefined;
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
  render() {
    return (
      <section className="fontGG">
        <nav className="navbar is-fixed-top" style={{ padding: 10 }}>
          <div className="container">
            <div className="navbar-brand">
              <span className="navbar-item" href="/product/pop">
                <img src="../../images/popp.png" alt="P.O.P." />&nbsp;
              </span>
              <span className="navbar-item">โฟมกำจัดขน<KrFlag width="24" /></span>
              <span className="navbar-item"><a className="button is-success is-rounded" href="#frmSale">รับส่วนลด!</a></span>

            </div>
            {/*   <div className="navbar-menu" id="navMenu">
              <div className="navbar-start">
                 </div>
            <div className="navbar-end">
               <a className="navbar-item is-active" href="/mentorship.html">Mentorship</a>
                <div className="navbar-item is-active"><a className="button is-danger is-outlined is-rounded" href="/contact.html">สั่งซื้อที่นี่</a></div>

            
              </div> 
          </div>*/}
          </div>
        </nav>
        <div className="hero is-white has-text-centered" style={{ marginTop: 30 }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">ผลิตภัณฑ์โฟมกำจัดขน P.O.P.</h1>
                  <h2 className="subtitle is-size-4-desktop">นวัตกรรมใหม่จากเกาหลี<KrFlag width="36" /> ใช้งานง่าย</h2>
                  <h2 className="subtitle is-size-4-desktop">แค่พ่นโฟม 10-15 นาที แล้วล้างน้ำออก</h2>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/1.jpg" />
                </div>
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/2.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile button is-primary is-rounded has-text-white">คุณสมบัติ และส่วนผสม</h1>
                  <h2 className="subtitle is-size-4-desktop">1.สินค้ามี อย. ปลอดภัย 100%</h2>
                  <h2 className="subtitle is-size-4-desktop">2.เนื้อโฟมอ่อนโยน ผิวชุ่มชื้น ไม่ระคายเคือง</h2>
                  <h2 className="subtitle is-size-4-desktop">3.ขนขึ้นใหม่ 3-4 สัปดาห์ ไม่เป็นตอ</h2>
                  <h2 className="subtitle is-size-4-desktop">4.ขนาดบรรจุ 180 ml. ใช้ได้ 10-20 ครั้งคุ้มสุดๆ</h2>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/3.jpg" />
                </div>
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/4.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile button is-danger is-rounded has-text-white">วิธีการใช้ และ VDO รีวิว</h1>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/5.jpg" style={{ maxWidth: "80%" }} />
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
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile button is-primary is-rounded has-text-white">รีวิวจากลูกค้าที่ใช้จริง</h1>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/rv1.jpg" />
                  <img src="../../images/pop/rv2.jpg" />
                  <img src="../../images/pop/rv3.jpg" />
                  <img src="../../images/pop/rv4.jpg" />
                </div>
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/rv5.jpg" />
                  <img src="../../images/pop/rv6.jpg" />
                  <img src="../../images/pop/rv7.jpg" />
                  <img src="../../images/pop/rv8.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile button is-warning is-rounded has-text-white">จัดส่งสินค้าโดย เคอรี่ฯ</h1>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/6.jpg" />
                  <img src="../../images/pop/7.jpg" />
                </div>
                <div className="column is-size-1-desktop is-size-2-tablet is-size-3-mobile" >
                  <img src="../../images/pop/8.jpg" />
                  <img src="../../images/pop/9.jpg" />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 20 }} id="frmSale">
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile button is-danger is-rounded has-text-white">โปรโมชั่นพิเศษ</h1>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-12-desktop is-size-2-tablet is-size-3-mobile">
                  <img src="../../images/pop/10.jpg" style={{ maxWidth: "80%" }} />
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-size-12-desktop is-size-2-tablet is-size-3-mobile">
                  ส่วนลดเหลือเวลาเพียง&nbsp;
                  {this.state.time.m} นาที {this.state.time.s} วินาที
                </div>
              </div>
              <div className="columns" style={{ marginTop: 20 }}>
                <div className="column" >
                  {/* <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile" >วิธีสั่งซื้อสินค้า</h1> */}
                  <form className="container has-text-left" style={{ marginTop: 30 }}>
                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">จำนวนสินค้า<span className="has-text-danger">*</span></label>
                          <div className="control">
                            <input className={`input ${this.state.errors.amount ? 'is-danger' : 'is-success'}`}
                              type="number" placeholder="ชื่อ - นามสกุล" name="amount"
                              value={this.state.product.amount} onChange={this.onAmountChange} />
                          </div>
                          <p className={`help ${this.state.errors.amount ? 'is-danger' : 'is-success'}`}>{this.state.errors.amount}</p>
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
                        <input className={`input ${this.state.errors.name ? 'is-danger' : 'is-success'}`}
                          type="text" placeholder="ชื่อ - นามสกุล" name="name"
                          value={this.state.customer.name} onChange={this.onCustomerChange} />
                      </div>
                      <p className={`help ${this.state.errors.name ? 'is-danger' : 'is-success'}`}>{this.state.errors.name}</p>
                    </div>
                    <div className="field">
                      <label className="label">เบอร์มือถือผู้รับ<span className="has-text-danger">*</span></label>
                      <div className="control">
                        <input className={`input ${this.state.errors.tel ? 'is-danger' : 'is-success'}`}
                          type="text" placeholder="เบอร์มือถือ" name="tel" maxLength="12"
                          onChange={this.onCustomerChange} value={this.state.customer.tel} />
                      </div>
                      <p className={`help ${this.state.errors.tel ? 'is-danger' : 'is-success'}`}>{this.state.errors.tel}</p>
                    </div>
                    <div className="field">
                      <label className="label">อีเมล์ (ถ้ามี)</label>
                      <div className="control">
                        <input className={`input ${this.state.errors.email}`} type="text" placeholder="Email" name="email"
                          onChange={this.onCustomerChange} value={this.state.customer.email} />
                      </div>
                      <p className="help">{this.state.errors.email}</p>
                    </div>

                    <div className="field">
                      <label className="label">ที่อยู่สำหรับจัดส่งสินค้า<span className="has-text-danger">*</span></label>
                      <div className="control">
                        <textarea className="textarea" placeholder="Textarea" name="addr"
                          onChange={this.onCustomerChange} defaultValue={this.state.customer.addr}></textarea>
                      </div>
                      <p className="help">{this.state.errors.addr}</p>
                    </div>

                    <div className="field">
                      <div className="control">
                        <label className="checkbox">
                          <input type="checkbox" />
                          I agree to the <a href="#">terms and conditions</a>
                        </label>
                      </div>
                    </div>


                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link">Submit</button>
                      </div>
                      <div className="control">
                        <button className="button is-text">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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