var success = "";
var code = 0;
var message = "";

// 7. Post  -  http://IPAdress/api/map/post/maplist
export function API_maplist_Res(res) {
    var res_maplist = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const maplist of res.data) {
        res_maplist.push({
            id: maplist.id,
            name: maplist.name,
            type: maplist.type,
            maxUser: maplist.maxUser
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_maplist: res_maplist
    })
}

// 16. Post- http://IPAdress/api/content/post/contentlist
export function API_contentlist_Res(res) {
    var res_contentlist = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const contentlist of res.data) {
        res_contentlist.push({
            id: contentlist.id,
            name: contentlist.name,
            directory: contentlist.directory
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_contentlist: res_contentlist
    })
}

// 42. get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1
export function API_quizlist_Res(res) {
    var res_quizlist = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const quizlist of res.data) {
        res_quizlist.push({
            id: quizlist.id,
            name: quizlist.name,
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_quizlist: res_quizlist
    })
}

// 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
export function API_lecturelist_Res(res) {
    var res_lecturelist = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const lecturelist of res.data) {
        /*var students = [];
        for (const student of lecturelist.students) {
            students.push({
                studentId: student.studentId,
                studentName: student.studentName,
                loginId: student.loginId
            })
        }*/
        res_lecturelist.push({
            id: lecturelist.id,
            name: lecturelist.name,
            startTime: lecturelist.startTime,
            endTime: lecturelist.endTime,
            contentId: lecturelist.contentId,
            contentName: lecturelist.contentName,
            countUser: lecturelist.countUser,
            instructorId: lecturelist.instructorId,
            instructorName: lecturelist.instructorName,
            mapId: lecturelist.mapId,
            mapMaxUser: lecturelist.mapMaxUser,
            mapType: lecturelist.mapType,
            mapName: lecturelist.mapName,
            quizId: lecturelist.quizId,
            quizName: lecturelist.quizName,
            students: lecturelist.students
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_lecturelist: res_lecturelist
    })
}

// 23. Post - http://localhost:8088/api/lecture/student/delete/deletelecture
export function API_deletelecture_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
    })
}

// 10. Patch - http://163.180.117.47:8088/api/lecture/instructor/patch/updatelecture
export function API_updatelecture_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
    })
}

// 8. Patch - http://IPAdress/api/map/patch/updatemap
export function API_updatemap_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
    })
}

// 45. Post - http://localhost:8088/api/mail/sendAll
export function API_mailsend_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    var data = res.data;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_data: data
    })
}

// 46. Post - http://localhost:8088/api/sms/send
export function API_smssend_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    var data = res.data;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_data: data
    })
}

// 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
export function API_createlecture_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    var data = res.data;
    /*var studentlist = []
    this.selectedStudents.forEach(element => {
    studentlist.push({
        studentId: element.studentId
    })
    })*/
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_data: data
    })
}

// 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
export function API_studentlistbydepartment_Res(res) {
    var res_studentlistbydepartment = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const studentlistbydepartment of res.data) {
        res_studentlistbydepartment.push({
            studentId: studentlistbydepartment.studentId,
            studentName: studentlistbydepartment.studentName
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_studentlistbydepartment: res_studentlistbydepartment
    })
}

// 27. Get- http://localhost:8088/api/department/get/departmentlist
export function API_departmentlist_Res(res) {
    var res_departmentlist = [];
    success = res.success;
    code = res.code;
    message = res.message;
    for (const departmentlist of res.data) {
        res_departmentlist.push({
            id: departmentlist.id,
            name: departmentlist.name
        })
    }
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_departmentlist: res_departmentlist
    })
}

// 5. Post - http://IPAdress/api/map/post/createmap
export function API_createmap_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    var data = res.data;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
        res_data: data
    })
}