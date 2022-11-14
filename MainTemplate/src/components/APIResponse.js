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
    for (const contentlist of res.data) {
        res_contentlist.push({
            id: contentlist.id,
            name: contentlist.name,
            directory: contentlist.directory
        })
    }
    return ({
        res_success: res.success,
        res_code: res.code,
        res_message: res.message,
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

// 11. Patch - http://IPAdress/api/lecture/instructor/patch/deletelecture
export function API_insdeletelecture_Res(res) {
    success = res.success;
    code = res.code;
    message = res.message;
    return ({
        res_success: success,
        res_code: code,
        res_message: message,
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
    for (const studentlistbydepartment of res.data) {
        res_studentlistbydepartment.push({
            studentId: studentlistbydepartment.studentId,
            studentName: studentlistbydepartment.studentName
        })
    }
    return ({
        res_success: res.success,
        res_code: res.code,
        res_message: res.message,
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

// 26. Post - http://IPAddress/api/department/post/postdepartment
export function API_postdepartment_Res(res) {
    if (res.success) {
        return ({
            res_success: res.success,
            res_code: res.code,
            res_message: res.message,
            res_data: res.data
        })
    } else {
        return ({
            res_timestamp: res.timestamp,
            res_message: res.message,
            res_details: res.details
        })
    }
}

// 28. post http://localhost:8088/api/department/patch/deletedepartment 
export function API_deletedepartment_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code
    })
}

// 48. Post http://localhost:8088/api/users/post/checkLoginId
export function API_checkloginid_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_data: res.data
    })
}

// 4. Post - http://IPAdress/api/users/post/register
export function API_register_Res(res){
    if (!res.success) {
        return ({
            res_success: res.success,
            res_code: res.code,
            res_message: res.message,
            res_data: res.data
        })
    } else {
        return ({
            res_timestamp: res.timestamp,
            res_message: res.message,
            res_details: res.details
        })
    }
}

// 2. Get - http://IPAdress/api/users/get/allstudent
export function API_allstudent_Res(res){
    var res_studentList = [];
    for (const student of res.data){
        res_studentList.push({
            name: student.name,
            id: student.id,
            email: student.email,
            group: student.departmentName
        })
    }
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_studentList: res_studentList
    })
}

// 3. Patch - http://IPAdress/api/users/patch/deleteuser
export function API_deleteuser_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_data: res.data
    })
}

// 40. post http://163.180.117.47:8088/api/quiz/post/createquiz
export function API_createquiz_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_data: res.data
    })
}

// 47. get http://IPAddress/api/quiz/get/listbyquizid?quizId=
export function API_listbyquizid_Res(res){
    var quizList = [];
    for (const quiz of res.data){
        quizList.push({
            title: quiz.title,
            quizContext: quiz.quizContext,
            answerYN: [],
            score: quiz.score
        })
    }
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_quizList: quizList
    })
}

// 41. Get http://IPAddress/api/quiz/get/deletequiz?id=
export function API_deletequiz_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code
    })
}

// 43.post http://IPAddress/api/quiz/post/updatequiz
export function API_updatequiz_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code
    })
}

// 6. Patch - http://IPAdress/api/map/patch/deletemap
export function API_deletemap_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code
    })
}

// 13. Post - http://IPAdress/api/content/post/createcontent
export function API_createcontent_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
        res_data: res.data
    })
}

// 14. Post - http://IPAddress/api/content/post/updateidbycontentid
export function API_updateidbycontentid_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
    })
}

// 15. Patch - http://IPAddress/api/content/patch/deletecontent
export function API_deletecontent_Res(res){
    return ({
        res_success: res.success,
        res_message: res.message,
        res_code: res.code,
    })
}