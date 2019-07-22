import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Money from '../../selectors/money';
import KrFlag from './KrFlag';
import moment from 'moment';
import ReactPixel from 'react-facebook-pixel';
import queryString from 'query-string';
ReactPixel.init('383410062281822');
moment.locale('th');
export class PopPage extends React.Component {
  constructor(props) {
    super(props);

    // console.log(queryString.parse(props.location.search))
    this.state = {
      customer: { name: '', tel: '', addr: '', email: '' },
      errors: { name: undefined, tel: undefined, addr: undefined, email: undefined },
      params: queryString.parse(props.location.search),
    };
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.searchList != this.state.searchList) {
    //   this.setState({ searchList: nextProps.searchList });
    // }
  }

  krFlag = () => {
    return <img src="http://flags.fmcdn.net/data/flags/w580/kr.png" width="36" />
  }
  onValueChange = (e) => {
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
              <span className="navbar-item">โฟมกำจัดขน พี.โอ.พี.</span>
              <span className="navbar-item"><a className="button is-success is-rounded" href="#frmSale">สั่งซื้อกดปุ่มนี้</a></span>

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
                  <img src="../../images/pop/1.jpg" style={{ width: 550, padding: 10 }} />
                  <img src="../../images/pop/2.jpg" style={{ width: 550, padding: 10 }} />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">คุณสมบัติ และส่วนผสม</h1>
                  <h2 className="subtitle is-size-4-desktop">- มี อย. เลขที่จดแจ้ง 10-2-6200003421 ปลอดภัย 100%</h2>
                  <h2 className="subtitle is-size-4-desktop">- มีส่วนผสมของ มอยเจอร์ไรเซอร์ ทำให้ผิวดูกระชับ เรียบเนียน</h2>
                  <h2 className="subtitle is-size-4-desktop">- ไม่ทิ้งความเหนียวของโฟม และไม่เจ็บ เหมือนการแว๊กซ์ขนแบบทั่วไป</h2>
                  <h2 className="subtitle is-size-4-desktop">- ขนเกิดใหม่ใช้เวลา 3-4 สัปดาห์ ไม่เป็นตอ ไม่แสบ ไม่คันดีงามมากเวอร์</h2>
                  <h2 className="subtitle is-size-4-desktop">- ขนาดบรรจุ 180 ml. ใช้ได้ 10-20 ครั้งคุ้มสุดๆ</h2>
                  <h2 className="subtitle is-size-4-desktop">- นวัตกรรมใหม่นำเข้าจากประเทศเกาหลี<KrFlag width="36" /></h2>
                  <img src="../../images/pop/3.jpg" style={{ width: 550, padding: 10 }} />
                  <img src="../../images/pop/4.jpg" style={{ width: 550, padding: 10 }} />
                </div>
              </div>
              <div className="columns is-centered" style={{ marginTop: 30 }}>
                <div className="column">
                  <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">วิธีการใช้ และ VDO รีวิว</h1>
                  <img src="../../images/pop/5.jpg" style={{ width: 550 }} />
                </div>
              </div>
              <div className="column">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/UK-QKPTMc9w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="column">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/PEPXwUsf0Zw" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
            <div className="columns is-centered" style={{ marginTop: 30 }}>
              <div className="column">
                <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">รีวิวจากลูกค้าที่ใช้จริง</h1>
                <img src="../../images/pop/rv1.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv2.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv3.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv4.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv5.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv6.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv7.jpg" style={{ width: 450 }} />
                <img src="../../images/pop/rv8.jpg" style={{ width: 450 }} />
              </div>
            </div>
            <div className="columns is-centered" style={{ marginTop: 30 }}>
              <div className="column">
                <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile">จัดส่งสินค้าโดย KERRY EXPRESS</h1>
                <img src="../../images/pop/6.jpg" style={{ width: 500 }} />
              </div>
            </div>
            <div className="columns" style={{ marginTop: 30 }}>
              <div className="column" id="frmSale" >
                <h1 className="title is-spaced is-size-1-desktop is-size-2-tablet is-size-3-mobile" >วิธีสั่งซื้อสินค้า</h1>
                <form className="container has-text-left" style={{ marginTop: 30 }}>
                  <div className="field">
                    <label className="label">ชื่อผู้รับ<span className="has-text-danger">*</span></label>
                    <div className="control">
                      <input className={`input ${this.state.errors.name ? 'is-danger' : 'is-success'}`}
                        type="text" placeholder="ชื่อ - นามสกุล" name="name"
                        value={this.state.customer.name} onChange={this.onValueChange} />
                    </div>
                    <p className={`help ${this.state.errors.name ? 'is-danger' : 'is-success'}`}>{this.state.errors.name}</p>
                  </div>
                  <div className="field">
                    <label className="label">เบอร์มือถือผู้รับ<span className="has-text-danger">*</span></label>
                    <div className="control">
                      <input className={`input ${this.state.errors.tel ? 'is-danger' : 'is-success'}`}
                        type="text" placeholder="เบอร์มือถือ" name="tel" maxLength="12"
                        onChange={this.onValueChange} value={this.state.customer.tel} />
                    </div>
                    <p className={`help ${this.state.errors.tel ? 'is-danger' : 'is-success'}`}>{this.state.errors.tel}</p>
                  </div>
                  <div className="field">
                    <label className="label">อีเมล์ (ถ้ามี)</label>
                    <div className="control">
                      <input className={`input ${this.state.errors.email}`} type="text" placeholder="Email" name="email"
                        onChange={this.onValueChange} value={this.state.customer.email} />
                    </div>
                    <p className="help">{this.state.errors.email}</p>
                  </div>

                  <div className="field">
                    <label className="label">ที่อยู่สำหรับจัดส่งสินค้า<span className="has-text-danger">*</span></label>
                    <div className="control">
                      <textarea className="textarea" placeholder="Textarea" name="addr"
                        onChange={this.onValueChange} defaultValue={this.state.customer.addr}></textarea>
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
                  </div>  </form>
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