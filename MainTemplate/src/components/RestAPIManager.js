var APIRequest = require('./APIRequest');
var APIResponse = require('./APIResponse');
var APIURL = require("../RestAPIURL");
const CalendarFrontColors = ['green', 'red lighten-1'];

// 7. Post  -  http://IPAdress/api/map/post/maplist
export async function API_maplist(color, instructorId) {
    var maplist = [];
    var url = APIURL.Map.PostMapListAPI;
    var payload = APIRequest.API_maplist_Req(instructorId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(response);
    if (response !== {}) {
        for (const map of response.res_maplist) {
            var maptype = map.type;
            if (map.type === 0) {
                maptype = "오픈형";
            } else if (map.type === 1) {
                maptype = "계단식";
            } else if (map.type === 2) {
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
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIRequest.API_contentlist_Req(res);
        })
    if (response.instructorId.data.length > 0) {
        for (const content of response.res_contentlist) {
            contentlist.push({
                id: content.id,
                name: content.name,
                directory: content.directory
            })
        }
    } else {
        contentlist.push({
            id: null,
            name: "컨텐츠 없음"
        })
    }
    return contentlist;
}

// 42. get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1
export async function API_quizlist(instructorId) {
    var quizlist = [];
    var url = APIURL.Quiz.GetQuizListAPI + instructorId;
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(response.res_lecturelist[0]);
    if (response !== {}) {
        for (const lecture of response.res_lecturelist) {
            var maptype = lecture.type;
            if (lecture.type == 0) {
                maptype = "오픈형";
            } else if (lecture.type === 1) {
                maptype = "계단식";
            } else if (lecture.type === 2) {
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
    var deletelecture = [];
    var url = APIURL.Lecture.Instructor.PatchDeleteLectureAPI;
    var payload = APIRequest.API_insdeletelecturelist_Req(lectureId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(response);
    if (response !== {}) {
        deletelecture.push({
            success: response.res_success,
            message: response.res_code,
            code: response.res_code
        })
    }
    return deletelecture
}

// 23. Post - api/lecture/student/delete/deletelecture
export async function API_deletelecture(studentId, lectureId) {
    var deletelecture = [];
    var url = APIURL.Lecture.Student.DeleteDeleteLectureAPI;
    var payload = APIRequest.API_deletelecturelist_Req(studentId, lectureId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(response);
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
    var url = "http://163.180.117.47:8088/api/lecture/instructor/patch/updatelecture"
    var payload = APIRequest.API_updatelecture_Req(lectureinfo, instructorId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(updatelecture);
    return updatelecture[0]
}

// 8. Patch - http://IPAdress/api/map/patch/updatemap
export async function API_updatemap() {
    var updatemap = [];
    var url = "http://163.180.117.47:8088/api/map/patch/updatemap";
    var payload = APIRequest.API_updatemap_Req();
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    if (response !== {}) {
        updatemap.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    console.log(updatemap);
    return updatemap
}

// 45. post http://localhost:8088/api/mail/sendAll
export async function API_mailsend(context, instructorId) {
    var mailsend = [];
    var url = "http://163.180.117.47:8088/api/mail/sendAll";
    var payload = APIRequest.API_mailsend_Req(context, instructorId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(mailsend);
    return mailsend
}

// 46. post http://localhost:8088/api/sms/send
export async function API_smssend(context, instructorId) {
    var smssend = [];
    var url = "http://163.180.117.47:8088/api/sms/send";
    var payload = APIRequest.API_smssend_Req(context, instructorId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    console.log(smssend);
    return smssend
}

// 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
export async function API_createlecture() {
    var createlecture = [];
    var url = "http://163.180.117.47:8088/api/lecture/instructor/post/createlecture";
    var payload = APIRequest.API_createlecture_Req();
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    if (response !== {}) {
        createlecture.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    console.log(createlecture);
    return createlecture
}

// 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
export async function API_studentlistbydepartment(departmentId) {
    var studentlistbydepartment = [];
    var url = "http://163.180.117.47:8088/api/users/post/studentlistbydepartment";
    var payload = APIRequest.API_studentlistbydepartment_Req(departmentId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    if (response !== {}) {
        studentlistbydepartment.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code,
            studentlistbydepartment: response.res_studentlistbydepartment
        })
    }
    console.log(studentlistbydepartment);
    return studentlistbydepartment
}

// 27. Get- http://localhost:8088/api/department/get/departmentlist
export async function API_departmentlist() {
    var departmentlist = [];
    var url = "http://163.180.117.47:8088/api/department/get/departmentlist";
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    var response = {};
    await fetch(url, {
            method: 'GET',
            headers: config.headers,
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_departmentlist_Res(res);
        })
    if (response.res_departmentlist.length > 0) {
        for (const department of response.res_departmentlist)
            departmentlist.push({
                success: department.res_success,
                message: department.res_message,
                code: department.res_code,
            })
    }
    console.log(departmentlist);
    return departmentlist
}

// 5. Post - http://IPAdress/api/map/post/createmap
export async function API_createmap(name, type, maxUser, instructorId) {
    var createmap = {};
    var url = "http://163.180.117.47:8088/api/map/post/createmap";
    var payload = APIRequest.API_createmap_Req(name, type, maxUser, instructorId);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
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
    if (response !== {}) {
        createmap = {
            success: response.res_success,
            message: response.res_message,
            code: response.res_code,
            createmap: response.res_createmap
        }
    }
    console.log(createmap);
    return createmap
}

// 6. Patch - http://IPAdress/api/map/patch/deletemap
export async function API_deletemap() {
    var deletemap = [];
    var url = "http://163.180.117.47:8088/api/map/patch/deletemap";
    var payload = APIRequest.API_deletemap_Req();
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    var response = {};
    await fetch(url, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_deletemap_Res(res);
        })
    if (response !== {}) {
        deletemap.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    console.log(deletemap);
    return deletemap
}

// 13. Post - http://IPAddress/api/content/post/createcontent
export async function API_createcontent(onUploadProgress) {
    var createcontent = [];
    var url = "http://163.180.117.47:8088/api/content/post/createcontent";
    var payload = APIRequest.API_createcontent_Req();
    var config = {
        headers: {
            "Content-Type": "application/json",
            onUploadProgress
        }
    }
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_createcontent_Res(res);
        })
    if (response !== {}) {
        createcontent.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code,
            createcontent: response.res_createcontent
        })
    }
    console.log(createcontent);
    return createcontent
}

// 14. Post - http://IPAddress/api/content/post/updateidbycontentid
export async function API_updateidbycontentid(instructorId, contentId, contentName, playTime) {
    var updateidbycontentid = [];
    var url = "http://163.180.117.47:8088/api/content/post/updateidbycontentid";
    var payload = APIRequest.API_updateidbycontentid_Req(instructorId, contentId, contentName, playTime);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    var response = {};
    await fetch(url, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_updateidbycontentid_Res(res);
        })
    if (response !== {}) {
        updateidbycontentid.push({
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        })
    }
    console.log(updateidbycontentid);
    return updateidbycontentid
}

// 15. Patch- http://IPAdress/api/content/patch/deletecontent
export async function API_deletecontent(id) {
    var deletecontent = [];
    var url = "http://163.180.117.47:8088/api/content/patch/deletecontent";
    var payload = APIRequest.API_deletecontent_Req(id);
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    var response = {};
    await fetch(url, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            response = APIResponse.API_deletecontent_Res(res);
        })
    if (response !== {}) {
        deletecontent = {
            success: response.res_success,
            message: response.res_message,
            code: response.res_code
        }
    }
    console.log(deletecontent);
    return deletecontent
}