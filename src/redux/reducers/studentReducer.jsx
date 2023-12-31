const students =  [
  {
    id: "1",
    fullName: "Nguyen Van A",
    email: "NguyenVanA@gmail.com",
    phoneNumber: "0903525878",
  },
  {
    id: "2",
    fullName: "Nguyen Van B",
    email: "NguyenVanB@gmail.com",
    phoneNumber: "0903527876",
  },
  {
    id: "3",
    fullName: "Nguyen Van C",
    email: "NguyenVanC@gmail.com",
    phoneNumber: "0903515879",
  },
]

const initialState = {
  students: students,
  studentTemplate: {
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  },
  updateButtonStyle : "none",
  isDisableId: false
};

const stringify = localStorage.getItem("STUDENT_LIST");
// console.log();
if (stringify){
  initialState.students = JSON.parse(stringify);
}

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_STUDENT": {
      let { studentId } = action.payload;
      let currentStudents = [...state.students];
      currentStudents = currentStudents.filter((p) => p.id !== studentId);
      state.students = currentStudents;
      localStorage.setItem("STUDENT_LIST", JSON.stringify(currentStudents))
      return { ...state };
    }
    case "SET_STUDENT_TO_FORM": {
        let { studentId, updateButtonStyle } = action.payload;
        let currentStudents = [...state.students];
        let editedStudent = {...currentStudents.find(prod=> prod.id == studentId)}
        for (let key in editedStudent){
            state.studentTemplate[key] = editedStudent[key]
          }
        state.updateButtonStyle = updateButtonStyle;
        state.isDisableId = true
        return { ...state };
      }
    case "UPDATE_STUDENT": {
        let { updatedStudent } = action.payload;
        let currentStudents = [...state.students];
        let editedStudent = currentStudents.find(prod=> prod.id == updatedStudent.id)
        for (let key in editedStudent){
            editedStudent[key] = updatedStudent[key]
          }
        state.students = currentStudents;
        localStorage.setItem("STUDENT_LIST", JSON.stringify(currentStudents))
        
        state.isDisableId = false 
        state.updateButtonStyle = "none"
        state.studentTemplate= {
            id: "",
            fullName: "",
            email: "",
            phoneNumber: "",
          }

        return { ...state };
    }
    case "HANDLE_CHANGE_INPUT": {
        let { id, value } = action;
        state.studentTemplate[id] = value;
        state.studentTemplate = { ...state.studentTemplate };
        return { ...state }; //immutable
      }
    case "CREATE_STUDENT": {
      let { newStudent } = action.payload;
      let currentStudents = [...state.students];
      currentStudents.push(newStudent)
      state.students = currentStudents;
      localStorage.setItem("STUDENT_LIST", JSON.stringify(currentStudents));
      state.studentTemplate= {
            id: "",
            fullName: "",
            email: "",
            phoneNumber: "",
          }
      return { ...state };
    }
    case "SEARCH_CHANGE_INPUT": {
      let { studentID } = action;
      let currentStudents = [...state.students];
      if (!studentID) {
        state.students = students
      } else{
        currentStudents = currentStudents.filter(p=> p.id.includes(studentID))
        state.students = currentStudents;
      }
      
      return { ...state };
    }
    default:
      return state;
  }
};
