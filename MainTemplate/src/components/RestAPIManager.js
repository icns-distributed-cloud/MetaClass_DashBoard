var APIRequest = require('./APIRequest');
var APIResponse = require('./APIResponse');
var APIURL = require("../RestAPIURL");
var MapEnum = require("./Enum/MapEnum");
var Config = require("../config");
const CalendarFrontColors = ['green', 'red lighten-1'];

// 7. Post  -  http://IPAdress/api/map/post/maplist
export async function API_maplist(color, instructorId) {
    var maplist = [];
    var url = APIURL.Map.PostMapListAPI;
    var payload = APIRequest.API_maplist_Req(instructorId);
    var config = Config.config;
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_maplist_Res(res);
        })
    if (response !== {}) {
        for (const map of response.res_maplist) {
            var maptype = map.type;
            if (map.type === MapEnum.Maptype.OPEN) {
                maptype = "오픈형";
            } else if (map.type === MapEnum.Maptype.CASCADING) {
                maptype = "계단식";
            } else if (map.type === MapEnum.Maptype.MEETING_ROOM) {
                maptype = "소회의실";
            }
            maplist.push({
                id: map.id,
                name: map.name,
                type: map.type,
                maxUser: map.maxUser,
                typename: maptype,
                color: color
            })
        }
    }
    return maplist;
}

// 16. Post- http://IPAdress/api/content/post/contentlist
export async function API_contentlist(instructorId) {
    var contentlist = [];
    var url = APIURL.Content.PostContentListAPI;
    var payload = APIRequest.API_contentlist_Req(instructorId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_contentlist_Res(res);
    })
    for (const content of response.res_contentlist) {
        contentlist.push({
            id: content.id,
            name: content.name,
            directory: content.directory
        })
    }
    return contentlist;
}

// 42. get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1
export async function API_quizlist(instructorId) {
    var quizlist = [];
    var url = APIURL.Quiz.GetQuizListAPI + instructorId;
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'GET',
            headers: config.headers
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_quizlist_Res(res);
        })
    if (response.res_quizlist.length > 0) {
        for (const quiz of response.res_quizlist) {
            quizlist.push({
                id: quiz.id,
                name: quiz.name
            })
        }
    } else {
        quizlist.push({
            id: null,
            name: "퀴즈 없음"
        })
    }
    return quizlist;
}

// 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
export async function API_lecturelist(start, end, instructorId) {
    var lecturelist = [];
    var url = APIURL.Lecture.Instructor.PostInsLectureList;
    var payload = APIRequest.API_lecturelist_Req(start, end, instructorId);
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_lecturelist_Res(res);
        })

    if (response !== {}) {
        for (const lecture of response.res_lecturelist) {
            var maptype = lecture.type;
            if (lecture.type == MapEnum.Maptype.OPEN) {
                maptype = "오픈형";
            } else if (lecture.type === MapEnum.Maptype.CASCADING) {
                maptype = "계단식";
            } else if (lecture.type === MapEnum.Maptype.MEETING_ROOM) {
                maptype = "소회의실";
            }

            var students = [];
            for (const student of lecture.students) {
                students.push({
                    studentId: student.studentId,
                    studentName: student.studentName,
                    loginId: student.loginId
                })
            }
            lecturelist.push({
                classid: lecture.id,
                name: lecture.name,
                start: new Date(`${lecture.startTime}`),
                end: new Date(`${lecture.endTime}`),
                contentId: lecture.contentId,
                instructorId: lecture.instructorId,
                mapId: lecture.mapId,
                quizId: lecture.quizId,
                color: CalendarFrontColors[0],
                timed: true,
                mapName: lecture.mapName,
                studentlist: students,

                showevent: [{
                        CalendarClassnameAction: lecture.startTime,
                        CalendarClassnameTitle: '강의 시작 일자',
                    },
                    {
                        CalendarClassnameAction: lecture.endTime,
                        CalendarClassnameTitle: '강의 끝 일자',
                    },
                    {
                        CalendarClassnameAction: lecture.instructorName,
                        CalendarClassnameTitle: '강의자',
                    },
                    {
                        CalendarClassnameAction: lecture.mapName,
                        CalendarClassnameTitle: '강의실 이름',
                    },
                    {
                        CalendarClassnameAction: maptype,
                        CalendarClassnameTitle: '강의 타입',
                    },
                    {
                        CalendarClassnameAction: lecture.countUser + "/" + lecture.mapMaxUser,
                        CalendarClassnameTitle: '참여 인원수',
                    },
                    {
                        CalendarClassnameAction: lecture.contentName,
                        CalendarClassnameTitle: '컨텐츠 이름'
                    },
                    { // 퀴즈 선택 추가
                        CalendarClassnameAction: lecture.quizName,
                        CalendarClassnameTitle: '퀴즈 이름'
                    },
                ]
            })
        }
    }
    return lecturelist;
}

