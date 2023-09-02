import React, { createRef,Component } from "react";
import { connect } from "react-redux";

class RegisterForm extends Component {
   studentnameInputRef = createRef();
   studentIdInputRef = createRef();
   emailInputRef = createRef();
   studentPhoneInputRef = createRef();


  handleChange= (e)=> {
    const action = {
      type: "HANDLE_CHANGE_INPUT",
      id: e.target.id,
      value: e.target.value,
    };
    this.props.dispatch(action);
  }

  validateRequired = (value, ref, mess) => {
    if (value){
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false;
  }

  validateFullName = (value, ref, mess) => {
    let letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)){
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false; 
  }

  validatePhone = (value, ref, mess) => {
    // let numbers = "^[0-9]+$";
    if (/^\d+$/.test(value)){
      ref.innerHTML = "";

      return true;
    }
    ref.innerHTML = mess;

    return false; 
  }

  validateEmail = (value, ref, mess) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( value)){
        ref.innerHTML = "";

        return true;
    }
    ref.innerHTML = mess;

    return false; 
  }

  createStudent = (e)=> {
    e.preventDefault();
    // console.log(this.props);
    let  {studentTemplate} = this.props.studentReducer

    // console.log(studentTemplate)

    let isValid = true;

    // CHECK VALIDATION FOR STUDENTID
    isValid &= this.validateRequired(studentTemplate.id, this.studentIdInputRef.current, "Vui lòng nhập studentID") && this.validatePhone(studentTemplate.id, this.studentIdInputRef.current, "Vui lòng nhập ký tự là chữ số");
    
    // CHECK VALIDATION FOR FULLNAME
    isValid &= this.validateRequired(studentTemplate.fullName, this.studentnameInputRef.current, "Vui lòng nhập họ tên") && this.validateFullName(studentTemplate.fullName, this.studentnameInputRef.current, "Vui lòng nhập ký tự là chữ cái");
    
    // CHECK VALIDATION FOR PHONENUMBER
    isValid &= this.validateRequired(studentTemplate.phoneNumber, this.studentPhoneInputRef.current, "Vui lòng nhập số điện thoại") && this.validatePhone(studentTemplate.phoneNumber, this.studentPhoneInputRef.current, "Vui lòng nhập ký tự là chữ số");
    
    // CHECK VALIDATION FOR EMAIL
    isValid &= this.validateRequired(studentTemplate.email, this.emailInputRef.current, "Vui lòng nhập email") && this.validateEmail(studentTemplate.email, this.emailInputRef.current, "Vui lòng nhập đúng định dạng emai");

    // console.log (isValid);

    if (isValid){
        const action = {
      type: "CREATE_STUDENT",
      payload: {newStudent: studentTemplate},
    };
    this.props.dispatch(action);
    alert(`created student ${studentTemplate.id}`)
    }
  }
  updateStudent= (e)=>{
    e.preventDefault();
    // console.log(this.props);
    let  {studentTemplate} = this.props.studentReducer;

    let isValid = true;

    // CHECK VALIDATION FOR FULLNAME
    isValid &= this.validateRequired(studentTemplate.fullName, this.studentnameInputRef.current, "Vui lòng nhập họ tên") && this.validateFullName(studentTemplate.fullName, this.studentnameInputRef.current, "Vui lòng nhập ký tự là chữ cái");
    
    // CHECK VALIDATION FOR PHONENUMBER
    isValid &= this.validateRequired(studentTemplate.phoneNumber, this.studentPhoneInputRef.current, "Vui lòng nhập số điện thoại") && this.validatePhone(studentTemplate.phoneNumber, this.studentPhoneInputRef.current, "Vui lòng nhập ký tự là chữ số");
    
    // CHECK VALIDATION FOR EMAIL
    isValid &= this.validateRequired(studentTemplate.email, this.emailInputRef.current, "Vui lòng nhập email") && this.validateEmail(studentTemplate.email, this.emailInputRef.current, "Vui lòng nhập đúng định dạng emai");

    if (isValid){
      const action = {
        type: "UPDATE_STUDENT",
        payload: {updatedStudent: studentTemplate},
      };
      this.props.dispatch(action);
      alert(`Updated student `)
    }
  }
  render() {
    let { studentTemplate, updateButtonStyle, isDisableId } = this.props.studentReducer;
    return (
      <div className="register-form mt-5">
        <div className="row">
          <form
            className="card"
            style={{ padding: 0 }}
            onSubmit={this.createStudent}
          >
            <div className="card-header bg-dark text-light">
              <h4>Student Information</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 left-col">
                  <div className="form-group">
                    <p>ID</p>
                    {} 
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id" 
                      placeholder="Student ID"
                      value={studentTemplate.id}
                      disabled={isDisableId}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <p ref={this.studentIdInputRef} className="text-danger"></p>
                  </div>
                  <div className="form-group">
                    <p>Phone Number</p>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Input your phone number"
                      value={studentTemplate.phoneNumber}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <p ref={this.studentPhoneInputRef} className="text-danger"></p>
                  </div>
                </div>
                <div className="col-6 right-col">
                  <div className="form-group">
                    <p>Full name</p>
                    { <input
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      placeholder="input your full name"
                      value={studentTemplate.fullName}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />}
                    <p ref={this.studentnameInputRef} className="text-danger"></p>
                  </div>
                  <div className="form-group">
                    <p>Email</p>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="input your email"
                      value={studentTemplate.email}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                    <p ref={this.emailInputRef} className="text-danger"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-success mx-2" type='submit'>Create</button>
              <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={(e)=>{
                    this.updateStudent(e)
                }}
                style={{display: updateButtonStyle}}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  studentReducer: state.studentReducer,
});

export default connect(mapStateToProps)(RegisterForm);
