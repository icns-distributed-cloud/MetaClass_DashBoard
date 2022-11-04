// 7. Post  -  http://IPAdress/api/map/post/maplist
export function API_maplist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 16. Post- http://IPAdress/api/content/post/contentlist
export function API_contentlist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 42. get - http://163.180.117.47:8088/api/quiz/get/list?instructorId=1
export function API_quizlist_Req(instructorId) {
    return {
        instructorId: instructorId
    }
}

// 12. Post - http://IPAdress/api/lecture/instructor/post/lecturelist
export function API_lecturelist_Req(startDate, endDate, instructorId) {
    return {
        instructorId: String(instructorId),
        startDate: startDate.date,
        endDate: endDate.date
    }
}

// 23. Post - http://localhost:8088/api/lecture/student/delete/deletelecture
export function API_deletelecturelist_Req(studentId, lectureId) {
    return {
        studentId: studentId.date,
        lectureId: lectureId.date
    }
}

// 10. Patch - http://163.180.117.47:8088/api/lecture/instructor/patch/updatelecture
export function API_updatelecture_Req(lectureinfo, instructorId) {
    var startTime = lectureinfo.showevent[0].CalendarClassnameAction;
    var endTime = lectureinfo.showevent[1].CalendarClassnameAction;
    return {
        id: String(lectureinfo.classid),
        name: lectureinfo.name,
        instructorId: String(instructorId),
        mapId: String(lectureinfo.mapId),
        contentId: String(lectureinfo.contentId),
        quizId: String(lectureinfo.quizId),
        startTime: startTime,
        endTime: endTime
    }
}

// 8. Patch - http://IPAdress/api/map/patch/updatemap
export function API_updatemap_Req(mapinfo, instructorId) {
    var Maxnum = mapinfo.showevent[5].CalendarClassnameAction;
    return {
        id: String(mapinfo.instructorId),
        name: mapinfo.name,
        instructorId: String(instructorId),
        type: mapinfo.maptype,
        maxuser: Maxnum
    }
}

// 45. Post - http://localhost:8088/api/mail/sendAll
export function API_mailsend_Req(context, instructorId) {
    return {
        instructorId: String(instructorId),
        context: context.data
    }
}

// 46. Post - http://localhost:8088/api/sms/send
export function API_smssend_Req(context, instructorId) {
    return {
        instructorId: String(instructorId),
        context: context.data
    }
}

// 9. Post - http://IPAdress/api/lecture/instructor/post/createlecture
export function API_createlecture_Req(createinfo, instructorId) {
    var startTime = new Date(createinfo.CreateClassModalStartDate1 + ":00");
    var endTime = new Date(createinfo.CreateClassModalFinishDate3 + ":00");
    var studentlist = [];
    return {
        name: createinfo.name,
        instructorId: String(instructorId),
        mapId: String(createinfo.mapId),
        quizId: String(createinfo.quizId),
        contentId: String(createinfo.contentId),
        stulist: studentlist,
        startTime: startTime,
        endTime: endTime
    }
}

/*var payload = {
    quizId: this.CreateClassModalQuiz,
    name: this.CreateClassModalTitle,
    instructorId: userId,
    mapId: this.selectedMap,
    contentId: this.CreateClassModalFile,
    stulist: studentlist,
    startTime: this.CreateClassModalStartDate1+":00",
    endTime: this.CreateClassModalFinishDate3+":00"
  }*/

// 32. post - http://localhost:8088/api/users/post/studentlistbydepartment
export function API_studentlistbydepartment_Req(departmentId) {
    return {
        departmentId: String(departmentId)
    }
}

// 27. Get- http://localhost:8088/api/department/get/departmentlist

// 5. Post - http://IPAdress/api/map/post/createmap
export function API_createmap_Req(name, maptype, maxUser, instructorId) {
    return {
        name: name,
        type: maptype,
        instructorId: instructorId,
        maxuser: maxUser
    }
}