// 11. Patch - http://IPAdress/api/lecture/instructor/patch/deletelecture
export async function API_insdeletelecture(lectureId) {
    var url = APIURL.Lecture.Instructor.PatchDeleteLectureAPI;
    var payload = APIRequest.API_insdeletelecturelist_Req(lectureId);
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_insdeletelecture_Res(res);
        })
    return response;
}

// 23. Post - api/lecture/student/delete/deletelecture
export async function API_deletelecture(studentId, lectureId) {
    var deletelecture = [];
    var url = APIURL.Lecture.Student.DeleteDeleteLectureAPI;
    var payload = APIRequest.API_deletelecturelist_Req(studentId, lectureId);
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_deletelecture_Res(res);
        })
    if (response !== {}) {
        deletelecture.push({
            success: response.res_success,
            message: response.res_code,
            code: response.res_code
        })
    }
    return deletelecture
}

// 10. Patch - http://IPAdress/api/lecture/instructor/patch/updatelecture
export async function API_updatelecture(lectureinfo, instructorId) {
    var updatelecture = [];
    var url = APIURL.Lecture.Instructor.PatchUpdateLectureAPI;
    var payload = APIRequest.API_updatelecture_Req(lectureinfo, instructorId);
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_updatelecture_Res(res);
        })
    if (response !== {}) {
        updatelecture.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    return updatelecture[0]
}

// 8. Patch - http://IPAdress/api/map/patch/updatemap
export async function API_updatemap(mapinfo) {
    var url = APIURL.Map.PatchUpdateMapAPI;
    var payload = APIRequest.API_updatemap_Req(mapinfo);
    var config = Config.config;
    var response = {};
    await fetch(url, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_updatemap_Res(res);
        })
    return response;
}

// 45. post http://localhost:8088/api/mail/sendAll
export async function API_mailsend(context, instructorId) {
    var mailsend = [];
    var url = APIURL.Send.Mail.PostMailSendAPI;
    var payload = APIRequest.API_mailsend_Req(context, instructorId);
    var config = Config.config;
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_mailsend_Res(res);
        })
    if (response !== {}) {
        mailsend.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    return mailsend
}

// 46. post http://localhost:8088/api/sms/send
export async function API_smssend(context, instructorId) {
    var smssend = [];
    var url = APIURL.Send.SMS.PostSMSSendAPI;
    var payload = APIRequest.API_smssend_Req(context, instructorId);
    var config = Config.config;
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_smssend_Res(res);
        })
    if (response !== {}) {
        smssend.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    return smssend
}

// 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
export async function API_createlecture(classInfo, instructorId) {
    var url = APIURL.Lecture.Instructor.PostCreateLectureAPI;
    var payload = APIRequest.API_createlecture_Req(classInfo, instructorId);
    var config = Config.config;
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_createlecture_Res(res);
        })
    return response;
}

// 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
export async function API_studentlistbydepartment(departmentId) {
    var url = APIURL.Users.PostStudentListbyDepartmentAPI;
    var payload = APIRequest.API_studentlistbydepartment_Req(departmentId);
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_studentlistbydepartment_Res(res);
        })
    return response;
}

// 27. Get- http://localhost:8088/api/department/get/departmentlist
export async function API_departmentlist() {
    var departmentlist = [];
    var url = APIURL.Department.GetDepartmentListAPI;
    var config = Config.config;

    var response = {};
    await fetch(url, {
            method: 'GET',
            headers: config.headers
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_departmentlist_Res(res);
        })
    if (response.res_departmentlist.length > 0) {
        for (const department of response.res_departmentlist)
            departmentlist.push({
                id: department.id,
                name: department.name,
            })
    }
    return {
        success: response.res_success,
        code: response.res_code,
        message: response.res_message,
        departmentList: departmentlist
    }
}

// 5. Post - http://IPAdress/api/map/post/createmap
export async function API_createmap(name, type, maxUser, instructorId) {
    var url = APIURL.Map.PostCreateMapAPI;
    var payload = APIRequest.API_createmap_Req(name, type, maxUser, instructorId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_createmap_Res(res);
        })
    return response;
}

// 26. Post - http://IPAddress/api/department/post/postdepartment
export async function API_postdepartment(departmentName){
    var url = APIURL.Department.PostPostDepartmentAPI;
    var payload = APIRequest.API_postdepartment_Req(departmentName);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_postdepartment_Res(res);
    })
    return response;
}

// 28. post http://IPAddress/api/department/patch/deletedepartment 
export async function API_deletedepartment(departmentId){
    var url = APIURL.Department.PostDeleteDepartmentAPI;
    var payload = APIRequest.API_deletedepartment_Req(departmentId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_deletedepartment_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 48. Post http://localhost:8088/api/users/post/checkLoginId
export async function API_checkloginid(loginId){
    var url = APIURL.Users.PostCheckLoginIdAPI;
    var payload = APIRequest.API_checkloginid_Req(loginId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_checkloginid_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 4. Post - http://IPAdress/api/users/post/register
export async function API_register(loginId, password, name, userMode, email, departmentId, phone){
    var url = APIURL.Users.PostRegisterAPI;
    var payload = APIRequest.API_register_Req(loginId, password, name, userMode, email, departmentId, phone,);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_register_Res(res);
    })
    if (!response.res_success){
        return ({
            success: response.res_success,
            code: response.res_code,
            message: response.res_message
        })
    } else {
        return ({
            timestamp: response.res_timestamp,
            message: response.res_message,
            details: response.res_details
        })
    }
}

// 2. Get - http://IPAdress/api/users/get/allstudent
export async function API_allstudent(){
    var url = APIURL.Users.GetAllStudentAPI;
    var config = Config.config;
    var response = [];
    await fetch(url, {
        methid: 'GET',
        headers: config.headers
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_allstudent_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code,
        studentList: response.res_studentList
    })
}

// 3. Patch - http://IPAdress/api/users/patch/deleteuser
export async function API_deleteuser(userId, loginId, userMode){
    var url = APIURL.Users.PatchDeleteUserAPI;
    var payload = APIRequest.API_deleteuser_Req(userId, loginId, userMode);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_deleteuser_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 40. post http://IPAddress/api/quiz/post/createquiz
export async function API_createquiz(quizFrontMapName, data, userId){
    var url = APIURL.Quiz.PostCreateQuizAPI;
    var payload = APIRequest.API_createquiz_Req(quizFrontMapName, data, userId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_createquiz_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 47. Get http://IPAddress/api/quiz/get/listbyquizid?quizId=
export async function API_listbyquizid(quizId){
    var url = APIURL.Quiz.GetQuizListbyQuizIdAPI + quizId;
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_listbyquizid_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code,
        quizList: response.res_quizList
    })
}

// 41. Get http://IPAddress/api/quiz/get/deletequiz?id=
export async function API_deletequiz(quizId){
    var url = APIURL.Quiz.GetDeleteQuizAPI + quizId;
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_listbyquizid_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 43.post http://IPAddress/api/quiz/post/updatequiz
export async function API_updatequiz(quizId, quizName, data){
    var url = APIURL.Quiz.PostUpdateQuizAPI;
    var payload = APIRequest.API_updatequiz_Req(quizId, quizName, data);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_listbyquizid_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 6. Patch - http://IPAdress/api/map/patch/deletemap
export async function API_deletemap(mapId){
    var url = APIURL.Map.PatchDeleteMapAPI;
    var payload = APIRequest.API_deletemap_Req(mapId);
    var config = Config.config;
    var response = [];
    await fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_deletemap_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 13. Post - http://IPAdress/api/content/post/createcontent
export async function API_createcontent(formData){
    var url = APIURL.Content.PostCreateContentAPI;
    var response = [];
    await fetch(url, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_createcontent_Res(res);
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code,
        data: response.res_data
    })
}

// 14. Post - http://IPAddress/api/content/post/updateidbycontentid
export async function API_updateidbycontentid(instructorId, contentId, contentName, playtime){
    var url = APIURL.Content.PostUpdateIdbyContentIdAPI;
    var config = Config.config;
    var payload = APIRequest.API_updateidbycontentid_Req(instructorId, contentId, contentName, playtime);
    var response = [];
    await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_updateidbycontentid_Res(res)
    })
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}

// 15. Patch - http://IPAddress/api/content/patch/deletecontent
export async function API_deletecontent(contentId){
    var url = APIURL.Content.PatchDeleteContentAPI;
    var config = Config.config;
    var payload = APIRequest.API_deletecontent_Req(contentId);
    var response = [];
    await fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        response = APIResponse.API_deletecontent_Res(res);
    })
    console.log(response);
    return ({
        success: response.res_success,
        message: response.res_message,
        code: response.res_code
    })
}